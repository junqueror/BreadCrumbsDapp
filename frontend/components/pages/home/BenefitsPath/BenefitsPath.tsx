import { FC } from 'react';
import { useIntersection } from '@mantine/hooks';
import classnames from 'classnames';

import { Benefit as BenefitType } from 'content/home/benefits';

import Benefit from '../Benefit';

import styles from './BenefitsPath.module.scss';

type Props = {
  className?: string,
  id?: string,
  benefits: BenefitType[],
  onMouseEnterBenefitDetail?: Function,
  onMouseLeaveBenefitDetail?: Function,
};

const defaultProps = {
  className: '',
  id: undefined,
  onMouseEnterBenefitDetail: () => {},
  onMouseLeaveBenefitDetail: () => {},
};

const BenefitsPath: FC<Props> = ({
  className, id, benefits, onMouseEnterBenefitDetail, onMouseLeaveBenefitDetail,
}) => {
  const [benefitsRef, benefitsObserver] = useIntersection({ rootMargin: '400px', threshold: 0.5 });
  const benefitsPathClassNames = classnames(styles.BenefitsPath, { [styles.Visible]: benefitsObserver?.isIntersecting }, className);

  return (
    <div
      ref={ benefitsRef }
      className={ benefitsPathClassNames }
      id={ id }
    >
      <div>
        <Benefit
          benefit={ benefits[0] }
          onMouseEnter={ onMouseEnterBenefitDetail }
          onMouseLeave={ onMouseLeaveBenefitDetail }
        />
      </div>
      <div />
      <div>
        <Benefit
          benefit={ benefits[1] }
          onMouseEnter={ onMouseEnterBenefitDetail }
          onMouseLeave={ onMouseLeaveBenefitDetail }
        />
      </div>
      <div />
      <div>
        <Benefit
          benefit={ benefits[2] }
          onMouseEnter={ onMouseEnterBenefitDetail }
          onMouseLeave={ onMouseLeaveBenefitDetail }
        />
      </div>
      <div>
        <Benefit
          benefit={ benefits[3] }
          isUpper
          onMouseEnter={ onMouseEnterBenefitDetail }
          onMouseLeave={ onMouseLeaveBenefitDetail }
        />
      </div>
      <div />
      <div>
        <Benefit
          benefit={ benefits[4] }
          onMouseEnter={ onMouseEnterBenefitDetail }
          onMouseLeave={ onMouseLeaveBenefitDetail }
        />
      </div>
    </div>
  );
};

BenefitsPath.defaultProps = defaultProps;

export default BenefitsPath;
