import React from 'react';
import { useHistory } from 'react-router';
import { Transition } from 'semantic-ui-react';
import { Container, Grid, List, Icon, Accordion } from 'semantic-ui-react';
import { cloneDeep } from 'lodash';
import config from '@plone/volto/registry';

import { useClickOutside } from '@eeacms/volto-eea-design-system/helpers';

function removeTrailingSlash(str) {
  return str.replace(/\/+$/, '');
}

const Item = ({ item, icon = false, iconName, renderMenuItem }) => (
  <>
    {renderMenuItem(item, { className: 'sub-title' })}
    <List className="menu-list">
      {item.items.map((listItem, index) => (
        <React.Fragment key={index}>
          {renderMenuItem(
            listItem,
            {
              className: 'item',
              key: index,
              role: 'listitem',
            },
            { children: icon && <Icon className={iconName} /> },
          )}
        </React.Fragment>
      ))}
    </List>
  </>
);

const StandardMegaMenuGrid = ({
  menuItem,
  renderMenuItem,
  noChildrenNavigation,
}) => {
  const parentAsFirstItem = {
    title: menuItem?.title,
    url: menuItem?.url,
    descrition: menuItem?.description,
    items: [],
  };
  const showParent =
    parentAsFirstItem.title &&
    parentAsFirstItem.url &&
    !noChildrenNavigation.includes(parentAsFirstItem['url']);
  return (
    <Grid columns={4}>
      {showParent && (
        <Grid.Column>
          <Item item={parentAsFirstItem} renderMenuItem={renderMenuItem} />
        </Grid.Column>
      )}
      {menuItem.items.map(
        (section, index) =>
          !noChildrenNavigation.includes(parentAsFirstItem['url']) && (
            <Grid.Column key={index}>
              <Item item={section} renderMenuItem={renderMenuItem} />
            </Grid.Column>
          ),
      )}
    </Grid>
  );
};

const FirstLevelContent = ({ element, renderMenuItem, ...props }) => {
  let defaultIndex = -1;
  const pathName = removeTrailingSlash(props.pathName);

  return (
    <>
      {
        <React.Fragment>
          {element.items.map((item, index) => {
            let firstLevelPanels = [];
            const noChildrenNavigation = config.settings.ab.noChildrenNavigation.includes(
              item['url'],
            );
            if (!item.items.length || noChildrenNavigation) {
              return (
                <React.Fragment key={index}>
                  {renderMenuItem(item, { className: 'item sub-title' })}
                </React.Fragment>
              );
            }
            let x = {};
            x.key = item['@id'] || item['url'];
            if (pathName.indexOf(item.url) !== -1) {
              defaultIndex = index;
            }

            x.title = (
              <Accordion.Title
                key={`title=${index}`}
                active={pathName === item['url']}
              >
                {item.title}
                <Icon className="ri-arrow-down-s-line" size="small" />
              </Accordion.Title>
            );
            let overflow_item = cloneDeep(item);
            overflow_item.title = 'See all';
            x.content = (
              <Accordion.Content>
                {renderMenuItem(overflow_item, {
                  className: 'item title-item',
                })}
                {!noChildrenNavigation && (
                  <SecondLevelContent
                    element={item}
                    renderMenuItem={renderMenuItem}
                  />
                )}
              </Accordion.Content>
            );
            firstLevelPanels.push(x);
            return (
              <Accordion.Accordion
                panels={firstLevelPanels}
                key={index}
                defaultActiveIndex={defaultIndex === index ? 0 : -1}
              />
            );
          })}
        </React.Fragment>
      }
    </>
  );
};

const SecondLevelContent = ({ element, topics = false, renderMenuItem }) => {
  let content;
  if (topics) {
    const atAGlance = element.items.find(
      (element) => element.title === 'At a glance',
    );
    const inDepth = element.items.find(
      (element) => element.url.indexOf('in-depth') !== -1,
    );
    // eslint-disable-next-line no-unused-expressions
    if (inDepth) {
      inDepth.nav_title = 'A-Z Topics';
    }
    content = (
      <List>
        {atAGlance &&
          atAGlance.items.map((item, index) => (
            <React.Fragment key={index}>
              {renderMenuItem(item, {
                key: index,
                role: 'listitem',
                className: 'item',
              })}
            </React.Fragment>
          ))}
        {inDepth && (
          <React.Fragment key={inDepth.url}>
            {renderMenuItem(inDepth, {
              key: inDepth.url,
              role: 'listitem',
              className: 'item',
            })}
          </React.Fragment>
        )}
      </List>
    );
  } else {
    content = (
      <List>
        {element.items.map((item, index) => (
          <React.Fragment key={index}>
            {renderMenuItem(item, {
              key: index,
              role: 'listitem',
              className: 'item',
            })}
          </React.Fragment>
        ))}
      </List>
    );
  }

  return <>{content}</>;
};

const NestedAccordion = ({ menuItems, renderMenuItem, ...props }) => {
  const history = useHistory();
  let defaultIndex = -1;
  const rootPanels = [];

  const pathName = removeTrailingSlash(props.pathName);

  menuItems
    .filter((element) => ![''].includes(element.url))
    .forEach((element, index) => {
      let x = {};
      x.key = index;
      const noChildrenNavigation = config.settings.ab.noChildrenNavigation.includes(
        element.url,
      );

      if (pathName.indexOf(element.url) !== -1) {
        defaultIndex = index;
      }

      x.title = (
        <Accordion.Title
          key={`title-${index}`}
          active={pathName === element.url}
          index={index}
          onClick={() => {
            if (noChildrenNavigation) {
              history.push(element.url);
            }
          }}
        >
          {element.title}
          {!noChildrenNavigation && (
            <Icon className="ri-arrow-down-s-line" size="small" />
          )}
        </Accordion.Title>
      );
      const overview = cloneDeep(element);
      x.content = noChildrenNavigation ? null : (
        <Accordion.Content key={index}>
          <div className="mega-menu-title">
            {/* Inverted right labeled button as a category title - Mobile */}
            {renderMenuItem(
              overview,
              { className: 'ui button inverted icon right labeled' },
              {
                iconPosition: 'right',
                children: (
                  <>
                    {/* Add word overview to titles */}
                    <span> overview</span>
                    <Icon className={'arrow right icon'} alt={'Title icon'} />
                  </>
                ),
              },
            )}
          </div>
          <FirstLevelContent
            element={element}
            renderMenuItem={renderMenuItem}
            pathName={pathName}
          />
        </Accordion.Content>
      );
      rootPanels.push(x);
    });

  return <Accordion defaultActiveIndex={defaultIndex} panels={rootPanels} />;
};

function HeaderMenuPopUp({
  menuItems,
  renderMenuItem,
  pathName,
  onClose,
  triggerRefs,
  activeItem,
  visible,
  noChildrenNavigation,
}) {
  const nodeRef = React.useRef();
  useClickOutside({ targetRefs: [nodeRef, ...triggerRefs], callback: onClose });

  const menuItem = menuItems.find(
    (current) => current.url === activeItem || current['@id'] === activeItem,
  );

  return (
    <Transition visible={visible} animation="slide down" duration={300}>
      <div id="mega-menu" ref={nodeRef}>
        <Container>
          {menuItem && (
            <div className="menu-content tablet hidden mobile hidden">
              <StandardMegaMenuGrid
                menuItem={menuItem}
                renderMenuItem={renderMenuItem}
                noChildrenNavigation={noChildrenNavigation}
              />
            </div>
          )}
          <div className="tablet only mobile only">
            <NestedAccordion
              menuItems={menuItems}
              renderMenuItem={renderMenuItem}
              pathName={pathName}
            />
          </div>
        </Container>
      </div>
    </Transition>
  );
}

export default HeaderMenuPopUp;
