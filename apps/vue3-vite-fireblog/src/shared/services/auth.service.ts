import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase-auth";
import { USERS_COLLECTION } from "../firebase/firebase-config";

export class AuthService {
  constructor() {}

  async signUserOut() {
    await signOut(auth);
    sessionStorage.removeItem(USERS_COLLECTION);
  }

  async sendPasswordResetEmail(email: string) {
    await sendPasswordResetEmail(auth, email);
  }

  async signInWithEmailAndPassword(email: string, password: string) {
    return await signInWithEmailAndPassword(auth, email, password);
  }

  async createUserWithEmailAndPassword(email: string, password: string) {
    return await createUserWithEmailAndPassword(auth, email, password);
  }
}
