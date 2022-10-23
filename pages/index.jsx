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
} from '../src/helpers';

import Layout from '../src/components/Layout';
import DailiesList from '../src/components/DailiesList';

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

  const addDaily = (_, option) => {
    const baseId = option?.value;
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
      const notStaleTries = {};

      const locations =
        baseLocations?.map((location, idx) => {
          const currentTry = tries[idx] ?? {};
          const today = Date.now();
          const updated = currentTry.updatedAt ?? 0;

          const isLessThanDay = today - updated < 1000 * 60 * 60 * 24;
          const isFresh =
            isLessThanDay &&
            new Date(today).getDate() === new Date(updated).getDate();

          const freshValue = isFresh ? currentTry.value : 0;

          notStaleTries[idx] = {
            value: freshValue ?? 0,
          };
          return {
            ...location,
          };
        }) ?? [];

      return { ...character, locations, tries: notStaleTries };
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
        <Container>
          <DailiesList
            dailies={dailiesList}
            deleteDaily={deleteDaily}
            updateDaily={updateDaily}
          />
          <Autocomplete
            onChange={addDaily}
            options={options}
            sx={{ width: 300 }}
            renderInput={params => <TextField {...params} label="Character" />}
            isOptionEqualToValue={(option, value) =>
              option.value === value.value
            }
            selectOnFocus
            clearOnBlur
            clearOnEscape
            handleHomeEndKeys
            openOnFocus
          />
        </Container>
      </Box>
    </Layout>
  );
};

export default Home;
