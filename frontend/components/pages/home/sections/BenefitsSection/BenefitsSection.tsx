/* eslint-disable react-hooks/rules-of-hooks */
import { FC, useState } from 'react';
import { useIntersection } from '@mantine/hooks';
import classnames from 'classnames';

import Slider from 'components/groups/Slider';
import { benefits } from 'content/home';
import { Improvement } from 'content/home/benefits';
import { useScreenSize } from 'hooks';

import BenefitDetail from '../../BenefitDetail';
import BenefitsPath from '../../BenefitsPath';
import KeyPoint from '../../KeyPoint';

import styles from './BenefitsSection.module.scss';

type Props = {
  className?: string,
  id?: string,
};

const defaultProps = {
  className: '',
  id: undefined,
};

const BenefitsSection: FC<Props> = ({ className, id }) => {
  const keyPointIntersections = [...Array(benefits.keyPoints.length)]
    .map(() => useIntersection({ rootMargin: '200px', threshold: 0.5 }))
    .map(intersection => ({
      ref: intersection[0],
      observer: intersection[1],
    }));

  const [benefitDetail, setBenefitDetail] = useState<Improvement | undefined>(benefits.improvements[4]);
  const { isSM } = useScreenSize();

  console.log(keyPointIntersections.map(o => o.observer?.isIntersecting));

  const showBenefitDetail = (benefit: Improvement) => setBenefitDetail(benefit);
  const hideBenefitDetail = () => setBenefitDetail(benefits.improvements[4]);

  const getClassNameWithVisible = (_class: string, _index: number) => classnames(_class, {
    [styles.Visible]: keyPointIntersections[_index].observer?.isIntersecting,
  });
  const benefitsSectionClassNames = classnames(styles.BenefitsSection, className);
  const benefitDetailClassName = classnames(styles.BenefitDetail, { [styles.Visible]: !!benefitDetail });

  return (
    <section
      className={ benefitsSectionClassNames }
      id={ id }
    >
      <div className={ styles.KeyPoints }>
        { benefits.keyPoints.map((keyPoint, keyPointIndex) => (
          <div
            key={ `keyPoint-${keyPoint.value}` }
            ref={ keyPointIntersections[keyPointIndex].ref }
            className={ getClassNameWithVisible(styles.KeyPointContainer, keyPointIndex) }
          >
            <KeyPoint
              initialValue={ keyPoint.initialValue }
              text={ keyPoint.text }
              title={ keyPoint.title }
              units={ keyPoint.units }
              value={ keyPoint.value }
            />
          </div>
        ))}
      </div>
      <div className={ styles.Improvements }>
        <BenefitsPath
          benefits={ benefits.improvements }
          className={ styles.BenefitsPath }
          onMouseEnterBenefitDetail={ showBenefitDetail }
          onMouseLeaveBenefitDetail={ hideBenefitDetail }
        />
        <BenefitDetail
          benefit={ benefitDetail }
          className={ benefitDetailClassName }
        />
        { isSM && (
        <Slider
          className={ styles.Slider }
          dots
          slides={ 1 }
        >
          { benefits.improvements.map(benefit => (
            <BenefitDetail
              key={ `benefit-detail-${benefit.title}` }
              benefit={ benefit }
              className={ styles.BenefitDetail }
            />
          ))}
        </Slider>
        ) }
      </div>
    </section>
  );
};

BenefitsSection.defaultProps = defaultProps;

export default BenefitsSection;
