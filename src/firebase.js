// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";
import { getFirestore,collection } from  "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAUGyWa9jNdEhRfZggiJNKDnvLYHqZ71lI",
  authDomain: "thetool-83455.firebaseapp.com",
  projectId: "thetool-83455",
  storageBucket: "thetool-83455.appspot.com",
  messagingSenderId: "619530295461",
  appId: "1:619530295461:web:b145af11bc7210cc5b954c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
 const db = getFirestore(app);
 const userCollectionRef = collection(db, 'workspace');
 const invitedUserDataRef = collection(db,'invitedUser');

setPersistence(auth, browserSessionPersistence)
.then(()=>{
  console.log("Session persistence");
}).catch((error)=>{
  console.error("error")
})

//export {app, auth}

export  { app, auth, db, userCollectionRef,invitedUserDataRef };