import fs from 'fs';
import path from 'path';
import ModelParser from '../src/index.js';
const Parser = ModelParser(process.argv[2], process.argv[3], { swap_endian: (process.argv[4] === 'true') });
console.log('\n', Parser);
fs.writeFileSync(path.join(path.dirname(process.argv[3]), `${path.basename(process.argv[3])}.json`), JSON.stringify(Parser));
