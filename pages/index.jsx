import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  addDoc,
  getDocs,
  onSnapshot,
  deleteDoc,
  updateDoc,
} from 'firebase/firestore';
import { Container, Autocomplete, TextField, Box } from '@mui/material';

import { dailiesCollection, getDailiesDocById } from '../src/db';
import { login, getUnitsList, getMaterialList } from '../src/services';
import {
  getOptionsFromCharacters,
  getUnitShardsData,
  getFirebaseData,
  normalizeArray,
  getLocationsAndTries,
} from '../src/helpers';

import Layout from '../src/components/Layout';
import DailiesList from '../src/components/DailiesList';
import AddDaily from '../src/components/AddDaily';

export const getStaticProps = async () => {
  await login();
  const charactersArray = await getUnitsList();
  const materials = await getMaterialList();

  const unitShardsArray = getUnitShardsData(materials);

  const characters = normalizeArray(charactersArray, 'baseId');
  const unitShards = normalizeArray(unitShardsArray, 'id');

  const dailiesDocs = await getDocs(dailiesCollection);
  const dailies = dailiesDocs.docs.map(getFirebaseData);
  return {
    props: {
      characters,
      unitShards,
      dailies,
    },
    revalidate: 3600,
  };
};

const Home = props => {
  const { characters, unitShards } = props;
  const [dailies, setDailies] = useState(props.dailies);

  useEffect(() => {
    const dailiesSubscription = onSnapshot(dailiesCollection, data =>
      setDailies(data.docs.map(getFirebaseData)),
    );

    return () => {
      dailiesSubscription();
    };
  }, []);

  const options = useMemo(
    () => getOptionsFromCharacters(characters),
    [characters],
  );

  const addDaily = baseId => {
    if (!baseId) return;
    addDoc(dailiesCollection, {
      baseId,
    });
  };

  const deleteDaily = id => {
    const docToDelete = getDailiesDocById(id);
    deleteDoc(docToDelete);
  };

  const updateDaily = ({ id, idx, payload }) => {
    const docToUpdate = getDailiesDocById(id);
    const prevTries = dailies.find(daily => daily.id === id)?.tries ?? {};
    const tries = {
      ...prevTries,
      [idx]: { value: payload, updatedAt: Date.now() },
    };
    updateDoc(docToUpdate, { tries });
  };

  const getCharacterData = useCallback(
    (baseId, tries = {}) => {
      const character = characters[baseId];
      const baseLocations = unitShards[baseId]?.locations;
      const locationsAndTries = getLocationsAndTries(baseLocations, tries);

      return { ...character, ...locationsAndTries };
    },
    [characters, unitShards],
  );

  const dailiesList = useMemo(
    () =>
      dailies.map(({ id, baseId, tries }) => ({
        id,
        ...getCharacterData(baseId, tries),
      })),
    [dailies, getCharacterData],
  );

  return (
    <Layout>
      <Box component={'section'}>
        <Container maxWidth="sm">
          <DailiesList
            dailies={dailiesList}
            deleteDaily={deleteDaily}
            updateDaily={updateDaily}
          />
          <AddDaily addDaily={addDaily} options={options} />
        </Container>
      </Box>
    </Layout>
  );
};

export default Home;
