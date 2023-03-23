import logo from '@eeacms/volto-climate-advisory-board-policy/../theme/assets/images/Header/logo.png';
import logoWhite from '@eeacms/volto-climate-advisory-board-policy/../theme/assets/images/Footer/logo-white.png';
import { Icon } from '@plone/volto/components';
import contentBoxSVG from './icons/content-box.svg';
import paintSVG from '@plone/volto/icons/paint.svg';
import DocumentNarrowView from '@eeacms/volto-climate-advisory-board-policy/components/theme/Document/DocumentNarrowView';
import installContextNavigationBlock from '@eeacms/volto-climate-advisory-board-policy/components/Blocks/ContextNavigation';

const applyConfig = (config) => {
  config.settings.eea.headerOpts = {
    ...config.settings.eea.headerOpts,
    logo,
  };
  // context navigation
  config = [installContextNavigationBlock].reduce(
    (acc, apply) => apply(acc),
    config,
  );

  config.settings.eea.footerOpts = {
    ...config.settings.eea.footerOpts,
    logoWhite,
    sites: [
      {
        link: 'https://www.eea.europa.eu/',
        src: '/static/media/eea-logo-white.da328514.svg',
        alt: 'EEA',
      },
      {
        alt: 'Climate and energy in the EU',
        link: 'https://climate-energy.eea.europa.eu/',
        src: '/static/media/energy.5a7173e6.svg',
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
  return config;
};

export default applyConfig;
