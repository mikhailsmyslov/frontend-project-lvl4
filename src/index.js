// @ts-check
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/application.scss';
import run from './init';

// import faker from 'faker';
// import cookies from 'js-cookie';
// import io from 'socket.io-client';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

// @ts-ignore
run(window.gon);
