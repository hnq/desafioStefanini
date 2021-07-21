import fs from 'fs';
import path from 'path';

const initializersPath = path.join(__dirname, '..', 'config', 'initializers');

export default app => {
  fs
  .readdirSync(initializersPath)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const initFile = require(path.join(initializersPath, file));
    if (initFile.default) initFile.default(app);
  });
}
