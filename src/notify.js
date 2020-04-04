import { store } from 'react-notifications-component';
import 'animate.css';
import { isPlainObject } from 'lodash';
import i18n from 'i18next';

const configuration = {
  title: 'Error',
  message: '',
  type: 'warning',
  insert: 'top',
  container: 'top-right',
  animationIn: ['animated', 'fadeIn'],
  animationOut: ['animated', 'fadeOut'],
  dismiss: {
    duration: 0,
  },
};

export default (options) => {
  let message = i18n.t('errors.oops');
  switch (true) {
    case typeof options === 'string':
      message = options;
      break;
    case isPlainObject(options):
      message = options.message;
      break;
    default:
      throw new Error('Unexpected argument passed. Expected object or string.');
  }
  if (!message) message = configuration.message;
  store.addNotification({ ...configuration, message });
};
