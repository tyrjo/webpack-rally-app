import Timer from './Timer';
import Stories from './Stories';

Rally.onReady(()=>{
  const timer = new Timer().init();
  const stories = new Stories().init();
  
  Ext.define('App', {
    extend: 'Rally.app.App',
    componentCls: 'app',
    items: [
      timer.render(),
      stories.render(),
    ],
    launch() {
    },
  });

  Rally.launchApp('App', {
    name: 'Sample App',
  });
});
