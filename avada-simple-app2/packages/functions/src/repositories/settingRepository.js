import {Firestore} from '@google-cloud/firestore';

/**
 * @documentation
 *
 * Only use one repository to connect to one collection
 * do not connect more than one collection from one repository
 */
const firestore = new Firestore();
/** @type CollectionReference */
const collection = firestore.collection('settings');

export async function getSetting(shopId) {
  try {

    const settingDocs = await collection
      .where('shopId', '==', shopId)
      .limit(1)
      .get()
    if (settingDocs.empty) {
      return null;
    }
    const settingDoc = settingDocs.docs[0];

    return {
      id: settingDoc.id,
      ...settingDoc.data()
    }

  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function updateSetting(updateData) {
  try {
    const settingDoc = await collection
        .doc(updateData.id)
        .update({...updateData})

    return settingDoc.docs[0];
  } catch (e) {
    console.error(e);
    return null;
  }
}
