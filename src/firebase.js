import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';
import { getAuth,GoogleAuthProvider  } from "firebase/auth";
import { getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBzGBpFjt0eug78stRYUQhtXcadYxjD3Zs",
  authDomain: "disneyplus-clone-6a771.firebaseapp.com",
  projectId: "disneyplus-clone-6a771",
  storageBucket: "disneyplus-clone-6a771.appspot.com",
  messagingSenderId: "987835869418",
  appId: "1:987835869418:web:6bedfb870791d87c494f93",
  measurementId: "G-G3F70Z3VVW"
};


const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { auth, provider, storage };
export default db;
