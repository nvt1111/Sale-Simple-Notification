import React from 'react';
import './NoticationPopup.scss';
import moment from 'moment';
import {truncateString} from '../../helpers/utils/utils';
import {CancelSmallMinor} from '@shopify/polaris-icons';
import {TickMinor} from '@shopify/polaris-icons';
import {Stack} from '@shopify/polaris';

export const NotificationPopup = ({
  id,
  firstName,
  city,
  country,
  productName,
  createdAt,
  productImage,
  hideTimeAgo,
  truncateProductName
}) => {
  return (
    <div className="Avava-SP__Wrapper fadeInUp animated">
      <div className="Avava-SP__Inner">
        <div className="Avava-SP__Container">
          <div className="CancelSmallIconWrapper">
            <CancelSmallMinor />
          </div>
          <a href="#" className={'Avava-SP__LinkWrapper'}>
            <div
              className="Avava-SP__Image"
              style={{
                backgroundImage: `url(${productImage})`
              }}
            ></div>
            <div className="Avada-SP__Content">
              <div className={'Avada-SP__Title'}>
                {firstName} in {city}, {country}
              </div>
              <div className={'Avada-SP__Subtitle'}>
                {' '}
                <span
                  style={{
                    fontWeight: 'bold',
                    fontSize: '13px'
                  }}
                >
                  Purchased {truncateProductName ? truncateString(productName, 16) : productName}
                </span>
              </div>
              <Stack distribution="equalSpacing">
                <div className={'Avada-SP__Footer'}>
                  {hideTimeAgo
                    ? ''
                    : `${moment.duration(moment(createdAt).diff(moment())).humanize()} ago`}{' '}
                </div>
                <div className="ClassTickMinor">
                  <TickMinor />
                  <>by AVADA</>
                </div>
              </Stack>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};
NotificationPopup.propTypes = {};

export default NotificationPopup;
