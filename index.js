import { readFileSync } from 'fs';
import path from 'path';
import _ from 'lodash';

const buildFullPath = (filepath) => path.resolve(process.cwd(), filepath);

export default (path1, path2) => {
    const file1 = JSON.parse(readFileSync(buildFullPath(path1), 'utf-8'));
    const file2 = JSON.parse(readFileSync(buildFullPath(path2), 'utf-8'));
    const keys1 = Object.keys(file1);
    const keys2 = Object.keys(file2);
    const allKeys = _.uniq([...keys1, ...keys2]).sort();
    let result = '{\n';
    for (const key of allKeys) {
        if (_.has(file1, key) && _.has(file2, key)) {
            if (file1[key] === file2[key]) {
                result += `${key}: ${file1[key]}\n`;
            }
            if (file1[key] !== file2[key]) {
                result += `-${key}: ${file1[key]}\n`;
                result += `+${key}: ${file2[key]}\n`;
            }
            continue;
        }
        _.has(file1, key) === true ? result += `-${key}: ${file1[key]}\n` : result += `+${key}: ${file2[key]}\n`;
    }
    return result += '}';
};
