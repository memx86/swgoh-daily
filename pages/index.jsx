import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  addDoc,
  query,
  where,
  onSnapshot,
  deleteDoc,
  updateDoc,
  getDoc,
} from 'firebase/firestore';
import { Container, Box } from '@mui/material';

import { dailiesCollection } from '../src/db';
import {
  getDailiesDocById,
  getCharactersWithShardsProps,
} from '../src/services';
import {
  getOptionsFromCharacters,
  getFirebaseData,
  getLocationsAndTries,
} from '../src/helpers';

import { useUser } from '../src/hooks';

import Layout from '../src/components/Layout';
import DailiesList from '../src/components/DailiesList';
import AddDaily from '../src/components/AddDaily';

const Home = () => {
  const [dailies, setDailies] = useState([]);
  const [characters, setCharacters] = useState({});
  const { uid } = useUser();

  useEffect(() => {
    (async () => {
      const characters = await getCharactersWithShardsProps();
      setCharacters(characters);
    })();
  }, []);

  useEffect(() => {
    const dailiesQuery = query(dailiesCollection, where('uid', '==', uid));

    const dailiesSubscription = onSnapshot(dailiesQuery, data =>
      setDailies(data.docs.map(getFirebaseData)),
    );

    return () => {
      dailiesSubscription();
    };
  }, [uid]);

  const options = useMemo(
    () => getOptionsFromCharacters(characters),
    [characters],
  );

  const addDaily = baseId => {
    if (!baseId) return;
    addDoc(dailiesCollection, {
      baseId,
      uid,
    });
  };

  const deleteDaily = async id => {
    const docToDelete = getDailiesDocById(id);
    const doc = await getDoc(docToDelete);
    if (doc.data().uid !== uid) return;

    deleteDoc(docToDelete);
  };

  const updateDaily = async ({ id, idx, payload }) => {
    const docToUpdate = getDailiesDocById(id);
    const doc = await getDoc(docToUpdate);
    if (doc.data().uid !== uid) return;

    const prevTries = dailies.find(daily => daily.id === id)?.tries ?? {};
    const tries = {
      ...prevTries,
      [idx]: { value: payload, updatedAt: Date.now() },
    };
    updateDoc(docToUpdate, { tries });
  };

  const getCharacterData = useCallback(
    (baseId, tries = {}) => {
      const character = characters[baseId] ?? {};
      const baseLocations = character?.locations ?? [];
      const locationsAndTries = getLocationsAndTries(baseLocations, tries);

      return { ...character, ...locationsAndTries };
    },
    [characters],
  );

  const dailiesList = useMemo(
    () =>
      dailies.map(({ id, baseId, tries }) => ({
        ...getCharacterData(baseId, tries),
        id,
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
