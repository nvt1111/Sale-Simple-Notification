import router from '@functions/routes/webhook';
import App from 'koa';
import cors from 'koa-cors';

const webhook = new App();

webhook.use(cors());
webhook.use(router.allowedMethods());
webhook.use(router.routes());

export default webhook;
