import React from 'react';
import { BodyClass } from '@plone/volto/helpers';
import TitleView from '@eeacms/volto-eea-website-theme/components/manage/Blocks/Title/View';

const View = (props) => {
  return (
    <React.Fragment>
      <BodyClass className="with-title-block" />
      <TitleView {...props} />
    </React.Fragment>
  );
};

export default View;
