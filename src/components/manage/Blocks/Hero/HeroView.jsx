import React, { useCallback, useMemo } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { compose } from 'redux';
import { BodyClass } from '@plone/volto/helpers';
import { serializeText } from '@eeacms/volto-hero-block/helpers';
import Hero from '@eeacms/volto-hero-block/components/Blocks/Hero/Hero';
import Banner from '@eeacms/volto-eea-design-system/ui/Banner/Banner';
import { getImageScaleParams } from '@eeacms/volto-object-widget/helpers';
import config from '@plone/volto/registry';
import HeroMetadata from './HeroMetadata';
import HeroCopyright from './HeroCopyright';

const messages = defineMessages({
  published: {
    id: 'Published',
    defaultMessage: 'Published',
  },
});

const View = (props) => {
  const { data = {}, intl } = props;
  const { text, copyright, copyrightIcon, copyrightPosition } = data;
  const copyrightPrefix = config.blocks.blocksConfig.hero.copyrightPrefix || '';
  const metadata = props.metadata || props.properties;
  const { hidePublishingDate } = props.data;
  const heroImage = getImageScaleParams(data.image, 'large');

  // Set dates
  const getDate = useCallback(
    (hidden, key) => {
      return !hidden && metadata[key] ? metadata[key] : null;
    },
    [metadata],
  );

  const publishingDate = useMemo(
    () => getDate(hidePublishingDate, 'effective'),
    [getDate, hidePublishingDate],
  );

  return (
    <React.Fragment>
      <BodyClass className="with-hero-block" />
      <Hero
        {...data}
        image={data.image}
        image_url={heroImage?.download}
        height={heroImage?.height}
      >
        <Hero.Text {...data}>{serializeText(text)}</Hero.Text>
        <Hero.Meta>
          <Banner.MetadataField
            type="date"
            label={intl.formatMessage(messages.published)}
            value={publishingDate}
          />
        </Hero.Meta>
        <Hero.Meta {...data}>
          <HeroMetadata {...data} />
        </Hero.Meta>
        <HeroCopyright
          copyright={copyright}
          copyrightIcon={copyrightIcon}
          copyrightPosition={copyrightPosition}
          copyrightPrefix={copyrightPrefix}
        />
      </Hero>
    </React.Fragment>
  );
};

export default compose(injectIntl)(View);
