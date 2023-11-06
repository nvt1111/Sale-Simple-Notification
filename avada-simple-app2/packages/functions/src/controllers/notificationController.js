import {getListNotifications} from '../repositories/notificationRepository';

export async function getNotifications(ctx) {
  try {
    const {sortValue} = ctx.query;
    const data = await getListNotifications(sortValue);

    ctx.body = {data, success: true};
  } catch (e) {
    console.log(e);
  }
}
