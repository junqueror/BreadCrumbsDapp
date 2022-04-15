import { FC, MouseEventHandler } from 'react';
import { Text, ThemeIcon } from '@mantine/core';
import classnames from 'classnames';

import theme from 'config/theme';
import { Benefit as BenefitType } from 'content/home/benefits';

import styles from './Benefit.module.scss';

type Props = {
  benefit: BenefitType,
  className?: string,
  id?: string,
  isUpper?: boolean,
  onMouseEnter?: Function,
  onMouseLeave?: Function,
};

const defaultProps = {
  className: '',
  id: undefined,
  isUpper: false,
  onMouseEnter: () => {},
  onMouseLeave: () => {},
};

const Benefit: FC<Props> = ({
  benefit, className, id, isUpper, onMouseEnter, onMouseLeave,
}) => {
  const benefitClassNames = classnames(styles.Benefit, { [styles.Upper]: isUpper }, className);

  const _onMouseEnter: MouseEventHandler = () => onMouseEnter(benefit);
  const _onMouseLeave: MouseEventHandler = () => onMouseLeave();

  return (
    <div
      className={ benefitClassNames }
      id={ id }
      onMouseEnter={ _onMouseEnter }
      onMouseLeave={ _onMouseLeave }
    >
      <div className={ styles.Tile }>
        <div className={ styles.Icon }>
          <ThemeIcon
            className={ styles.Icon }
            gradient={ theme.primaryGradient }
            variant="gradient"
          >
            <benefit.Icon />
          </ThemeIcon>
        </div>
        { benefit.tileLabel.map((text, index) => (
          <Text
            key={ `text-${text}` }
            className={ classnames(styles.Title, { [styles.Second]: index === 1 }) }
          >
            { text }
          </Text>
        ))}
      </div>
    </div>
  );
};

Benefit.defaultProps = defaultProps;

export default Benefit;
