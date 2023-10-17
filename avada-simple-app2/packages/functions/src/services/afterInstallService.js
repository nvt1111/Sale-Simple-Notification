import {syncOrdersToNotifications} from '@functions/repositories/notificationRepository';
import {getShopByShopifyDomain} from '@avada/shopify-auth';
import getOrders from '@functions/services/graphQLService';
import Shopify from 'shopify-api-node';
import {prepareOrdersFromShopify} from '@functions/helpers/prepareOrdersFromShopify';
import {createDefaultSettings} from '@functions/repositories/settingRepository';
import registerWebhook from '@functions/helpers/afterInstall/registerWebhook';
import registerScriptTag from '@functions/helpers/afterInstall/registerScriptTag';

export async function afterInstallService(ctx) {
  const shopifyDomain = ctx.state.shopify.shop;
  const {id: shopId, accessToken} = await getShopByShopifyDomain(shopifyDomain);
  const shopify = new Shopify({
    shopName: shopifyDomain,
    accessToken
  });
  const datas = await getOrders(shopify, 30);
  await Promise.all([
    syncOrdersToNotifications(
      prepareOrdersFromShopify({
        datas,
        shopId,
        shopifyDomain
      })
    ),
    createDefaultSettings(shopId, shopifyDomain),
    registerWebhook(shopify),
    registerScriptTag(shopify)
  ]);
}
