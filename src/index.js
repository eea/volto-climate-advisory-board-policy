import logo from '@eeacms/volto-climate-advisory-board-policy/../theme/assets/images/Header/logo.png';
import logoWhite from '@eeacms/volto-climate-advisory-board-policy/../theme/assets/images/Footer/logo-white.png';
import { Icon } from '@plone/volto/components';
import contentBoxSVG from './icons/content-box.svg';
import paintSVG from '@plone/volto/icons/paint.svg';
import DocumentNarrowView from '@eeacms/volto-climate-advisory-board-policy/components/theme/Document/DocumentNarrowView';
import { addStylingFieldsetSchemaEnhancer } from '@eeacms/volto-climate-advisory-board-policy/components/manage/Blocks/schema';

import installBlocks from './components/manage/Blocks';

import eeaWhiteLogo from '../theme/assets/svg/eea-logo-white.svg';

const applyConfig = (config) => {
  // Group
  if (config.blocks.blocksConfig.group) {
    config.blocks.blocksConfig.group.schemaEnhancer = addStylingFieldsetSchemaEnhancer;
  }

  // Columns
  if (config.blocks.blocksConfig.columnsBlock) {
    config.blocks.blocksConfig.columnsBlock.mostUsed = true;
    config.blocks.blocksConfig.columnsBlock.schemaEnhancer = addStylingFieldsetSchemaEnhancer;
  }

  // Listing
  if (config.blocks.blocksConfig.listing) {
    config.blocks.blocksConfig.listing.title = 'Listing (Content)';
    config.blocks.blocksConfig.listing.schemaEnhancer = addStylingFieldsetSchemaEnhancer;
  }

  // Hero image left
  if (config.blocks.blocksConfig.hero_image_left) {
    config.blocks.blocksConfig.hero_image_left.schemaEnhancer = addStylingFieldsetSchemaEnhancer;
  }

  config.settings.eea.headerOpts = {
    ...config.settings.eea.headerOpts,
    logo,
  };

  config.settings.eea.footerOpts = {
    ...config.settings.eea.footerOpts,
    logoWhite,
    sites: [
      {
        link: 'https://www.eea.europa.eu/',
        src: eeaWhiteLogo,
        alt: 'EEA',
      },
      {
        alt: 'European Scientific Advisory Board on Climate Change',
        link: 'https://climate-advisory-board.europa.eu/',
        src: logoWhite,
      },
    ],
  };

  config.settings.ab = {
    noChildrenNavigation: ['/reports-and-publications', '/news', '/contact'],
  };

  config.settings.pluggableStyles = [
    ...(config.settings.pluggableStyles || []),
    {
      id: 'content-box-keys',
      title: 'keys',
      previewComponent: () => (
        <Icon name={contentBoxSVG} size="88px" className="keys" />
      ),
      viewComponent: (props) => {
        return (
          <div className="content-box keys">
            <div className="content-box-inner">{props.children}</div>
          </div>
        );
      },
    },
    {
      id: 'content-box-blue',
      title: 'Blue',
      previewComponent: () => (
        <Icon name={contentBoxSVG} size="88px" className="blue" />
      ),
      viewComponent: (props) => {
        return (
          <div className="content-box blue">
            <div className="content-box-inner">{props.children}</div>
          </div>
        );
      },
    },
  ];
  config.settings.slate.styleMenu.blockStyles = [
    ...config.settings.slate.styleMenu.blockStyles,
    {
      cssClass: 'orange',
      label: 'Orange',
      icon: (props) => <Icon name={paintSVG} size="18px" />,
    },
  ];

  // Custom Homepage layouts
  config.views.layoutViews = {
    ...(config.views.layoutViews || {}),
    document_narrow_view: DocumentNarrowView,
  };
  config.views.layoutViewsNamesMapping = {
    ...(config.views.layoutViewsNamesMapping || {}),
    document_narrow_view: 'Document Narrow View',
  };

  config.settings.isMultilingual = false;
  if (config.blocks.blocksConfig.contextNavigation) {
    config.blocks.blocksConfig.contextNavigation.restricted = false;
  }

  return [installBlocks].reduce((acc, apply) => apply(acc), config);
};

export default applyConfig;
