import { FC } from 'react';
import classnames from 'classnames';
import { Text, ThemeIcon } from '@mantine/core';
import styles from './BenefitDetail.module.scss';
import { HighlightText } from 'components/elements';
import { Benefit } from 'content/home/benefits';

type Props = {
  className?: string,
  id?: string,
  benefit?: Benefit,
};

const defaultProps = {
  className: '',
  id: undefined,
};

const BenefitDetail: FC<Props> = ({ className, id, benefit }) => {
  const benefitDetailClassNames = classnames(styles.BenefitDetail, className);

  return (
    <div
      className={ benefitDetailClassNames }
      id={ id }
    >
        { benefit && (
          <div className={ styles.Content }>
            <div className={ styles.Title }>
              <Text size="xl">
                { benefit?.title }
              </Text>
            </div>
            { benefit?.description.map(text => (
              <HighlightText
                key={ `description-${text}`}
                className={ styles.Description }
                color="white"
                highlightClassName={ styles.Highlight }
                highlightWords={ benefit?.highlightWords || [] }
                size="xl"
              >
                { text }
              </HighlightText>
            )) }
            { benefit?.Icon && (
              <div className={ styles.Icon }>
                <ThemeIcon
                  className={ styles.Icon }
                  variant="filled"
                >
                  { benefit?.Icon && <benefit.Icon /> }
                </ThemeIcon>
              </div>
            ) }
          </div>
        ) }
      </div>
  );
};

BenefitDetail.defaultProps = defaultProps;

export default BenefitDetail;
