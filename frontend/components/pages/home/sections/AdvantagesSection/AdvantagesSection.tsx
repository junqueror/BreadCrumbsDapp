import { FC } from 'react';
import {
  List, ThemeIcon,
} from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import { StarFilledIcon } from '@radix-ui/react-icons';
import classnames from 'classnames';

import HighlightText from 'components/elements/HighlightText';
import players, { Player } from 'content/home/players';

import styles from './AdvantagesSection.module.scss';

type Props = {
  className?: string,
  id?: string,
};

const defaultProps = {
  className: '',
  id: undefined,
};

const AdvantagesSection: FC<Props> = ({ className, id }) => {
  const [layoutRef, layoutObserver] = useIntersection({ rootMargin: '400px', threshold: 0.1 });
  const advantagesSectionClassNames = classnames(styles.AdvantagesSection, className);
  const cardClassNames = classnames(styles.Card, { [styles.Visible]: layoutObserver?.isIntersecting });

  const getIcon = (player: Player, index: number) => {
    const Icon = (player?.icons?.length > index) ? player?.icons[index] : StarFilledIcon;
    return <Icon />;
  };

  return (
    <section
      className={ advantagesSectionClassNames }
      id={ id }
    >
      <div ref={ layoutRef } className={ styles.Layout }>
        { [players[2], players[0], players[1]]
          .map((player: Player) => (
            <div
              key={ `player-${player.title}` }
              className={ cardClassNames }
            >
              <div
                className={ styles.Content }
              >
                <List
                  center
                  size="sm"
                  spacing="sm"
                >
                  { (player.advantages || []).map((advantage: string, index: number) => (
                    <List.Item
                      key={ `advantage-${advantage}` }
                    >
                      <ThemeIcon
                        className={ styles.Icon }
                        radius="xl"
                        size="md"
                        variant="light"
                      >
                        { getIcon(player, index) }
                      </ThemeIcon>
                      <HighlightText
                        highlightClassName={ styles.Highlight }
                        highlightWords={
                        (player?.highlights?.length > index) ? player?.highlights[index] : []
                      }
                        size="md"
                      >
                        { advantage }
                      </HighlightText>
                    </List.Item>
                  ))}
                </List>
              </div>
            </div>
          )) }
      </div>
    </section>
  );
};

AdvantagesSection.defaultProps = defaultProps;

export default AdvantagesSection;
