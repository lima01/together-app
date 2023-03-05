import { mockFirebase } from 'firestore-jest-mock';
import { mockCollection } from 'firestore-jest-mock/mocks/firestore';

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