export const getCharactersWithShards = (characters, shards) => {
  const charactersWithShards = {};
  Object.keys(characters).forEach(key => {
    charactersWithShards[key] = {
      ...characters[key],
      ...shards[key],
    };
  });
  return charactersWithShards;
};
