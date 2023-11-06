import router from '@functions/routes/webhook';
import App from 'koa';
import cors from '@koa/cors';

const webhook = new App();

webhook.use(
  cors({
    origin: 'https://thai-store-com.myshopify.com', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Allow credentials (e.g., cookies)
  })
);
webhook.use(router.allowedMethods());
webhook.use(router.routes());

export default webhook;
