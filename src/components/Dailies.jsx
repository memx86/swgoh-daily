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

import { dailiesCollection } from '../db';
import { getDailiesDocById } from '../services';
import {
  getOptionsFromCharacters,
  getFirebaseData,
  getLocationsAndTries,
  getCharacterEncountersType,
} from '../helpers';

import { useUser } from '../hooks';

import Layout from './Layout';
import DailiesList from './DailiesList';
import AddDaily from './AddDaily';

import { DAILIES_TYPES } from '../constants';
``;

const Dailies = ({ characters = {}, type = DAILIES_TYPES.ALL }) => {
  const [dailies, setDailies] = useState([]);
  const { uid } = useUser();

  useEffect(() => {
    const queryConstrains = [where('uid', '==', uid)];
    if (type === DAILIES_TYPES.LIGHTSIDE) {
      queryConstrains.push(where('type', '!=', DAILIES_TYPES.DARKSIDE));
    }
    if (type === DAILIES_TYPES.DARKSIDE) {
      queryConstrains.push(where('type', '!=', DAILIES_TYPES.LIGHTSIDE));
    }

    const dailiesQuery = query(dailiesCollection, ...queryConstrains);

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
  }, [type, uid]);

  const options = useMemo(
    () => getOptionsFromCharacters(characters),
    [characters],
  );

  const addDaily = baseId => {
    if (!baseId) {
      toast.error('No character id');
      return;
    }
    const encounters = characters[baseId].locations.map(
      ({ encounter }) => encounter,
    );
    const type = getCharacterEncountersType(encounters);

    addDoc(dailiesCollection, {
      baseId,
      uid,
      type,
    });
  };

  const deleteDaily = async id => {
    const docToDelete = getDailiesDocById(id);
    const doc = await getDoc(docToDelete);
    if (doc.data().uid !== uid) {
      toast.error('Not yours to delete');
      return;
    }

    deleteDoc(docToDelete);
  };

  const updateDaily = async ({ id, idx, payload }) => {
    const docToUpdate = getDailiesDocById(id);
    const doc = await getDoc(docToUpdate);
    if (doc.data().uid !== uid) {
      toast.error('Not yours to update');
      return;
    }

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

export default Dailies;
