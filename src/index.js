import logo from '@eeacms/volto-climate-advisory-board-policy/../theme/assets/images/Header/logo.png';
import logoWhite from '@eeacms/volto-climate-advisory-board-policy/../theme/assets/images/Footer/logo-white.png';
import DocumentNarrowView from '@eeacms/volto-climate-advisory-board-policy/components/theme/Document/DocumentNarrowView';

const applyConfig = (config) => {
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
  return config;
};

export default applyConfig;
