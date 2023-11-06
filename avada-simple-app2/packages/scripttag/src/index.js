import DisplayManager from './managers/DisplayManager';
import ApiManager from './managers/ApiManager';

console.log('This is the script updated');

(async () => {
  const apiManager = new ApiManager();
  const displayManager = new DisplayManager();
  const {notifications, settings} = await apiManager.getNotifications();

  console.log('Notifications', notifications, 'Settings', settings);
  displayManager.initialize({notifications, settings});
})();
