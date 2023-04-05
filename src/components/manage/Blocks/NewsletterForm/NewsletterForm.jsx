import React from 'react';
import { BodyClass } from '@plone/volto/helpers';
import newsLetterFormHTML from './newsLetterFormHTML';

const markup = { __html: newsLetterFormHTML };

const NewsletterForm = (props) => {
  return (
    <React.Fragment>
      <BodyClass className="with-newsletter-form" />
      <div dangerouslySetInnerHTML={markup}></div>
    </React.Fragment>
  );
};

export default NewsletterForm;
