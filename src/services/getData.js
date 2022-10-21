import axios from 'axios';

export const getData = async options => {
  const { data } = await axios.post('/swgoh/data', options);
  return data;
};
