import { getListNotifications } from '../repositories/notificationRepository'

export async function getNotifications(ctx) {
  try {
    const data = await getListNotifications();

    ctx.body = { data, success: true };
  } catch (e) {
    console.log(e);
  }
}
