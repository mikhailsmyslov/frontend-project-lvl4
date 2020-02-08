import React from 'react';
import classnames from 'classnames';

const Header = (props) => {
  const { className } = props;
  const classes = classnames({
    'bg-dark': true,
    'text-white': true,
    'd-flex': true,
    'py-3': true,
  }, className);
  return (
    <header className={classes}>
      Some information
    </header>
  );
};

Header.displayName = 'Header';
export default Header;
