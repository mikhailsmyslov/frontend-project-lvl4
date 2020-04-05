import { store } from 'react-notifications-component';
import 'animate.css';
import { isPlainObject } from 'lodash';
import i18n from 'i18next';

interface IOptions {
  title?: string,
  message?: string,
  type?: string,
  insert?: string,
  container?: string,
  animationIn?: Array<string>,
  animationOut?: Array<string>,
  dismiss?: object
}

const defaults: IOptions = {
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

/**
 * Push the messages to ReactNotification component
 * @param {IOptions|string=} options Options object for customizing notification
 */
export default (options: IOptions | string): void => {
  let message: IOptions | string = i18n.t('errors.oops');
  switch (true) {
    case typeof options === 'string':
      message = (options as string);
      break;
    case isPlainObject(options):
      message = (options as IOptions).message;
      break;
    default:
      throw new Error('Unexpected argument passed. Expected object or string.');
  }
  if (!message) message = defaults.message;
  store.addNotification({ ...defaults, message });
};
