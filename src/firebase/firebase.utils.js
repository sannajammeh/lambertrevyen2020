import * as firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCISOUWIluQuWGFEStCzzm_O_yPC61L2Us',
  authDomain: 'lambertrevyen2020.firebaseapp.com',
  databaseURL: 'https://lambertrevyen2020.firebaseio.com',
  projectId: 'lambertrevyen2020',
  storageBucket: 'lambertrevyen2020.appspot.com',
  messagingSenderId: '1054845003250',
  appId: '1:1054845003250:web:474290a83466230279f76b',
  measurementId: 'G-JS1JJ1K5FB',
};

// Init
firebase.initializeApp(firebaseConfig);
export const firestore = firebase.firestore();

export const fetchPerformances = async () => {
  const ref = await firestore
    .collection('performances')
    .orderBy('date', 'asc')
    .get();

  const results = ref.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  normalizeData(results);
  return results;
};

export const normalizeData = data => {
  const result = {};
  for (const { id, ...values } of data) {
    result[id] = { id, ...values };
  }
  return result;
};
