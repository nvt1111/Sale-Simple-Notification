import {getNotificationsByDomain} from '@functions/repositories/notificationRepository';

export async function getSettingAndNotifications(ctx) {
  try {
    const {shopifyDomain} = ctx.query;
    const notifications = await getNotificationsByDomain(shopifyDomain);

    return (ctx.body = {
      data: notifications,
      success: true
    });
  } catch (e) {
    console.log(e);
  }
}
