import { useState, useEffect } from 'react';
import { addDoc, getDocs, onSnapshot } from 'firebase/firestore';

import { dailiesCollection } from '../src/db';
import { login, getUnitsList, getMaterialList } from '../src/services';
import {
  getOptionsFromCharacters,
  getUnitShardsData,
  getFirebaseData,
} from '../src/helpers';

import Select from '../src/components/Select';

import s from '../src/styles/pages/Home.module.scss';

export const getStaticProps = async () => {
  await login();
  const characters = await getUnitsList();
  const materials = await getMaterialList();
  const unitShards = getUnitShardsData(materials);
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
  const options = getOptionsFromCharacters(characters);

  useEffect(() => {
    const dailiesSubscription = onSnapshot(dailiesCollection, data =>
      setDailies(data.docs.map(getFirebaseData)),
    );

    return () => {
      dailiesSubscription();
    };
  }, []);

  const addDaily = id => {
    addDoc(dailiesCollection, {
      baseId: id,
    });
  };

  const getCharacterData = baseId => {
    const character = characters.find(character => character.baseId === baseId);
    const { locations } = unitShards.find(
      unitShard => unitShard.id === character.baseId,
    );
    return { ...character, locations };
  };

  return (
    <div>
      <ul className={s.list}>
        {dailies?.map(({ id, baseId }) => {
          const { nameKey, locations } = getCharacterData(baseId);
          const { encounter, nodeTier, nodeLetter } = locations[0] ?? {};
          return (
            <li key={id} className={s.item}>
              {nameKey} : {nodeTier}
              {nodeLetter} {encounter}
            </li>
          );
        })}
      </ul>
      <Select options={options} onChange={addDaily} />
    </div>
  );
};

export default Home;
