import { createReadStream } from 'fs';

export default function readFile(fileName, target) {
  const readStream = createReadStream(fileName, {
    encoding: 'utf-8',
    bufferSize: 1024
  });
  readStream.on('data', (buffer) => {
    const str = buffer.toString('utf-8');
    target.next(str);
  });
  readStream.on('end', () => {
    target.return();
  });
}
