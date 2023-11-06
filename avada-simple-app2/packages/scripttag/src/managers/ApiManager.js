import makeRequest from '../helpers/api/makeRequest';

const BASE_URL = 'https://localhost:3000';
const SHOPIFY_DOMAIN = window.Shopify.shop;
export default class ApiManager {
  getNotifications = async () => {
    return this.getApiData();
  };

  getApiData = async () => {
    const response = await makeRequest(
      `${BASE_URL}/clientApi/notifications?shopifyDomain=${SHOPIFY_DOMAIN}`
    );
    const {notifications, settings} = response.data;
    return {notifications, settings};
  };
}
