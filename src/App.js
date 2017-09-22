import Timer from './Timer';

const timer = new Timer();

Ext.define('App', {
  extend: 'Rally.app.App',
  componentCls: 'app',
  items: [
    timer.render(),
  ],

  launch() {
  },
});
