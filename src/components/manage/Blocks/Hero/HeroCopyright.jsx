import React from 'react';
import { Icon } from 'semantic-ui-react';
import Copyright from '@eeacms/volto-hero-block/components/Blocks/Hero/Copyright';

const HeroCopyright = ({
  copyright,
  copyrightIcon,
  copyrightPosition,
  copyrightPrefix,
}) => {
  return copyright ? (
    <Copyright copyrightPosition={copyrightPosition}>
      <Copyright.Prefix>{copyrightPrefix}</Copyright.Prefix>
      <Copyright.Icon>
        <Icon className={copyrightIcon} />
      </Copyright.Icon>
      <Copyright.Text>{copyright}</Copyright.Text>
    </Copyright>
  ) : (
    ''
  );
};

export default HeroCopyright;
