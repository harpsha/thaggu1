'use strict';
import {STORE_INFORMATION_LENGTH} from '../../../constants';
import {fileSize} from '../../fileProcessing';

const crypto = require('crypto');
const fs = require('fs');
const common = require('./constant');

class Decryptor {

  decryptFile(filepath, secretPass='', callback = null){
    if(fs.lstatSync(filepath).isFile() && filepath.endsWith(common.FILE_EXTENSION)){
      let arr = filepath.split('.');
      let fileS = fileSize(filepath);
      console.log( {start: 0, end: fileS - common.EXTENSION_SIZE},
        { start : fileS - common.EXTENSION_SIZE, end: fileS });
      arr.pop();
      return fs.createReadStream(filepath, {start: 0, end: fileS - common.EXTENSION_SIZE - 1})
        .on('data', () => {})
        .pipe(crypto.createDecipher(common.ALGORITHMS, secretPass))
        .on('error', () => console.log('Invalid secret password'))
        .pipe(fs.createWriteStream(arr.join('.')))
        .on('finish', () => {
          let storedData = '';
          let lastData = fs.createReadStream(filepath, { start : fileS - common.EXTENSION_SIZE, end: fileS })
            .on('data', (data) => {
              storedData = storedData + data.toString();
              console.log("-----", data.toString(), "------");
            })
            .on('close', () => {
              let decipher = crypto.createDecipher(common.ALGORITHMS, secretPass);
              let restoredData = decipher.update(storedData,'hex','utf8');
              restoredData += decipher.final('utf8');
              console.log("=========", restoredData, "==========");
              callback(restoredData);
            });
        });
    }
  }
}

module.exports = Decryptor;
    