// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getDocs, collection} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDDBEh0QxmG1hc1DX1gPWrQC6GwOrxdps",
  authDomain: "inkwell-e4155.firebaseapp.com",
  projectId: "inkwell-e4155",
  storageBucket: "inkwell-e4155.appspot.com",
  messagingSenderId: "737861531461",
  appId: "1:737861531461:web:d72ef8898c4be5f40cf02c",
  measurementId: "G-GLZH5QZKB2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app);


export const getData = async () => {
  const querySnapshot = await getDocs(collection(db, "notes"));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });

}