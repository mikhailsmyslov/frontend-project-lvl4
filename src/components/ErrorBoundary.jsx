import React from 'react';
import { withTranslation } from 'react-i18next';
import log from '../../lib/logger';

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
      return <h1>{t('errors.oops')}</h1>;
    }

    return children;
  }
}

export default withTranslation()(ErrorBoundary);
