import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './DesktopPositionInput.scss';
import {Labelled, Stack, TextStyle} from '@shopify/polaris';
import {logout} from "@assets/actions/storeActions";

const DesktopPositionInput = ({label, onChange, helpText, options, position}) => {

  return (
    <Labelled label={label}>
      <Stack>
        {options?.map((option, key) => (
          <div
            key={key}
            className={`Avada-DesktopPosition ${position === option.value ? 'Avada-DesktopPosition--selected' : ''
            }`}

            onClick={() => onChange('position',option.value)}
          >
            <div
              className={`Avada-DesktopPosition__Input Avada-DesktopPosition__Input--${option.value}`}
            ></div>
          </div>
        ))}
      </Stack>
      <TextStyle variation="subdued">{helpText}</TextStyle>
    </Labelled>
  );
};

DesktopPositionInput.propTypes = {
  label: PropTypes.string,
  options: PropTypes.array,
  value: PropTypes.string,
  onChange: PropTypes.func,
  helpText: PropTypes.string
};

export default DesktopPositionInput;
