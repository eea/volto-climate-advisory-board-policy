import installHeroBlock from './Hero';
import installTitleBlock from './Title';
import installNewsLetterForm from './NewsletterForm';
import installContextNavigationBlock from './ContextNavigation';

export default function applyConfig(config) {
  return [
    installContextNavigationBlock,
    installHeroBlock,
    installTitleBlock,
    installNewsLetterForm,
  ].reduce((acc, apply) => apply(acc), config);
}
