import fs from 'fs';
import path from 'path';

const serializers = {};
const basename = path.basename(__filename);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js') && !file.match(/spec|test/);
  })
  .forEach(file => {
    const serializeFile = require(path.join(__dirname, file));
    const serialize = serializeFile;
    serializers[serialize.default.name] = serializeFile.default;
  });

module.exports = serializers;
