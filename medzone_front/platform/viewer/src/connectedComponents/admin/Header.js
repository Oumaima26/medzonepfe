import React, { useState, useEffect } from 'react';
import { Link, withRouter, NavLink, Route, useHistory } from 'react-router-dom';
import { withTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Dropdown, AboutContent, withModal, Icon } from '@ohif/ui';

import logo from '../../components/Header/logo.png'
import './Header.css';

function Header(props) {
  const {
    t,
    user,
    userManager,
    modal: { show },
    useLargeLogo,
    linkPath,
    linkText,
    location,
    children,
  } = props;

  const [options, setOptions] = useState([]);
  const [optionsuser, setOptionsuser] = useState([]);
  const hasLink = linkText && linkPath;
  const email = localStorage.getItem('emailadmin');
  let history = useHistory();
  useEffect(() => {
    const optionsValue = [
      {
        title: t('About'),
        icon: { name: 'info' },
        onClick: () =>
          show({
            content: AboutContent,
            title: t('MEDzone - About'),
          }),
      },
      {
        title: t('Add Patient'),
        icon: { name: 'soft-tissu' },
        onClick: () =>
          history.push('/add-patient')
      },

    ];

    const optionsValue2 = [

      {
        title: 'Logout',

        onClick: () =>
          logout()
      },
    ];

    if (user && userManager) {
      optionsValue.push({
        title: t('Logout'),
        icon: { name: 'power-off' },
        onClick: () => userManager.signoutRedirect(),
      });
    }

    setOptions(optionsValue);
    setOptionsuser(optionsValue2);
  }, [setOptions, show, t, user, userManager]);


  function logout() {
    localStorage.removeItem('emailadmin');
    history.push('/authadmin')
    window.location.reload(false);

  }

  return (
    <>
      <div className={classNames('entry-heade')}>

        <div className="header-left-box">
          <div className='logo'>
            <img src={logo} width='180px' height='50px'></img>
          </div>
        </div>
        <div className="header-menu">
          <NavLink to='/radiologue'  >
            <span className="research-use"> Home</span>
          </NavLink>
          <a href='/profil'>
            <span className="research-use" style={{ "position": "relative", "marginLeft": "450px" }}>
              {
                email
              }

            </span>
          </a>
          <a href='/authadmin'>
            <span className="research-use">
              Logout
              <Icon name='power-off' />
            </span>
          </a>

        </div>
      </div>
    </>
  );
}

Header.propTypes = {
  // Study list, /
  linkText: PropTypes.string,
  linkPath: PropTypes.string,
  useLargeLogo: PropTypes.bool,
  //
  location: PropTypes.object.isRequired,
  children: PropTypes.node,
  t: PropTypes.func.isRequired,
  userManager: PropTypes.object,
  user: PropTypes.object,
  modal: PropTypes.object,
};

export default withTranslation(['Header', 'AboutModal'])(
  withRouter(withModal(Header))
);
