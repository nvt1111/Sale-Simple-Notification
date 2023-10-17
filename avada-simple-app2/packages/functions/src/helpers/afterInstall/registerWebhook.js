import * as functions from 'firebase-functions';

const {app} = functions.config();

const registerWebhook = async shopify => {
  // await shopify.webhook.create({
  //   topic: 'orders/create',
  //   address: `https://${app.base_url}/webhook/order/new`,
  //   format: 'json'
  // });

  const listWebhooks = await shopify.webhook.list();
  // await shopify.webhook.delete(1095965474899);
  console.log('List webhook register', listWebhooks);
};
export default registerWebhook;
