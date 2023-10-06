import React, { useCallback, useMemo } from 'react';
import { defineMessages, injectIntl } from 'react-intl';
import { compose } from 'redux';
import cx from 'classnames';
import { Icon } from 'semantic-ui-react';
import { UniversalLink } from '@plone/volto/components';
import { BodyClass } from '@plone/volto/helpers';
import { serializeText } from '@eeacms/volto-hero-block/helpers';
import Hero from '@eeacms/volto-hero-block/components/Blocks/Hero/Hero';
import Banner from '@eeacms/volto-eea-design-system/ui/Banner/Banner';
import Copyright from '@eeacms/volto-hero-block/components/Blocks/Hero/Copyright';
import config from '@plone/volto/registry';

const messages = defineMessages({
  published: {
    id: 'Published',
    defaultMessage: 'Published',
  },
});

const Metadata = ({ buttonLabel, buttonLink, inverted, styles }) => {
  const { buttonVariant = 'white' } = styles || {};

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

const View = (props) => {
  console.log('here', props);
  const { data = {}, intl } = props;
  const { text, copyright, copyrightIcon, copyrightPosition } = data;
  const copyrightPrefix = config.blocks.blocksConfig.hero.copyrightPrefix || '';
  const metadata = props.metadata || props.properties;
  const { hidePublishingDate } = props.data;

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
      <Hero {...data}>
        <Hero.Text {...data}>{serializeText(text)}</Hero.Text>
        <Hero.Meta>
          <Banner.MetadataField
            type="date"
            label={intl.formatMessage(messages.published)}
            value={publishingDate}
          />
        </Hero.Meta>
        <Hero.Meta {...data}>
          <Metadata {...data} />
        </Hero.Meta>
        {copyright ? (
          <Copyright copyrightPosition={copyrightPosition}>
            <Copyright.Prefix>{copyrightPrefix}</Copyright.Prefix>
            <Copyright.Icon>
              <Icon className={copyrightIcon} />
            </Copyright.Icon>
            <Copyright.Text>{copyright}</Copyright.Text>
          </Copyright>
        ) : (
          ''
        )}
      </Hero>
    </React.Fragment>
  );
};

export default compose(injectIntl)(View);
