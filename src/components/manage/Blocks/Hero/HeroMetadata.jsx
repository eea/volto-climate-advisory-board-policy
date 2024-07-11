import React from 'react';
import cx from 'classnames';
import { UniversalLink } from '@plone/volto/components';

const HeroMetadata = ({ buttonLabel, buttonLink, inverted, styles = {} }) => {
  const isStylesEmpty = Object.keys(styles).length === 0;

  const buttonVariant = isStylesEmpty ? 'default' : styles.buttonVariant;

  return buttonLabel ? (
    <UniversalLink
      className={cx('ui button', buttonVariant, { inverted })}
      href={buttonLink || ''}
    >
      {buttonLabel}
    </UniversalLink>
  ) : (
    ''
  );
};

export default HeroMetadata;
