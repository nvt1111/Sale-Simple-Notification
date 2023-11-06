import router from '@functions/routes/clientApi';
import App from 'koa';
import cors from '@koa/cors';

const clientApi = new App();
clientApi.proxy = true;

clientApi.use(
  cors({
    origin: 'https://thai-store-com.myshopify.com', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Allow credentials (e.g., cookies)
  })
);
clientApi.use(router.allowedMethods());
clientApi.use(router.routes());

export default clientApi;
