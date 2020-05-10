// @ts-check
import React from 'react';
import { withTranslation } from 'react-i18next';
import logger from '../../lib/logger';

const log = logger('Error');

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    log(error, errorInfo);
  }

  render() {
    const { hasError } = this.state;
    const { children, t } = this.props;
    if (hasError) {
      return (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
          <h1>{t('errors.oops')}</h1>
        </div>
      );
    }

    return children;
  }
}

export default withTranslation()(ErrorBoundary);
