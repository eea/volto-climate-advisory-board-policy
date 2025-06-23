import React, { useCallback, useMemo } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import isFunction from "lodash/isFunction";
import config from "@plone/volto/registry";
import { BlockDataForm, SidebarPortal } from "@plone/volto/components";
import { BodyClass } from "@plone/volto/helpers";
import SlateEditor from "@plone/volto-slate/editor/SlateEditor";
import { handleKey } from "@plone/volto-slate/blocks/Text/keyboard";
import {
  uploadContent,
  saveSlateBlockSelection,
} from "@plone/volto-slate/actions";

import { defineMessages, injectIntl } from "react-intl";
import { createSlateHeader } from "@eeacms/volto-hero-block/helpers";
import Hero from "@eeacms/volto-hero-block/components/Blocks/Hero/Hero";
import Banner from "@eeacms/volto-eea-design-system/ui/Banner/Banner";
import { getImageScaleParams } from "@eeacms/volto-object-widget/helpers";
import HeroMetadata from "./HeroMetadata";
import HeroCopyright from "./HeroCopyright";

const messages = defineMessages({
  published: {
    id: "Published",
    defaultMessage: "Published",
  },
});

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
  const copyrightPrefix = config.blocks.blocksConfig.hero.copyrightPrefix || "";
  const heroImage = getImageScaleParams(data.image, "large");
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
    () => getDate(hidePublishingDate, "effective"),
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
      <Hero {...data} image={heroImage?.download} height={heroImage?.height}>
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
          <HeroMetadata {...data} />
        </Hero.Meta>
        <HeroCopyright
          copyright={copyright}
          copyrightIcon={copyrightIcon}
          copyrightPosition={copyrightPosition}
          copyrightPrefix={copyrightPrefix}
        />
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
