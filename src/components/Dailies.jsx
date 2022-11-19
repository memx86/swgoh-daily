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
import { toast } from 'react-toastify';

import { getDocById } from '../services';
import {
  getOptionsFromCharacters,
  getFirebaseData,
  getLocationsAndTries,
  getCollectionFromDailyType,
} from '../helpers';
import { DAILIES_TYPES } from '../constants';

import { useUser } from '../hooks';

import Layout from './Layout';
import DailiesList from './DailiesList';
import AddDaily from './AddDaily';

const Dailies = ({ characters = {}, type = DAILIES_TYPES.ALL }) => {
  const [dailies, setDailies] = useState([]);
  const { uid, timeOffset } = useUser();

  const { collection, collectionName } = useMemo(
    () => getCollectionFromDailyType(type),
    [type],
  );

  useEffect(() => {
    const queryConstrains = [where('uid', '==', uid)];

    const dailiesQuery = query(collection, ...queryConstrains);

    const dailiesSubscription = onSnapshot(
      dailiesQuery,
      data => setDailies(data.docs.map(getFirebaseData)),
      error => {
        console.log('error', error);
        uid && toast.error("Can't update characters from server");
      },
    );

    return () => {
      dailiesSubscription();
    };
  }, [collection, uid]);

  const options = useMemo(
    () => getOptionsFromCharacters(characters),
    [characters],
  );

  const addDaily = baseId => {
    if (!baseId) {
      toast.error('No character id');
      return;
    }

    addDoc(collection, {
      baseId,
      uid,
    });
  };

  const deleteDaily = async id => {
    const docToDelete = getDocById(collectionName, id);
    const doc = await getDoc(docToDelete);
    if (doc.data().uid !== uid) {
      toast.error('Not yours to delete');
      return;
    }

    deleteDoc(docToDelete);
  };

  const updateDaily = async ({ id, idx, payload }) => {
    const docToUpdate = getDocById(collectionName, id);
    const doc = await getDoc(docToUpdate);
    if (doc.data().uid !== uid) {
      toast.error('Not yours to update');
      return;
    }

    const prevTries = dailies.find(daily => daily.id === id)?.tries ?? {};
    const hour = 1000 * 60 * 60;
    const updatedAt = Date.now() + timeOffset * hour;
    const tries = {
      ...prevTries,
      [idx]: { value: payload, updatedAt },
    };
    updateDoc(docToUpdate, { tries });
  };

  const getCharacterData = useCallback(
    (baseId, tries = {}) => {
      const character = characters[baseId] ?? {};
      const baseLocations = character?.locations ?? [];
      const locationsAndTries = getLocationsAndTries({
        locations: baseLocations,
        tries,
      });

      return { ...character, ...locationsAndTries };
    },
    [characters],
  );

  const dailiesList = useMemo(
    () =>
      dailies
        .map(({ id, baseId, tries }) => ({
          ...getCharacterData(baseId, tries),
          id,
        }))
        .sort(
          (a, b) => a.locations?.at(0)?.nodeTier - b.locations?.at(0)?.nodeTier,
        ),
    [dailies, getCharacterData],
  );

  return (
    <Layout>
      <Box component={'section'}>
        <Container maxWidth="sm">
          <AddDaily addDaily={addDaily} options={options} />
          <DailiesList
            dailies={dailiesList}
            deleteDaily={deleteDaily}
            updateDaily={updateDaily}
          />
        </Container>
      </Box>
    </Layout>
  );
};

export default Dailies;
