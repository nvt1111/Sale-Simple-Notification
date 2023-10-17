import makeRequest from '../helpers/api/makeRequest';

export default class ApiManager {
  getNotifications = async () => {
    return this.getApiData();
  };

  getApiData = async () => {
    const {notifications, settings} = await makeRequest(YOUR_API_URL);

    return {notifications, settings};
  };
}
