import { FC } from 'react';
import classnames from 'classnames';

import roadMap from 'content/home/roadMap';

import RoadMap from '../../components/RoadMap';

import styles from './RoadMapSection.module.scss';

type Props = {
  className?: string,
  id?: string,
};

const defaultProps = {
  className: '',
  id: undefined,
};

const RoadMapSection: FC<Props> = ({ className, id }) => {
  const roadMapClassNames = classnames(styles.RoadMapSection, className);

  return (
    <section
      className={ roadMapClassNames }
      id={ id }
    >
      { roadMap.roads.map(road => (
        <RoadMap
          key={ `road-${road.target}` }
          className={ styles.RoadMap }
          road={ road }
        />
      ))}
    </section>
  );
};

RoadMapSection.defaultProps = defaultProps;

export default RoadMapSection;
