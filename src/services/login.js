import axios from 'axios';

export const login = async () => {
  const USERNAME = process.env.NAME;
  const PASSWORD = process.env.PASSWORD;
  const CLIENT_ID = process.env.CLIENT_ID;

  const body = new URLSearchParams();
  body.append('username', USERNAME);
  body.append('password', PASSWORD);
  body.append('grant_type', 'password');
  body.append('client_id', CLIENT_ID);
  body.append('client_secret', PASSWORD);

  const { data } = await axios.post('/auth/signin', body);
  const token = data.access_token;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
  return null;
};
