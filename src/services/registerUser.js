import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../db';

export const registerUser = async ({ name, email, password }) => {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(user, { displayName: name });
  return user.uid;
};
