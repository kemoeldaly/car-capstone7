import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyADR68iwtwxtCHxEUSj5DzkpW_5k90EIVk",
    authDomain: "vehicle-capstone.firebaseapp.com",
    projectId: "vehicle-capstone",
    storageBucket: "vehicle-capstone.appspot.com",
    messagingSenderId: "102293584203",
    appId: "1:102293584203:web:6524551a1208f4e8a150ce"
  }


const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export { auth }