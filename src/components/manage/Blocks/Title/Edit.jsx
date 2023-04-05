import React from 'react';
import { BodyClass } from '@plone/volto/helpers';
import TitleEdit from '@eeacms/volto-eea-website-theme/components/manage/Blocks/Title/Edit';

const Edit = (props) => {
  return (
    <React.Fragment>
      <BodyClass className="with-title-block" />
      <TitleEdit {...props} />
    </React.Fragment>
  );
};

export default Edit;
