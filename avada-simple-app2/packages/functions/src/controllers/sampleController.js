import {getCurrentUserShopId} from '@avada/shopify-auth/build/authentication';
import Shopify from 'shopify-api-node';
import {getShopById} from '@avada/shopify-auth';

export async function exampleAction(ctx) {
  const shopId = getCurrentUserShopId(ctx);
  const shopData = await getShopById(shopId);
  const shopify = new Shopify({
    accessToken: shopData.accessToken,
    shopName: shopData.shopifyDomain
  });
  const orders = await shopify.order.list({
    status: 'any'
  });
  ctx.body = {data: {shopData, orders}, success: true};
}
