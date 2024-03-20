import TitleEdit from './Edit';
import TitleView from './View';

const config = (config) => {
  if (config.blocks.blocksConfig.title) {
    config.blocks.blocksConfig.title = {
      ...config.blocks.blocksConfig.title,
      edit: TitleEdit,
      view: TitleView,
    };
  }

  return config;
};

export default config;
