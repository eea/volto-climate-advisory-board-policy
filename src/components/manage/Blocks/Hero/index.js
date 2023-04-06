import HeroEdit from './Edit';
import HeroView from './View';
import schema from './schema';

export default (config) => {
  if (config.blocks.blocksConfig.hero) {
    config.blocks.blocksConfig.hero = {
      ...config.blocks.blocksConfig.hero,
      schema,
      edit: HeroEdit,
      view: HeroView,
    };
  }

  return config;
};
