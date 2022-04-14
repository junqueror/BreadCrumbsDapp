import React from 'react';
import { Card, Text } from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import classnames from 'classnames';
import PropTypes from 'prop-types';

import theme from 'config/theme';
import { useIncrementalCounter } from 'hooks';

import * as styles from './KeyPoint.module.scss';

const propTypes = {
  text: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  className: PropTypes.string,
  initialValue: PropTypes.number,
  units: PropTypes.string,
};

const defaultProps = {
  className: '',
  initialValue: 0,
  units: undefined,
};

const KeyPoint = ({
  className, initialValue, value, units, text, title,
}) => {
  const [keyPointRef, keyPointObserver] = useIntersection({ rootMargin: '200px', threshold: 0.5 });
  const incrementalValue = keyPointObserver?.isIntersecting ? value : initialValue;
  const number = useIncrementalCounter(initialValue, incrementalValue);
  const keyPointClassNames = classnames(styles.KeyPoint, className);

  if (initialValue === 0) console.log(value);

  return (
    <Card
      ref={ keyPointRef }
      className={ keyPointClassNames }
      radius="lg"
    >
      <Text
        className={ styles.Title }
        gradient={ theme.primaryGradient }
        variant="gradient"
      >
        { title }
      </Text>
      <div className={ styles.Number }>
        <span className={ styles.Integer }>{ number }</span>
        { units && <span className={ styles.Units }>{ units }</span> }
      </div>
      <div className={ styles.Body }>
        <Text
          className={ styles.Text }
          text={ text }
        >
          { text }
        </Text>
      </div>
    </Card>
  );
};

KeyPoint.propTypes = propTypes;
KeyPoint.defaultProps = defaultProps;

export default KeyPoint;
