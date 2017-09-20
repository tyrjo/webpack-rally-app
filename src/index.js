import './index.html';

Ext.define('SampleApp', {
  extend: 'Rally.app.App',
  launch() {
    this.add({
      xtype: 'component',
      html: 'Hello World!',
    });
  },
});
Rally.launchApp('SampleApp', {
  name: 'Sample App',
});
