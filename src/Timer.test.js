import test from 'ava';
import sinon from 'sinon';

import Timer from './Timer';

// Crappy mocking until I learn how to mock SDK
global['Ext'] = {
  TaskManager: {
    newTask: sinon.stub(),
    start: sinon.stub(),
    stop: sinon.stub()
  }
};

test.beforeEach(t=>{
  t.context.timer = new Timer();
  t.context.timer.startButtonEl = {
    setText: ()=>{}
  };
});

test('timer created', (t)=>{
  t.truthy(t.context.timer);
});

test('stopped goes to running', t=>{
  t.context.timer.onStart();
  t.true(t.context.timer.state === 'STATE_RUNNING');
});

test('paused goes to running', t=>{
  t.context.timer.state = 'STATE_PAUSED';
  t.context.timer.onStart();
  t.true(t.context.timer.state === 'STATE_RUNNING');
});

test('running goes to paused', t=>{
  t.context.timer.state = 'STATE_RUNNING';
  t.context.timer.onStart();
  t.true(t.context.timer.state === 'STATE_PAUSED');
});