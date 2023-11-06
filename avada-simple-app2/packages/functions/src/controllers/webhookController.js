import Shopify from 'shopify-api-node';
import {getShopByShopifyDomain} from '@avada/shopify-auth';
import {addNotification, getNotificationItem} from '@functions/repositories/notificationRepository';

export async function listenNewOrder(ctx) {
  try {
    const shopifyDomain = ctx.get('X-Shopify-Shop-Domain');
    const orderData = ctx.req.body;
    const shop = await getShopByShopifyDomain(shopifyDomain);

    const shopify = new Shopify({
      shopName: shopifyDomain,
      accessToken: shop.accessToken
    });

    const notification = await getNotificationItem({
      shopify,
      orderData,
      shopId: shop.id,
      shopifyDomain
    });
    if (!notification) {
      throw new Error('notification is empty');
    }
    await addNotification(notification);

    return (ctx.body = {
      success: true
    });
  } catch (e) {
    console.error(e);
    return (ctx.body = {
      success: false
    });
  }
}
