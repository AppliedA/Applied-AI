require('dotenv').config();
const { FB_API } = process.env;
export const firebaseConfig = {
  apiKey: FB_API,
  authDomain: 'applied-ai-lab.firebaseapp.com',
  projectId: 'applied-ai-lab',
  storageBucket: 'applied-ai-lab.appspot.com',
  messagingSenderId: '269378102407',
  appId: '1:269378102407:web:e77e80e4df81cb2081c422',
  measurementId: 'G-GQBJKVSQ7P',
};
