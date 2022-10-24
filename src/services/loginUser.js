import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../db';

export const loginUser = async ({ email, password }) => {
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user.uid;
};
