import {getNotificationsByDomain} from '@functions/repositories/notificationRepository';
import {getShopByShopifyDomain} from '@avada/shopify-auth';
import {getSetting} from '@functions/repositories/settingRepository';

export async function getSettingAndNotifications(ctx) {
  try {
    const {shopifyDomain} = ctx.query;
    const notifications = await getNotificationsByDomain(shopifyDomain);
    const shop = await getShopByShopifyDomain(shopifyDomain);
    const setting = await getSetting(shop.id);
    const result = {notifications: [...notifications], settings: setting};

    ctx.body = {
      data: result,
      success: true
    };

    return result;
  } catch (e) {
    console.log(e);
  }
}
