import React, { useCallback, useMemo } from 'react';
import cx from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import isFunction from 'lodash/isFunction';
import { Icon } from 'semantic-ui-react';
import config from '@plone/volto/registry';
import {
  BlockDataForm,
  SidebarPortal,
  UniversalLink,
} from '@plone/volto/components';
import { BodyClass } from '@plone/volto/helpers';
import SlateEditor from '@plone/volto-slate/editor/SlateEditor';
import { handleKey } from '@plone/volto-slate/blocks/Text/keyboard';
import {
  uploadContent,
  saveSlateBlockSelection,
} from '@plone/volto-slate/actions';

import { defineMessages, injectIntl } from 'react-intl';
import { createSlateHeader } from '@eeacms/volto-hero-block/helpers';
import Hero from '@eeacms/volto-hero-block/components/Blocks/Hero/Hero';
import Copyright from '@eeacms/volto-hero-block/components/Blocks/Hero/Copyright';
import Banner from '@eeacms/volto-eea-design-system/ui/Banner/Banner';

const messages = defineMessages({
  published: {
    id: 'Published',
    defaultMessage: 'Published',
  },
});

const Metadata = ({ buttonLabel, buttonLink, inverted, styles }) => {
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

const Edit = (props) => {
  const { slate } = config.settings;
  const {
    data = {},
    block = null,
    selected = false,
    index,
    properties,
    onChangeBlock,
    onSelectBlock,
    intl,
  } = props;
  const metadata = props.metadata || props.properties;
  const { hidePublishingDate } = props.data;
  const { text, copyright, copyrightIcon, copyrightPosition } = data;
  const copyrightPrefix = config.blocks.blocksConfig.hero.copyrightPrefix || '';
  const schema = React.useMemo(() => {
    const blockSchema = config.blocks.blocksConfig.hero.schema;
    if (isFunction(blockSchema)) {
      return blockSchema(props);
    }
    return blockSchema;
  }, [props]);

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

  const withBlockProperties = React.useCallback(
    (editor) => {
      editor.getBlockProps = () => props;
      return editor;
    },
    [props],
  );

  const handleFocus = React.useCallback(() => {
    if (!selected) {
      onSelectBlock(block);
    }
  }, [onSelectBlock, selected, block]);

  return (
    <>
      <BodyClass className="with-hero-block" />
      <Hero {...data}>
        <Hero.Text {...data}>
          <SlateEditor
            index={index}
            properties={properties}
            extensions={slate.textblockExtensions}
            renderExtensions={[withBlockProperties]}
            value={createSlateHeader(text)}
            onChange={(text) => {
              onChangeBlock(block, {
                ...data,
                text,
              });
            }}
            block={block}
            onFocus={handleFocus}
            onKeyDown={handleKey}
            selected={selected}
            placeholder="Add text..."
            slateSettings={slate}
          />
        </Hero.Text>
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

      <SidebarPortal selected={selected}>
        <BlockDataForm
          block={block}
          schema={schema}
          title={schema.title}
          onChangeField={(id, value) => {
            onChangeBlock(block, {
              ...data,
              [id]: value,
            });
          }}
          formData={data}
        />
      </SidebarPortal>
    </>
  );
};

export default compose(
  connect(
    (state, props) => {
      const blockId = props.block;
      return {
        defaultSelection: blockId
          ? state.slate_block_selections?.[blockId]
          : null,
        uploadRequest: state.upload_content?.[props.block]?.upload || {},
        uploadedContent: state.upload_content?.[props.block]?.data || {},
      };
    },
    {
      uploadContent,
      saveSlateBlockSelection, // needed as editor blockProps
    },
  ),
)(injectIntl(Edit));
