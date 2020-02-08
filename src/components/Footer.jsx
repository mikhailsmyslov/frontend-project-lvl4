import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faGithub,
  faBootstrap,
  faJs,
  faReact,
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => (
  <footer className="py-3 bg-dark mt-auto text-white-50">
    <div className="text-center">
      <a className="text-secondary" href="https://github.com/mikhailsmyslov/frontend-project-lvl4">
        <FontAwesomeIcon icon={faGithub} size="lg" className="mx-2" />
      </a>
      <a className="text-secondary" href="https://react-bootstrap.netlify.com/">
        <FontAwesomeIcon icon={faBootstrap} size="lg" className="mx-2" />
      </a>
      <a className="text-secondary" href="https://developer.mozilla.org/ru/">
        <FontAwesomeIcon icon={faJs} size="lg" className="mx-2" />
      </a>
      <a className="text-secondary" href="https://ru.reactjs.org/">
        <FontAwesomeIcon icon={faReact} size="lg" className="mx-2" />
      </a>
    </div>
  </footer>
);

Footer.displayName = 'Footer';

export default Footer;
