import React from 'react';
import { BodyClass } from '@plone/volto/helpers';
import HeroEdit from '@eeacms/volto-hero-block/components/Blocks/Hero/Edit';

const Edit = (props) => {
  return (
    <React.Fragment>
      <BodyClass className="with-hero-block" />
      <HeroEdit {...props} />
    </React.Fragment>
  );
};

export default Edit;
