import {Firestore} from '@google-cloud/firestore';
import moment from 'moment';

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

export async function getListNotifications(sortValue) {
  try {
    const querySnapshot = await collection.orderBy('createdAt', sortValue).get();

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt.toDate(),
      updatedAt: doc.data().updatedAt.toDate()
    }));
  } catch (e) {
    console.error(e);
    return [];
  }
}

export async function syncOrdersToNotifications(orders) {
  const result = orders.map(async order => {
    await collection.add(order);
  });
  await Promise.all(result);
}

export async function getNotificationItem({shopify, orderData, shopId, shopifyDomain}) {
  const order = await collection
    .where('orderId', '==', orderData.id)
    .limit(1)
    .get();
  if (!order.empty) {
    return;
  }
  const result = await getProduct(shopify, orderData.line_items[0].product_id);

  return {
    orderId: orderData.id,
    createdAt: new Date(orderData.created_at),
    updatedAt: new Date(orderData.updated_at),
    firstName: orderData.customer.first_name,
    city: orderData.billing_address.city,
    country: orderData.billing_address.country,
    productName: orderData.line_items[0].name,
    productImage: result.image.src,
    productId: orderData.line_items[0].product_id,
    shopId,
    shopifyDomain
  };
}

export async function addNotification(data) {
  await collection.add(data);
}

export async function getProduct(shopify, productId) {
  return await shopify.product.get(productId);
}

export async function getNotificationsByDomain(shopifyDomain) {
  const querySnapshot = await collection.where('shopifyDomain', '==', shopifyDomain).get();
  const datas = querySnapshot.docs.map(doc => {
    const data = doc.data();
    return {
      id: doc.id,
      timestamp: `${moment(data.createdAt.toDate()).fromNow()} `,
      country: data.country,
      firstName: data.firstName,
      productId: data.productId,
      city: data.city,
      productName: data.productName,
      productImage: data.productImage
    };
  });
  return datas;
}
