import { FC } from 'react';
import classnames from 'classnames';

import { HighlightText } from 'components/elements';
import { slogan } from 'content/home';

import styles from './SloganSection.module.scss';

type Props = {
  className?: string,
  id?: string,
};

const defaultProps = {
  className: '',
  id: undefined,
};

const SloganSection: FC<Props> = ({ className, id }) => {
  const sloganSectionClassNames = classnames(styles.SloganSection, className);

  return (
    <div
      className={ sloganSectionClassNames }
      id={ id }
    >
      <div className={ styles.SloganBox }>
        { slogan.text.map(text => (
          <HighlightText
            key={ `slogan-${text}` }
            className={ styles.Slogan }
            highlightClassName={ styles.Highlight }
            highlightWords={ slogan.highlightWords || [] }
            size="xl"
          >
            { text }
          </HighlightText>
        )) }
      </div>
    </div>
  );
};

SloganSection.defaultProps = defaultProps;

export default SloganSection;
