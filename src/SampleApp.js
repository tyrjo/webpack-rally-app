Ext.define('SampleApp', {
  extend: 'Rally.app.App',
  launch() {
    this.add({
      xtype: 'component',
      html: 'Hello World!',
    });
  },
});
