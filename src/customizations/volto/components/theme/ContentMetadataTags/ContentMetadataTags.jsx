import { toPublicURL, Helmet } from "@plone/volto/helpers";
import config from "@plone/volto/registry";
import { getImageScaleParams } from "@eeacms/volto-object-widget/helpers";

const ContentMetadataTags = (props) => {
  const {
    opengraph_title,
    opengraph_description,
    seo_title,
    seo_description,
    seo_canonical_url,
    seo_noindex,
    title,
    description,
  } = props.content;

  const getContentImageInfo = () => {
    const { contentMetadataTagsImageField } = config.settings;
    const image_field = props.content[contentMetadataTagsImageField];
    const preview_image = props.content.preview_image;
    const preview_image_link = props.content.preview_image_link;
    const { opengraph_image } = props.content;
    let image = undefined;

    if (opengraph_image !== undefined && opengraph_image) {
      image = opengraph_image;
    } else if (preview_image_link !== undefined && preview_image_link) {
      image = preview_image_link[contentMetadataTagsImageField];
    } else if (preview_image !== undefined && preview_image) {
      image = preview_image;
    } else if (image_field !== undefined && image_field) {
      image = image_field;
    }

    const imageInfo = getImageScaleParams(image, "large");
    const ogImageInfo = getImageScaleParams(opengraph_image, "large");

    const contentImageInfo = {
      contentHasImage: !!imageInfo?.download,
      url: null,
      height: null,
      width: null,
      alt: null,
    };

    if (contentImageInfo.contentHasImage && ogImageInfo) {
      contentImageInfo.url = ogImageInfo.download;
      contentImageInfo.height = ogImageInfo.height;
      contentImageInfo.width = ogImageInfo.width;
      contentImageInfo.alt = opengraph_image?.alt || title || "Image";
    } else if (contentImageInfo.contentHasImage) {
      contentImageInfo.url = toPublicURL(imageInfo.download);
      contentImageInfo.height = imageInfo.height;
      contentImageInfo.width = imageInfo.width;
      contentImageInfo.alt = image?.alt || title || "Image";
    }

    return contentImageInfo;
  };

  const contentImageInfo = getContentImageInfo();

  return (
    <Helmet>
      <title>{(seo_title || title)?.replace(/\u00AD/g, "")}</title>
      <link
        rel="canonical"
        href={seo_canonical_url || toPublicURL(props.content["@id"])}
      />
      <meta name="description" content={seo_description || description} />
      <meta
        property="og:title"
        content={opengraph_title || seo_title || title}
      />
      <meta property="og:type" content="website" />
      <meta
        property="og:url"
        content={seo_canonical_url || toPublicURL(props.content["@id"])}
      />
      {seo_noindex && <meta name="robots" content="noindex" />}
      {contentImageInfo.contentHasImage && (
        <meta property="og:image" content={toPublicURL(contentImageInfo.url)} />
      )}
      {contentImageInfo.contentHasImage && (
        <meta property="og:image:alt" content={contentImageInfo.alt} />
      )}
      {contentImageInfo.contentHasImage && (
        <meta
          property="twitter:image"
          content={toPublicURL(contentImageInfo.url)}
        />
      )}
      {contentImageInfo.contentHasImage && (
        <meta
          name="twitter:image"
          content={toPublicURL(contentImageInfo.url)}
        />
      )}
      {contentImageInfo.contentHasImage && (
        <meta property="og:image:width" content={contentImageInfo.width} />
      )}
      {contentImageInfo.contentHasImage && (
        <meta property="og:image:height" content={contentImageInfo.height} />
      )}
      {contentImageInfo.contentHasImage && (
        <meta name="twitter:image:alt" content={contentImageInfo.alt} />
      )}
      {(opengraph_description || seo_description || description) && (
        <meta
          property="og:description"
          content={opengraph_description || seo_description || description}
        />
      )}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        property="twitter:url"
        content={seo_canonical_url || toPublicURL(props.content["@id"])}
      />
      {/* TODO: Improve SEO backend metadata providers by adding the twitter handler */}
      {/* <meta property="twitter:site" content={'@my_twitter_handler'} /> */}
      <meta
        property="twitter:title"
        content={opengraph_title || seo_title || title}
      />
      <meta
        property="twitter:description"
        content={seo_description || description}
      />
      <meta property="twitter:domain" content={config.settings.publicURL} />
    </Helmet>
  );
};

export default ContentMetadataTags;
