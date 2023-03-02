import logo from '@eeacms/volto-climate-advisory-board-policy/../theme/assets/images/Header/logo.png';

const applyConfig = (config) => {
  config.settings.eea.headerOpts = {
    ...config.settings.eea.headerOpts,
    logo,
    // logoWhite,
  };
  return config;
};

export default applyConfig;
