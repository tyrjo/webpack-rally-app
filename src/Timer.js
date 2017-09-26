import asMinutesSeconds from '@agile-central-technical-services/time-formatter';

const STATE_STOPPED = 'STATE_STOPPED';
const STATE_RUNNING = 'STATE_RUNNING';
const STATE_PAUSED = 'STATE_PAUSED';

const LABEL_START = 'Start';
const LABEL_STOP = 'Stop';
const LABEL_PAUSE = 'Pause';
const LABEL_RESUME = 'Resume';

const Timer = class {

  init() {
    this.remainingTime = 65;
    if (this.startButtonEl) {
      this.startButtonEl.setText(LABEL_START);
    }
    if (this.timeDisplayEl) {
      this.timeDisplayEl.setText(asMinutesSeconds(this.remainingTime));
    }
    this.state = STATE_STOPPED;
    this.intervalTask = Ext.TaskManager.newTask({
      run: () => { this.onInterval(); },
      interval: 1000,
    });
    return this;
  }

  onStart() {
    switch (this.state) {
      case STATE_STOPPED:
      case STATE_PAUSED:
        this.state = STATE_RUNNING;
        this.startButtonEl.setText(LABEL_PAUSE);
        Ext.TaskManager.start(this.intervalTask);
        break;
      case STATE_RUNNING:
        this.state = STATE_PAUSED;
        this.startButtonEl.setText(LABEL_RESUME);
        Ext.TaskManager.stop(this.intervalTask);
        break;
      default:
      // Do nothing
    }
  }

  onStop() {
    Ext.TaskManager.stop(this.intervalTask);
    this.init();
  }

  onDone() {
    this.onStop();
  }

  onInterval() {
    this.remainingTime -= 1;
    this.timeDisplayEl.setText(asMinutesSeconds(this.remainingTime));
    if (this.remainingTime <= 0) {
      this.onDone();
    }
  }

  render() {
    // TODO (tj) Use Ext.ProgressBar
    this.timeDisplayEl = Ext.create('Ext.draw.Text', {
      text: asMinutesSeconds(this.remainingTime),
    });
    this.startButtonEl = Ext.create('Rally.ui.Button', {
      text: LABEL_START,
      listeners: {
        click: () => { this.onStart(); },
      },
    });
    this.stopButtonEl = Ext.create('Rally.ui.Button', {
      text: LABEL_STOP,
      listeners: {
        click: () => { this.onStop(); },
      },
    });
    const timer = {
      xtype: 'container',
      layout: {
        type: 'hbox',
      },
      items: [
        this.timeDisplayEl,
        this.startButtonEl,
        this.stopButtonEl
      ],
    };
    return timer;
  }
};

export default Timer;
