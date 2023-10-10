import React from 'react';
import { Portal } from 'react-portal';
// import { Breadcrumbs } from '@plone/volto/components';
import { BodyClass } from '@plone/volto/helpers';
import HeroView from './HeroView';

function IsomorphicPortal({ children, active }) {
  const [isClient, setIsClient] = React.useState();
  React.useEffect(() => setIsClient(true), []);

  return isClient && active ? (
    <Portal node={document.getElementById('page-header')}>{children}</Portal>
  ) : (
    children
  );
}

const View = (props) => {
  return (
    <React.Fragment>
      <BodyClass className="with-hero-block" />
      <IsomorphicPortal active={!!(props.data.aboveBreadcrumbs ?? true)}>
        <div className="ui container hero-block-container">
          <HeroView {...props} />
          {/* <Breadcrumbs pathname={props.pathname} /> */}
        </div>
      </IsomorphicPortal>
    </React.Fragment>
  );
};

export default View;
