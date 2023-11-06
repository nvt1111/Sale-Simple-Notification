import {insertAfter} from '../helpers/insertHelpers';
import {render} from 'preact';
import React from 'preact/compat';
import NotificationPopup from '../components/NotificationPopup/NotificationPopup';

const delay = ms => new Promise(res => setTimeout(res, ms * 1000));
export default class DisplayManager {
  constructor() {
    this.notifications = [];
    this.settings = {};
  }

  async initialize({notifications, settings}) {
    this.notifications = notifications;
    this.settings = settings;
    this.insertContainer();

    const {includedUrls, excludedUrls} = settings;
    const maxPops = settings.maxPopsDisplay;
    await delay(settings.firstDelay);
    for (const notification of notifications.slice(0, maxPops)) {
      this.display(notification, settings);
      await delay(settings.displayDuration);
      await this.fadeOut();
      await delay(settings.popsInterval);
    }
  }

  fadeOut() {
    const container = document.querySelector('#Avada-SalePop');
    container.style.display = 'none';
  }

  display(notification, settings) {
    const container = document.querySelector('#Avada-SalePop');
    render(<NotificationPopup {...notification} {...settings} />, container);
    container.style.display = 'block';
  }

  insertContainer() {
    const popupEl = document.createElement('div');
    popupEl.id = `Avada-SalePop`;
    popupEl.classList.add('Avada-SalePop__OuterWrapper');
    const targetEl = document.querySelector('body').firstChild;
    if (targetEl) {
      insertAfter(popupEl, targetEl);
    }

    return popupEl;
  }
}
