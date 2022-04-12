import { FC } from 'react';
import { Space, Text } from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import classnames from 'classnames';

import { Link } from 'components/elements';
import theme from 'config/theme';
import { header } from 'content/home';

import styles from './HeaderSection.module.scss';

type Props = {
  className?: string,
  id?: string,
};

const defaultProps = {
  className: '',
  id: undefined,
};

const HeaderSection: FC<Props> = ({ className, id }) => {
  const [headerRef, headerObserver] = useIntersection({ rootMargin: '0px', threshold: 0.6 });
  const headerSectionClassNames = classnames(styles.HeaderSection, className);
  const pathClassNames = classnames(styles.Path, { [styles.HiddenEffect]: !headerObserver?.isIntersecting });

  return (
    <section
      ref={ headerRef }
      className={ headerSectionClassNames }
      id={ id }
    >
      <div className={ styles.Content }>
        { header.title.map(text => (
          <Text
            key={ `title-${text}` }
            className={ styles.Title }
            color={ theme.mantine.primaryColor }
            component="span"
            transform="uppercase"
          >
            { text }
          </Text>
        )) }
        <Space className={ styles.Space } h="xs" />
        <div className={ styles.Subtitle }>
          { header.subtitle.map(text => (
            <Text
              key={ `text-${text}` }
              component="span"
              size="xl"
            >
              { text }
            </Text>
          )) }
        </div>
        <Text
          align="center"
          className={ styles.Description }
          size="xl"
        >
          { header.description }
        </Text>
        <div className={ styles.Buttons }>
          { header.buttons.map(button => (
            <Link
              key={ `button-${button.text}` }
              className={ styles.Button }
              color={ theme.mantine.primaryColor }
              isButton
              size="lg"
              to={ button.href }
              variant="outline"
            >
              { button.text }
            </Link>
          )) }
        </div>
      </div>
    </section>
  );
};

HeaderSection.defaultProps = defaultProps;

export default HeaderSection;
