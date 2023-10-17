import {getSetting, updateSetting} from '../repositories/settingRepository';
import {getCurrentShop} from '@functions/helpers/auth';
import formatDate from '../const/formatDate';

export async function getSettingShop(ctx) {
  try {
    const shopId = getCurrentShop(ctx);
    const data = await getSetting(shopId);

    ctx.body = {data, success: true};
  } catch (e) {
    console.log(e);
  }
}

export async function updateSettingShop(ctx) {
  try {
    const updateData = ctx.req.body.data;
    const result = await updateSetting(updateData);

    ctx.body = {result, success: true};
  } catch (e) {
    console.log(e);
  }
}
