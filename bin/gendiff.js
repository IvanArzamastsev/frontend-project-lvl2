#!/usr/bin/env node

import { program } from 'commander';
import genDiff from '../index.js';

program
  .version('0.0.1')
  .description('Compares two configuration files and shows a difference.')
  .arguments('<filepath1, filepath2>')
  .action((path1, path2) => {
    console.log(genDiff(path1, path2));
  })
  .option('-f, --format [type]', 'output format');

program.parse();
