import firebase from 'firebase';
import * as firebaseConfig from '../../firebase.config.json'
firebase.initializeApp(firebaseConfig);
firebase.firestore();
export default firebase;