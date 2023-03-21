import logo from '@eeacms/volto-climate-advisory-board-policy/../theme/assets/images/Header/logo.png';
import logoWhite from '@eeacms/volto-climate-advisory-board-policy/../theme/assets/images/Footer/logo-white.png';
import { Icon } from '@plone/volto/components';
import contentBoxSVG from './icons/content-box.svg';

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

  return config;
};

export default applyConfig;
