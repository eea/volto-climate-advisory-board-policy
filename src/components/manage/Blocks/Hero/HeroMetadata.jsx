import React from 'react';
import cx from 'classnames';
import { UniversalLink } from '@plone/volto/components';

const HeroMetadata = ({ buttonLabel, buttonLink, inverted, styles }) => {
  const { buttonVariant } = styles || {};

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
