import { FC, useState } from 'react';
import classnames from 'classnames';

import Slider from 'components/groups/Slider';
import { benefits } from 'content/home';
import { Benefit as BenefitType } from 'content/home/benefits';
import { useScreenSize } from 'hooks';

import BenefitDetail from '../../BenefitDetail';
import BenefitsPath from '../../BenefitsPath';

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
  const [benefitDetail, setBenefitDetail] = useState<BenefitType | undefined>(benefits[4]);
  const { isSM } = useScreenSize();

  const showBenefitDetail = (benefit: BenefitType) => setBenefitDetail(benefit);
  const hideBenefitDetail = () => setBenefitDetail(benefits[4]);

  const benefitsSectionClassNames = classnames(styles.BenefitsSection, className);
  const benefitDetailClassName = classnames(styles.BenefitDetail, { [styles.Visible]: !!benefitDetail });

  return (
    <section
      className={ benefitsSectionClassNames }
      id={ id }
    >
      <BenefitsPath
        benefits={ benefits }
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
          { benefits.map(benefit => (
            <BenefitDetail
              key={ `benefit-detail-${benefit.title}` }
              benefit={ benefit }
              className={ styles.BenefitDetail }
            />
          ))}
        </Slider>
      ) }
    </section>
  );
};

BenefitsSection.defaultProps = defaultProps;

export default BenefitsSection;
