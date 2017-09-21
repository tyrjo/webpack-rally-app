// Moment adds 247kb...
import moment from 'moment';

const Timer = class {
  constructor() {
    this.onStart = this.onStart.bind(this);
    this.onInterval = this.onInterval.bind(this);
    this.getTimeLabel = this.getTimeLabel.bind(this);
    this.remainingTime = moment.duration(5, 'seconds');
  }

  onStart() {
    this.intervalTask = Ext.TaskManager.start({
      run: this.onInterval,
      interval: 1000,
    });
  }

  onInterval() {
    this.remainingTime.subtract(1, 'second');
    // TODO (tj)
    // This is starting to be bad, convert component to explicitly create EXT objects so this class
    // can retain a reference.
    this.timeDisplayEl = Ext.ComponentQuery.query('#time-display');
    this.timeDisplayEl.update(this.getTimeLabel());
    if (this.remainingTime.asSeconds() <= 0) {
      Ext.TaskManager.stop(this.intervalTask);
    }
  }

  getTimeLabel() {
    return `${this.remainingTime.minutes()}:${this.remainingTime.seconds()}`;
  }

  render() {
    const timeDisplay = {
      xtype: 'label',
      itemId: 'time-display',
      html: this.getTimeLabel(),
    };
    const startButton = {
      xtype: 'button',
      text: 'Start',
      listeners: {
        click: this.onStart,
      },
    };
    const stopButton = {
      xtype: 'button',
      text: 'Stop',
      listeners: {
        click: () => { },
      },
    };
    const timer = {
      xtype: 'panel',
      items: [
        timeDisplay,
        startButton,
        stopButton,
      ],
    };
    return timer;
  }
};

export default Timer;
