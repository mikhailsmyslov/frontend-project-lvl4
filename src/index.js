import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';
import gon from 'gon';
import i18nInit from './i18n';
import run from './init';
import logger from '../lib/logger';

const log = logger();

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/assets/service-worker.js').then((registration) => {
      log('SW registered: ', registration);
    }).catch((registrationError) => {
      log('SW registration failed: ', registrationError);
    });
  });
}

i18nInit().then(() => run(gon));
