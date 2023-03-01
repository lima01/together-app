import {ApplicationStatus, IInitiativeData} from "../types/initiative.type";
import firestore from '@react-native-firebase/firestore';
const initiativeCol = firestore().collection('initiatives');
class InitiativeDataService {
  async getAll() : Promise<IInitiativeData[]> {
    const querySnapshot = await initiativeCol.get();
    let ret : IInitiativeData[] = [];
    querySnapshot.forEach( (doc:any) => {
      let initiative = doc.data();
      initiative.id = doc.id;
      ret.push(initiative);
    });
    return ret;
  }
  /**
   * Create a new initiative
   * @param initiative 
   * @returns id of the newly created initiative
   */
  async create(initiative: IInitiativeData) : Promise<string> {
    const docRef = await initiativeCol.add(initiative);
    return docRef.id;
  }
  async delete(id: string) {
    await initiativeCol.doc(id).delete();
  } 


  async get(id:string): Promise<IInitiativeData | null> {
    return firestore().runTransaction(async (transaction) => {
      const docRef = initiativeCol.doc(id);
      const docSnap = await transaction.get(docRef);
      
      if (docSnap.exists) {
        let initiative: any = docSnap.data();
        initiative.id = docSnap.id;
        return initiative;
      }
      return null;
    });
  }
}

export default new InitiativeDataService();

