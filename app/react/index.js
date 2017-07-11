import RWR from 'react-webpack-rails';
RWR.run();

import App from './components/app';
RWR.registerComponent('App', App);

if (module.hot) {
  module.hot.accept();
  RWR.reloadNodes();
}
