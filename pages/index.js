import { login, getUnitsList, getMaterialList } from '../src/services';

export const getStaticProps = async () => {
  await login();
  const characters = await getUnitsList();
  return {
    props: {
      characters,
    },
    revalidate: 3600,
  };
};

const Home = ({ characters }) => {
  return (
    <>
      <ul className="list">
        {characters.map(({ baseId, nameKey }) => (
          <li key={baseId} className="item">
            {nameKey}
          </li>
        ))}
      </ul>
    </>
  );
};

export default Home;
