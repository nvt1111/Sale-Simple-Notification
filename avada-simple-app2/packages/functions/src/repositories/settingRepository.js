import {Firestore} from '@google-cloud/firestore';
import defaultSettings from '@functions/const/defaultSettings';

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
  const settingDocs = await collection
    .where('shopId', '==', shopId)
    .limit(1)
    .get();
  if (settingDocs.empty) return {};
  const settingDoc = settingDocs.docs[0];

  return {
    id: settingDoc.id,
    ...settingDoc.data(),
    createdAt: settingDoc.data().createdAt.toDate(),
    updatedAt: settingDoc.data().updatedAt.toDate()
  };
}

export async function updateSetting(updateData) {
  const {id, ...data} = updateData;
  await collection.doc(id).update({
    ...data,
    updatedAt: new Date()
  });
}

export async function createDefaultSettings(shopId, shopifyDomain) {
  await collection.add({...defaultSettings, shopId, shopifyDomain});
}
