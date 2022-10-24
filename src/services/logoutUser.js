import { signOut } from 'firebase/auth';
import { auth } from '../db';

export const logoutUser = async () => {
  await signOut(auth);
};
