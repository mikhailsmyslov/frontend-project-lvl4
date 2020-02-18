import React from 'react';
import classnames from 'classnames';
import UserContext from '../UserContext';

const Header = (props) => {
  const { className } = props;
  const classes = classnames({
    'bg-dark': true,
    'text-white': true,
    'd-flex': true,
    'py-3': true,
  }, className);

  return (
    <UserContext.Consumer>
      {({ currentUser }) => (
        <header className={classes}>
          {currentUser}
        </header>
      )}
    </UserContext.Consumer>
  );
};

Header.displayName = 'Header';
export default Header;
