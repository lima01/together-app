import firebase from 'firebase';
import * as firebaseConfig from '../../firebase.config.json'
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
if (firebaseConfig.location.hostname === "localhost") {
  db.useEmulator("localhost", 8080);
}
export default firebase;