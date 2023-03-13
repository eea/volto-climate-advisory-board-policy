import logoWhite from '@eeacms/volto-climate-advisory-board-policy/../theme/assets/images/Footer/logo-white.png';

const applyConfig = (config) => {
  config.settings.eea.footerOpts = {
    ...config.settings.eea.footerOpts,
    logoWhite,
    sites: [
      {
        link: 'https://www.eea.europa.eu/',
        src: 'http://localhost:3001/static/media/eea-logo-white.da328514.svg',
        alt: 'EEA',
      },
      {
        alt: 'Climate and energy in the EU',
        link: 'https://climate-energy.eea.europa.eu/',
        src: 'http://localhost:3001/static/media/energy.5a7173e6.svg',
      },
    ],
  };
  return config;
};

export default applyConfig;
