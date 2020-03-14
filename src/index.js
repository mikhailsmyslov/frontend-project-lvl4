import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';
import i18nInit from './i18n';
import run from './init';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

i18nInit().then(() => run(window.gon));
