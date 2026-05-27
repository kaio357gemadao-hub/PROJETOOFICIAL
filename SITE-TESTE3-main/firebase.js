import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAqit4PIIb1-VYHKc2U80GHN4VOZytkp0Y",
  authDomain: "odisseia-2.firebaseapp.com",
  projectId: "odisseia-2",
  storageBucket: "odisseia-2.firebasestorage.app",
  messagingSenderId: "425645439994",
  appId: "1:425645439994:web:b46f78bd3579a27de10243"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const provider = new GoogleAuthProvider();

export const loginGoogle = () => {
  return signInWithPopup(auth, provider);
};

export const logoutGoogle = () => {
  return signOut(auth);
};

window.loginGoogle = loginGoogle;