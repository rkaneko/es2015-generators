export default function leftpad(str, len, ch = ' ') {
  if (typeof len !== 'number') throw new Error(`${len}: should be a number type`);
  let s = new String(str);
  let i = -1;
  if (!ch && ch !== 0) {
    ch = ' ';
  }
  const diff = len - s.length;
  while (++i < diff) {
    s = ch + s;
  }
  return s;
}
