/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/no-array-index-key */
import { FC } from 'react';
import { List, Space, Text, ThemeIcon } from '@mantine/core';
import { useIntersection } from '@mantine/hooks';
import { CheckIcon } from '@radix-ui/react-icons';
import classnames from 'classnames';

import theme from 'config/theme';
import { whatIs } from 'content/home';

import styles from './WhatIsSection.module.scss';

const NUM_TILES = Number(styles.numTiles);
const VISIBLE_TILES = [2, 6, 7, 8, 12, 13, 14, 15, 16, 17, 21];

type Props = {
  className?: string,
  id?: string,
};

const defaultProps = {
  className: '',
  id: undefined,
};

const WhatIsSection: FC<Props> = ({ className, id }) => {
  const cardIntersections = [...Array(whatIs.length)]
    .map(() => useIntersection({ rootMargin: '400px', threshold: 0.1 }))
    .map(intersection => ({
      ref: intersection[0],
      observer: intersection[1],
    }));
  const whatIsSectionClassNames = classnames(styles.WhatIsSection, className);

  const getClassNameWithVisible = (_class: string, _cardIndex: number) => classnames(_class, {
    [styles.Visible]: cardIntersections[_cardIndex].observer?.isIntersecting,
  });

  return (
    <section
      className={ whatIsSectionClassNames }
      id={ id }
    >
      { whatIs.map((card, cardIndex) => (
        <div
          key={ `card-${card.topTitle}` }
          ref={ cardIntersections[cardIndex].ref }
          className={ getClassNameWithVisible(styles.Card, cardIndex) }
        >
          <div className={ styles.Content }>
            <Text
              className={ getClassNameWithVisible(styles.TopTitle, cardIndex) }
              gradient={ theme.primaryGradient }
              size="lg"
              variant="gradient"
            >
              { card.topTitle }
            </Text>
            { card.title.map((title: string) => (
              <Text
                key={ `title-${title}` }
                className={ getClassNameWithVisible(styles.Title, cardIndex) }
                size="xl"
              >
                { title }
              </Text>
            ))}
            <Space h="xl" />
            <Text
              className={ getClassNameWithVisible(styles.Text, cardIndex) }
              size="md"
            >
              { card.text }
            </Text>
            <Space h="xl" />
            <List
              center
              className={ getClassNameWithVisible(styles.KeyPoints, cardIndex) }
              size="sm"
              spacing="sm"
            >
              { (card.keyPoints || []).map((keyPoint: string) => (
                <List.Item
                  key={ `keyPoint-${keyPoint}` }
                >
                  <ThemeIcon
                    className={ styles.CheckIcon }
                    radius="xl"
                    size={ 24 }
                    variant="light"
                  >
                    <CheckIcon />
                  </ThemeIcon>
                  <Text>
                    { keyPoint }
                  </Text>
                </List.Item>
              ))}
            </List>
          </div>
          { card.imageClassName === styles.Tiles && (
            <div className={ styles.Tiles }>
              { [...Array(NUM_TILES)].map((_, tileIndex) => (
                <div
                  key={ tileIndex + 1 }
                  className={ classnames({ [styles.Tile]: VISIBLE_TILES.includes(tileIndex + 1) }) }
                />
              )) }
            </div>
          ) }
          { card.imageClassName === styles.ShareClip && (
          <div className={ styles.ShareClip }>
            <svg height="0" width="0">
              <defs>
                <clipPath clipPathUnits="objectBoundingBox" id="shareClip">
                  <path d="M0.4,0.5 C0.4,0.428,0.362,0.366,0.305,0.33 C0.275,0.311,0.239,0.3,0.2,0.3 C0.09,0.3,0,0.39,0,0.5 C0,0.61,0.09,0.7,0.2,0.7 C0.241,0.7,0.279,0.687,0.311,0.666 C0.364,0.63,0.4,0.569,0.4,0.5 M0.439,0.487 L0.646,0.383 C0.598,0.343,0.566,0.284,0.561,0.217 L0.357,0.319 C0.404,0.361,0.435,0.42,0.439,0.487 M0.357,0.681 L0.561,0.783 C0.566,0.716,0.598,0.657,0.646,0.617 L0.439,0.513 C0.435,0.58,0.405,0.64,0.357,0.681 M0.8,0 C0.691,0,0.602,0.088,0.6,0.197 C0.6,0.198,0.6,0.199,0.6,0.2 C0.6,0.274,0.64,0.338,0.7,0.373 C0.729,0.39,0.763,0.4,0.8,0.4 C0.91,0.4,1,0.31,1,0.2 S0.91,0,0.8,0 M0.8,0.6 C0.759,0.6,0.72,0.613,0.689,0.634 C0.635,0.67,0.6,0.731,0.6,0.8 C0.6,0.8,0.6,0.801,0.6,0.801 C0.599,0.801,0.598,0.801,0.598,0.801 L0.6,0.802 C0.601,0.912,0.691,1,0.8,1 C0.91,1,1,0.91,1,0.8 S0.91,0.6,0.8,0.6" />
                </clipPath>
              </defs>
            </svg>
            <div />
          </div>
          ) }
          { card.imageClassName === styles.BreadClip && (
          <div className={ styles.BreadClip }>
            <svg height="0" width="0">
              <defs>
                <clipPath clipPathUnits="objectBoundingBox" id="breadClip">
                  <path d="M0.275,0 C0.187,0,0.103,0.024,0.065,0.065 C0.001,0.134,0.068,0.247,0.018,0.417 C0,0.478,0.172,0.621,0.271,0.734 C0.265,0.716,0.265,0.698,0.269,0.682 V0.681 L0.27,0.678 C0.306,0.566,0.296,0.507,0.267,0.416 C0.257,0.382,0.259,0.349,0.271,0.322 C0.284,0.295,0.305,0.273,0.333,0.255 C0.387,0.221,0.462,0.204,0.536,0.202 C0.546,0.201,0.555,0.201,0.564,0.202 C0.613,0.203,0.661,0.21,0.701,0.225 C0.689,0.212,0.676,0.2,0.661,0.187 C0.574,0.136,0.338,0.149,0.229,0.221 C0.298,0.128,0.468,0.082,0.612,0.147 C0.595,0.133,0.578,0.12,0.56,0.107 C0.475,0.055,0.237,0.067,0.127,0.139 C0.194,0.049,0.356,0.003,0.498,0.06 C0.439,0.019,0.355,0,0.275,0 M0.551,0.241 C0.546,0.241,0.542,0.241,0.538,0.241 C0.468,0.243,0.398,0.26,0.353,0.288 C0.331,0.303,0.315,0.32,0.306,0.338 C0.298,0.357,0.296,0.378,0.304,0.404 C0.334,0.497,0.345,0.571,0.308,0.687 V0.687 L0.307,0.69 C0.304,0.698,0.304,0.715,0.311,0.726 C0.317,0.738,0.327,0.747,0.352,0.747 C0.367,0.747,0.387,0.747,0.405,0.747 C0.451,0.712,0.504,0.673,0.543,0.643 C0.564,0.626,0.59,0.622,0.614,0.623 C0.637,0.624,0.658,0.629,0.673,0.636 C0.714,0.655,0.75,0.668,0.787,0.678 C0.787,0.676,0.787,0.674,0.786,0.673 C0.752,0.572,0.736,0.484,0.769,0.385 C0.777,0.359,0.775,0.339,0.767,0.322 C0.759,0.305,0.744,0.29,0.721,0.277 C0.682,0.255,0.624,0.242,0.564,0.241 C0.559,0.241,0.555,0.241,0.551,0.241 M0.609,0.662 C0.608,0.662,0.607,0.662,0.606,0.662 C0.59,0.663,0.576,0.667,0.567,0.673 C0.516,0.713,0.445,0.765,0.396,0.803 C0.386,0.811,0.383,0.817,0.383,0.82 C0.382,0.823,0.382,0.825,0.384,0.828 C0.389,0.834,0.405,0.842,0.42,0.842 C0.534,0.841,0.622,0.869,0.697,0.905 C0.738,0.925,0.787,0.925,0.836,0.914 C0.884,0.902,0.93,0.877,0.962,0.85 C0.994,0.824,1,0.795,1,0.78 C1,0.772,1,0.765,0.988,0.757 C0.975,0.75,0.953,0.743,0.922,0.739 C0.82,0.728,0.748,0.715,0.656,0.671 C0.65,0.668,0.631,0.663,0.613,0.662 C0.612,0.662,0.611,0.662,0.609,0.662 M1,0.851 C1,0.861,0.998,0.871,0.987,0.88 C0.95,0.912,0.899,0.938,0.845,0.952 C0.79,0.965,0.732,0.965,0.68,0.94 C0.609,0.906,0.528,0.881,0.421,0.881 C0.404,0.882,0.388,0.878,0.374,0.87 C0.378,0.904,0.399,0.933,0.435,0.933 C0.542,0.932,0.604,0.958,0.68,0.986 C0.799,1,1,0.962,1,0.884 V0.851" />
                </clipPath>
              </defs>
            </svg>
            <div />
          </div>
          ) }
        </div>
      ))}
    </section>
  );
};

WhatIsSection.defaultProps = defaultProps;

export default WhatIsSection;
