const Timer = class {
  constructor() {
    this.onStart = this.onStart.bind(this);
    this.onInterval = this.onInterval.bind(this);
    this.getTimeLabel = this.getTimeLabel.bind(this);
    this.remainingTime = 10;
  }

  onStart() {
    this.intervalTask = Ext.TaskManager.start({
      run: this.onInterval,
      interval: 1000,
    });
  }

  onStop() {
    Ext.TaskManager.stop(this.intervalTask);
  }

  onInterval() {
    this.remainingTime -= 1;
    this.timeDisplayEl.setText(this.getTimeLabel());
    if (this.remainingTime <= 0) {
      Ext.TaskManager.stop(this.intervalTask);
    }
  }

  getTimeLabel() {
    return `${this.remainingTime}`;
  }

  render() {
    this.timeDisplayEl = Ext.create('Ext.draw.Text', {
      text: this.getTimeLabel(),
    });
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
        click: () => { this.onStop(); },
      },
    };
    const timer = {
      xtype: 'panel',
      items: [
        this.timeDisplayEl,
        startButton,
        stopButton,
      ],
    };
    return timer;
  }
};

export default Timer;
