import { Meteor } from "meteor/meteor";
import { TasksCollection } from "/imports/api/TasksCollection";
import { UsersCollection } from "/imports/api/UsersCollection";
import { PaymentsCollection } from "/imports/api/PaymentsCollection";

const insertRecord = (collection, object) => collection.insert(object);

const insertArrayOfRecords = (collection, recordsArray) => {
  if (collection.find().count() === 0) {
    recordsArray.forEach((value) => insertRecord(collection, value));
  }
};

Meteor.startup(() => {
  insertArrayOfRecords(TasksCollection, [
    { text: "1 Task", createdAt: new Date().toISOString() },
    { text: "2 Task", createdAt: new Date().toISOString() },
    { text: "3 Task", createdAt: new Date().toISOString() },
    { text: "4 Task", createdAt: new Date().toISOString() },
  ]);

  insertArrayOfRecords(UsersCollection, [
    { login: "andrew", passwordHash: "49fe754f9af13d408daecf9dddd8d488", role: 'user', },
    { login: "katya", passwordHash: "644b487c6850a29f67e20d936a613024", role: 'accountant' },
  ]);

  insertArrayOfRecords(PaymentsCollection, [
    { createdAt: new Date().toISOString(), userId: 'andrewsid', income: 0.0, expence: 0.0 },
  ]);
});
