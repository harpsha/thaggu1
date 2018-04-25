/**
 * Created by maximnord on 2/20/18.
 */
let Encryptor = require('./file-cryptor');
const fs = require('fs');
const path = require('path');

import {FILE_ENCRYPT_EXTENSION} from '../constants';
export const fileSize = (filePath) => {
  const stats = fs.statSync(filePath)
  //console.log(stats);
  return stats.size;
};

const promisseEncription = (password, path, destinationFile, storeInformation, callback) => {
 return new Promise( (resolve) => {

    let encyptor = new Encryptor('encrypt', password, path, destinationFile, resolve, storeInformation, callback);
  })
}

const promisseDecription = (password, path, callback) => {
  return new Promise( (resolve) => {
    let decrypt = new Encryptor('decrypt', password, path, '', resolve, null, callback);
  })
}

export const encryptFile = async(files, destination, password, storeInformation, callback) => {
  let encryptFiles = [];
  for (let file in files) {
    let fileName = files[file].split(path.sep).slice(-1).pop();
    let outputFileName = files[file] && files[file].name || fileName;
    let destinationFile = `${destination}/${outputFileName}`;
    encryptFiles.push(`${destinationFile}${FILE_ENCRYPT_EXTENSION}`);

    let filePath = files[file] && files[file].path || files[file];

    await promisseEncription(password, filePath, destinationFile, storeInformation, callback);
  }
  return encryptFiles;
}



export const decryptFile = async(files, password, callback) => {
  for (let file in files) {
    let filePath = files[file] && files[file].path || files[file];
    await promisseDecription(password, filePath, callback);
  }
}