import router from '@functions/routes/clientApi';
import App from 'koa';
import cors from 'koa-cors';

const clientApi = new App();

clientApi.use(cors());
clientApi.use(router.allowedMethods());
clientApi.use(router.routes());

export default clientApi;
