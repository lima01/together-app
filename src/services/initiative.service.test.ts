import { mockFirebase } from 'firestore-jest-mock';
import { mockAdd, mockCollection } from 'firestore-jest-mock/mocks/firestore';
import { IInitiativeData, InitiativeType } from '../types/initiative.type';

mockFirebase({
  database: {
    initiatives: [
      {
        id: "1",
        img: "assets/events/vote.png",
        name: "Let's Vote Campaign",
        dateRange: "7/24 - 11/9",
        fav: false,
      },
      {
        id: "2",
        img: "assets/events/stem.png",
        name: "APPI Campaign",
        dateRange: "9/12 - 10/3",
        fav: false,
      },
    ],
    //   posts: [{ id: '123abc', title: 'Really cool title' }],
  },
});


import initiativeService from './initiative.service';

describe("InitiativeService Tests", () => {
  test('test get by id found', async () => {
    const initiativeData = await initiativeService.get("1");
    expect(mockCollection).toHaveBeenCalledWith('initiatives');
    expect(initiativeData).toEqual(
      {
        id: "1",
        img: "assets/events/vote.png",
        name: "Let's Vote Campaign",
        dateRange: "7/24 - 11/9",
        fav: false,
      }
    );
  });

  test('test get by id not found', async () => {
    const initiativeData = await initiativeService.get("123");
    expect(mockCollection).toHaveBeenCalledWith('initiatives');
    expect(initiativeData).toBeNull();
  });
  
  test('test create initiative', async ()=>{
    const newInitiative: IInitiativeData = {
      name: "Let's Vote Campaign",
      admins: [], //user id of all admins of the initiative
      created_by: "me", //user id of creator
      create_time: new Date(),
      date_range: "123-456",
      type: InitiativeType.in_person,
      description: "test initiative",
    };
    const newDocId = await initiativeService.create(newInitiative);
    expect(mockAdd).toHaveBeenCalledWith(newInitiative);
    expect(newDocId).not.toBeNull();
  })
})