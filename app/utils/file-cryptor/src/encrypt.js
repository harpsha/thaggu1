'use strict';
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const common = require('./constant');

class Encryptor {

  encryptFile(filepath, destionation = '', secretPass='', resolve, storeInformation, callback){
    if(fs.lstatSync(filepath).isFile()){
      console.log('Encrypting');
      let filePath = path.join(destionation + common.FILE_EXTENSION);
      return fs.createReadStream(filepath)
        .on('data', (data) => {if(callback){callback(filepath, data.length)};})
        .pipe(crypto.createCipher(common.ALGORITHMS, secretPass))
        .pipe(fs.createWriteStream(filePath)).on('finish', () => {
          callback(filepath, 0, true);

          let cipher = crypto.createCipher(common.ALGORITHMS, secretPass);
          let cryptedCode = cipher.update(storeInformation, 'utf8', 'hex');
          cryptedCode += cipher.final('hex');
          console.log("===========", storeInformation, "=========", cryptedCode, "=========");
          fs.appendFileSync(filePath, `${cryptedCode}`);
          resolve(true)
        });
    }
  }
}

module.exports = Encryptor;
    