import Router from 'koa-router';
import * as notificationController from '@functions/controllers/notificationController';
import * as shopController from '@functions/controllers/shopController';
import * as subscriptionController from '@functions/controllers/subscriptionController';
import * as appNewsController from '@functions/controllers/appNewsController';
import {getApiPrefix} from '@functions/const/app';
import * as settingController from '@functions/controllers/settingController';
import * as sampleController from '@functions/controllers/sampleController';

export default function apiRouter(isEmbed = false) {
  const router = new Router({prefix: getApiPrefix(isEmbed)});

  router.get('/shops', shopController.getUserShops);
  router.get('/subscription', subscriptionController.getSubscription);
  router.get('/appNews', appNewsController.getList);
  router.get('/samples', sampleController.exampleAction);
  router.get('/settings', settingController.getSettingShop);
  router.put('/settings', settingController.updateSettingShop);

  router.get('/notifications', notificationController.getNotifications);

  return router;
}
