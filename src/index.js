/* eslint-disable no-console */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';
import i18nInit from './i18n';
import run from './init';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/assets/service-worker.js').then((registration) => {
      console.warn('SW registered: ', registration);
    }).catch((registrationError) => {
      console.warn('SW registration failed: ', registrationError);
    });
  });
}

i18nInit().then(() => run(window.gon));
