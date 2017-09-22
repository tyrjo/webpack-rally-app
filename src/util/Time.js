function strPadLeft(string, pad, length) {
  return (new Array(length + 1).join(pad) + string).slice(-length);
}

export function asMinutesSeconds(seconds) {
  const min = Math.floor(seconds / 60);
  const sec = seconds - (min * 60);
  const finalTime = `${strPadLeft(min, '0', 2)}:${strPadLeft(sec, '0', 2)}`;
  return finalTime;
}
