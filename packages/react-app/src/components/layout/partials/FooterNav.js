import React from 'react';
import classNames from 'classnames';
import {Link} from 'react-router-dom';

function FooterNav(
  className
) {

  const classes = classNames(
    'footer-nav',
    className
  );

  return (
    <nav className={classes}>
      <ul className="list-reset">
        <li>
          <Link to="/roadmap">Roadmap</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
    </nav>
  );
}

export default FooterNav;
