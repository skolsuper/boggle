import fs from 'fs';

import R from 'ramda';

const dictionary = fs.readFileSync('./dictionary.txt');

const words = R.split('\n', dictionary.toString());

fs.writeFileSync('./dictionary.json', JSON.stringify({words}));
