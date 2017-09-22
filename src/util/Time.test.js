import test from 'ava';

import { asMinutesSeconds } from './Time';

test('asSecondsMinutes(0)', (t) => {
  t.is(asMinutesSeconds(0), '00:00');
});

test('asSecondsMinutes(1)', (t) => {
  t.is(asMinutesSeconds(1), '00:01');
});

test('asSecondsMinutes(10)', (t) => {
  t.is(asMinutesSeconds(10), '00:10');
});

test('asSecondsMinutes(60)', (t) => {
  t.is(asMinutesSeconds(60), '01:00');
});

test('asSecondsMinutes(61)', (t) => {
  t.is(asMinutesSeconds(61), '01:01');
});

test('asSecondsMinutes(120)', (t) => {
  t.is(asMinutesSeconds(120), '02:00');
});

test('asSecondsMinutes(600)', (t) => {
  t.is(asMinutesSeconds(600), '10:00');
});
