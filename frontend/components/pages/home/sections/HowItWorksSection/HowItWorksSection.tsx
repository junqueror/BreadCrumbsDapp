import { FC } from 'react';
import classnames from 'classnames';

import { howItWorks } from 'content/home';

import HowItWorksCard from '../../components/HowItWorksCard';

import styles from './HowItWorksSection.module.scss';

type Props = {
  className?: string,
  id?: string,
};

const defaultProps = {
  className: '',
  id: undefined,
};

const HowItWorksSection: FC<Props> = ({ className, id }) => {
  const howItWorksClassnames = classnames(styles.HowItWorksSection, className);

  return (
    <section
      className={ howItWorksClassnames }
      id={ id }
    >
      { howItWorks.map(info => (
        <HowItWorksCard
          key={ `card-${info.title}` }
          className={ styles.HowItWorksCard }
          info={ info }
        />
      ))}
      <div className={ styles.Circle } />
    </section>
  );
};

HowItWorksSection.defaultProps = defaultProps;

export default HowItWorksSection;
