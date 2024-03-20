import newsLetterForm from './NewsletterForm';
import newsSVG from '@plone/volto/icons/news.svg';

const config = (config) => {
  config.blocks.blocksConfig.newsletter_form = {
    id: 'newsletter_form',
    title: 'Newsletters Form',
    icon: newsSVG,
    group: 'common',
    restricted: false,
    mostUsed: true,
    edit: newsLetterForm,
    view: newsLetterForm,
  };

  return config;
};

export default config;
