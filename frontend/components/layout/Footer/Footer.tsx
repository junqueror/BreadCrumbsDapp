import { FC } from 'react';
import { Grid, Group, Space, Text } from '@mantine/core';

import Link from 'components/elements/Link';
import theme from 'config/theme';
import footerData from 'content/home/footer';

import styles from './Footer.module.scss';

const Footer: FC = () => (
  <footer className={ styles.Footer }>
    <Grid gutter="xl" justify="space-between">
      { footerData.map(section => (
        <Grid.Col
          key={ `section-${section.title}` }
          sm={ 10 / footerData.length }
          span={ 6 }
        >
          <Space h="xl" />
          <Text
            className={ styles.Title }
            gradient={ theme.primaryGradient }
            size="xl"
            variant="gradient"
          >
            { section.title }
          </Text>
          <Space h="xl" />
          <Group align="center" direction="column">
            { section.links.map(link => (
              <Link
                key={ `section-${link.label}` }
                isDisabled={ link.isDisabled }
                to={ link.to }
              >
                <Text>
                  { link.label }
                </Text>
              </Link>
            )) }
          </Group>
        </Grid.Col>
      ))}
    </Grid>
  </footer>
);

export default Footer;
