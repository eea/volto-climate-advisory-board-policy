/**
 * Footer component.
 * @module components/theme/Footer/Footer
 */

import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { flattenToAppURL } from '@plone/volto/helpers';
import EEAFooter from '@eeacms/volto-eea-design-system/ui/Footer/Footer';
import FooterSites from './FooterSites';
import FooterActions from './FooterActions';
import config from '@plone/volto/registry';
import { Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

const Footer = () => {
  const { eea } = config.settings;
  const logo = eea.footerOpts.logoWhite;
  const {
    footerActions = [],
    copyrightActions = [],
    socialActions = [],
  } = useSelector(
    (state) => ({
      footerActions: state.actions?.actions?.footer_actions,
      copyrightActions: state.actions?.actions?.copyright_actions,
      socialActions: state.actions?.actions?.social_actions,
    }),
    shallowEqual,
  );
  // ZMI > portal_actions > footer_actions
  const actions = footerActions.length
    ? footerActions.map((action) => ({
        title: action.title,
        link: flattenToAppURL(action.url),
      }))
    : eea.footerOpts.actions;

  // ZMI > portal_actions > copyright_actions
  const copyright = copyrightActions.length
    ? copyrightActions.map((action) => ({
        title: action.title,
        site: action.title,
        link: flattenToAppURL(action.url),
      }))
    : eea.footerOpts.copyright;

  // ZMI > portal_actions > social_actions
  const social = socialActions.length
    ? socialActions.map((action) => ({
        name: action.id,
        icon: action.icon,
        link: action.url,
      }))
    : eea.footerOpts.social;

  const siteUrl = eea?.logoTargetUrl;

  return (
    <EEAFooter>
      <Grid stackable>
        <Grid.Row>
          <Grid.Column mobile={6} tablet={9} computer={10}>
            <ul className="footer-nav" id="footer_links">
              <li>
                <Link className="item" to="/">
                  <FormattedMessage id="home" defaultMessage="Home" />
                </Link>
              </li>
              <li>
                <Link className="item" to="/reports-and-publications">
                  <FormattedMessage
                    id="report-and=publications"
                    defaultMessage="Reports and publications"
                  />
                </Link>
              </li>
              <li>
                <Link className="item" to="/news">
                  <FormattedMessage id="news" defaultMessage="News" />
                </Link>
              </li>
              <li>
                <Link className="item" to="/about">
                  <FormattedMessage id="about" defaultMessage="About" />
                </Link>
              </li>
              <li>
                <Link className="item" to="/contact">
                  <FormattedMessage id="contact" defaultMessage="Contact" />
                </Link>
              </li>
            </ul>
          </Grid.Column>
          <Grid.Column
            mobile={6}
            tablet={3}
            computer={2}
            className="text-right"
          >
            <Link to={siteUrl}>
              <img
                className="ab-footer"
                src={logo}
                alt="ADVISORY"
                height={80}
                width={120}
              />
            </Link>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <hr />
      <div className="subfooter">
        <div className="subfooter-info">
          <div className="subfooter-social">
            <h5>Follow us</h5>
            <EEAFooter.Social social={social} />
          </div>
          <div className="subfooter-contact">
            <h5>Contact us</h5>
            <div className="subfooter-contact-info">
              <a href="/contact">
                <i aria-hidden="true" className="icon mail outline"></i>
                Send us an e-mail
              </a>
              <a href="/contact">
                <i aria-hidden="true" className="icon call"></i>
                Call us
              </a>
            </div>
          </div>
        </div>
        <div className="subfooter-other">
          <h5>More about climate change in the EU:</h5>
          <FooterSites sites={eea.footerOpts.sites} />
        </div>
      </div>
      <FooterActions actions={actions} copyright={copyright} />
    </EEAFooter>
  );
};

export default Footer;
