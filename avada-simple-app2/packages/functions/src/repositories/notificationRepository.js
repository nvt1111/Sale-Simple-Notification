import { Firestore } from '@google-cloud/firestore';

/**
 * @documentation
 *
 * Only use one repository to connect to one collection
 * do not connect more than one collection from one repository
 */
const firestore = new Firestore();
/** @type CollectionReference */
const collection = firestore.collection('notifications');

/**
 * @param {string} id
 * @returns {Object}
 */
export async function getSampleRepoById(id) {
  try {
    const doc = await collection.doc(id).get();
    if (!doc.exists) {
      return null;
    }

    return { id: doc.id, ...doc.data() };
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getListNotifications() {
  try {
    const querySnapshot = await collection.orderBy('createdAt', 'DESC').get();
    const result = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}
