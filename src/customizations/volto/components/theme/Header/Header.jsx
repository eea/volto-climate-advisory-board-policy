/**
 * Header component.
 * @module components/theme/Header/Header
 */
import React, { useState, useEffect, useRef } from 'react';
import cx from 'classnames';
import { Image, Container, Grid, Menu, Sticky } from 'semantic-ui-react';
import { connect, useDispatch, useSelector } from 'react-redux';

import { withRouter } from 'react-router-dom';
import { UniversalLink, SearchWidget } from '@plone/volto/components';
import { getBaseUrl, hasApiExpander } from '@plone/volto/helpers';
import { getNavigation } from '@plone/volto/actions';
import { Header, Logo } from '@eeacms/volto-eea-design-system/ui';
import { usePrevious } from '@eeacms/volto-eea-design-system/helpers';
import HeaderMenuPopUp from './HeaderMenuPopUp';

import closeIcon from '@eeacms/volto-eea-design-system/../theme/themes/eea/assets/images/Header/close-line.svg';
import burgerIcon from '@eeacms/volto-eea-design-system/../theme/themes/eea/assets/images/Header/menu-line.svg';
import eeaFlag from '@eeacms/volto-eea-design-system/../theme/themes/eea/assets/images/Header/eea.png';

import config from '@plone/volto/registry';
import { compose } from 'recompose';

function removeTrailingSlash(path) {
  return path.replace(/\/+$/, '');
}

const EEAHeader = ({ pathname, token, items, history, subsite }) => {
  const router_pathname = useSelector((state) => {
    return removeTrailingSlash(state.router?.location?.pathname) || '';
  });

  const isSubsite = subsite?.['@type'] === 'Subsite';
  const { eea, ab } = config.settings;
  const headerOpts = eea.headerOpts || {};
  const { logo, logoWhite } = headerOpts || {};
  const noChildrenNavigation = ab.noChildrenNavigation;
  const width = useSelector((state) => state.screen?.width);
  const dispatch = useDispatch();
  const headerEl = useRef();
  const prevYOffset = useRef(0);
  const hiddenRef = useRef(false);
  const previousToken = usePrevious(token);

  const [activeItem, setActiveItem] = useState(pathname);
  const [menuIsActive, setMenuIsActive] = useState(false);
  const [searchIsActive, setSearchIsActive] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [burger, setBurger] = useState('');
  const searchInputRef = React.useRef(null);

  const node = React.useRef();
  const mobileMenuBurgerRef = React.useRef();
  const desktopMenuRef = React.useRef();

  const isHomePageInverse = useSelector((state) => {
    const layout = state.content?.data?.layout;
    const has_home_layout =
      layout === 'homepage_inverse_view' ||
      (__CLIENT__ && document.body.classList.contains('homepage-inverse'));
    return (
      has_home_layout &&
      (removeTrailingSlash(pathname) === router_pathname ||
        router_pathname.endsWith('/edit'))
    );
  });

  const menuOnClickOutside = () => {
    // restore active element if nothing was selected from the menu dropdown
    if (pathname !== activeItem) {
      setActiveItem(pathname);
    }
    // close mobile navigation when clicking outside if we have value for nav
    if (burger) {
      setBurger('');
    }
    // always close the  menu
    setMenuIsActive(false);
  };

  const mobileBurgerOnClick = () => {
    if (searchIsActive === true) {
      setSearchIsActive(false);
    }

    if (burger === '') {
      setBurger('open');
      setMenuIsActive(true);
    } else {
      setBurger('');
      setMenuIsActive(false);
      setActiveItem('');
    }
  };

  const renderGlobalMenuItem = (item, { onClick }) => (
    <a
      href={item.url || '/'}
      title={item.title}
      onClick={(e) => {
        e.preventDefault();
        onClick(e, item);
      }}
    >
      {item.title}
    </a>
  );

  const menuOnClick = (e, item) => {
    if (searchIsActive) setSearchIsActive(false);
    setActiveItem(item['@id'] || item.url);
    if (item.items.length) {
      setMenuIsActive(true);
    } else {
      history.push(item.url);
    }
  };

  function handleScroll() {
    let direction;
    const hidden = hiddenRef.current;
    const bannerEl = document.querySelector('.stagingBanner');
    const pageYOffset = window.pageYOffset;

    // TOOD: Verifica egalitatea
    if (pageYOffset < prevYOffset.current) {
      direction = 'up';
    } else if (pageYOffset > prevYOffset.current) {
      direction = 'down';
    }

    // prevYOffset
    const offsetHeight =
      (headerEl.current?.stickyRect?.height || 0) +
      (bannerEl?.offsetHeight || 0);

    // x y z
    // true true true
    // true false false
    // false true/false true

    if (pageYOffset > offsetHeight && direction === 'up' && hidden) {
      setHidden(false);
    } else if (pageYOffset > offsetHeight && direction === 'down' && !hidden) {
      setHidden(true);
    } else if (pageYOffset <= offsetHeight && hidden) {
      setHidden(false);
    }

    prevYOffset.current = pageYOffset;
  }

  const redirectToPage = (e, item) => {
    setMenuIsActive(false);
    setActiveItem(item['@id'] || item['url']);
    history.push(item.url);
  };

  useEffect(() => {
    const { settings } = config;
    const base_url = getBaseUrl(pathname);
    if (!hasApiExpander('navigation', base_url)) {
      dispatch(getNavigation(base_url, settings.navDepth));
    }
  }, [pathname, dispatch]);

  useEffect(() => {
    if (token !== previousToken) {
      const { settings } = config;
      const base = getBaseUrl(pathname);
      if (!hasApiExpander('navigation', base)) {
        dispatch(getNavigation(base, settings.navDepth));
      }
    }
  }, [token, dispatch, pathname, previousToken]);

  useEffect(() => {
    if (searchIsActive) {
      searchInputRef.current && searchInputRef.current.focus();
    }
  }, [searchIsActive]);

  useEffect(() => {
    setMenuIsActive(false);
    setSearchIsActive(false);
    setBurger('');
    // remove active menu when we have no pathname which means we hit logo to go home
    if (!pathname) {
      setActiveItem('');
    }
    if (pathname !== activeItem) {
      setActiveItem(pathname);
    }
  }, [pathname]);

  useEffect(() => {
    hiddenRef.current = hidden;
  }, [hidden]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Sticky
      className={cx('sticky-eea-header', { hidden })}
      context={__CLIENT__ && document.querySelector('.content-area')}
      ref={headerEl}
    >
      <div className="eea header">
        <Header.TopHeader>
          <Header.TopItem className="official-union">
            <Image src={eeaFlag} alt="eea flag"></Image>
            <Header.TopDropdownMenu
              text="An official website of the European Union | How do you know?"
              tabletText="EEA information systems"
              mobileText=" "
              icon="chevron down"
              aria-label="dropdown"
              className=""
              viewportWidth={width}
            >
              <div
                className="content"
                role="menu"
                tabIndex="0"
                onClick={(evt) => evt.stopPropagation()}
                onKeyDown={(evt) => evt.stopPropagation()}
              >
                <p>
                  All official European Union website addresses are in the{' '}
                  <b>europa.eu</b> domain.
                </p>
                <a
                  href="https://europa.eu/european-union/contact/institutions-bodies_en"
                  target="_blank"
                  rel="noreferrer"
                  role="option"
                  aria-selected="false"
                >
                  See all EU institutions and bodies
                </a>
              </div>
            </Header.TopDropdownMenu>
          </Header.TopItem>
        </Header.TopHeader>
        <div className={'main bar'} ref={node}>
          <Container>
            <Grid>
              <Grid.Column
                mobile={4}
                tablet={4}
                computer={2}
                className="left-menu"
                floated="left"
              >
                <div {...(isSubsite ? { className: 'logo-wrapper' } : {})}>
                  <Logo
                    src={isHomePageInverse ? logoWhite : logo}
                    title={eea.websiteTitle}
                    alt={eea.organisationName}
                    url={eea.logoTargetUrl}
                  />

                  {!!subsite && subsite.title && (
                    <UniversalLink item={subsite} className="subsite-logo">
                      {subsite.title}
                    </UniversalLink>
                  )}
                </div>
              </Grid.Column>
              <Grid.Column
                mobile={1}
                tablet={2}
                computer={7}
                className="mobile hidden tablet hidden"
              >
                <div
                  className={
                    isHomePageInverse ? 'main-menu inverted' : 'main-menu'
                  }
                >
                  {items && (
                    <div
                      className="ui text eea-main-menu tablet or lower hidden menu"
                      ref={desktopMenuRef}
                      id={'navigation'}
                    >
                      {items.map((item) => (
                        <Menu.Item
                          name={item['@id'] || item.url}
                          key={item['@id'] || item.url}
                          active={
                            activeItem.indexOf(item['@id']) !== -1 ||
                            activeItem.indexOf(item.url) !== -1
                          }
                        >
                          {renderGlobalMenuItem(item, {
                            onClick: noChildrenNavigation.includes(item.url)
                              ? redirectToPage
                              : menuOnClick,
                          })}
                        </Menu.Item>
                      ))}
                    </div>
                  )}
                </div>
              </Grid.Column>
              <Grid.Column
                mobile={6}
                tablet={6}
                computer={3}
                className="right-menu"
                floated="right"
              >
                <div className="search-ab">
                  <SearchWidget pathname="" />
                </div>
                <Header.BurgerAction
                  className="mobile"
                  onClick={mobileBurgerOnClick}
                  ref={mobileMenuBurgerRef}
                >
                  <Image
                    src={burger === 'open' ? `${closeIcon}` : `${burgerIcon}`}
                    alt="menu icon open/close"
                  />
                </Header.BurgerAction>
              </Grid.Column>
            </Grid>
            <HeaderMenuPopUp
              renderMenuItem={(item, options, props) => (
                <UniversalLink
                  href={item.url || '/'}
                  title={item.nav_title || item.title}
                  {...(options || {})}
                  className={cx(options?.className, {
                    active: item.url === router_pathname,
                  })}
                >
                  {props?.iconPosition !== 'right' && props?.children}
                  <span>{item.nav_title || item.title}</span>
                  {props?.iconPosition === 'right' && props?.children}
                </UniversalLink>
              )}
              activeItem={activeItem}
              menuItems={items}
              pathName={pathname}
              onClose={menuOnClickOutside}
              triggerRefs={[mobileMenuBurgerRef, desktopMenuRef]}
              visible={menuIsActive}
              noChildrenNavigation={noChildrenNavigation}
            />
          </Container>
        </div>
      </div>
    </Sticky>
  );
};

export default compose(
  withRouter,
  connect(
    (state) => ({
      token: state.userSession.token,
      items: state.navigation.items,
      subsite: state.content.data?.['@components']?.subsite,
    }),
    { getNavigation },
  ),
)(EEAHeader);
