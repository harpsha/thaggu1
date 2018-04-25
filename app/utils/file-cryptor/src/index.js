'use strict';

class Index {

  constructor(operation, secretPassword, file, desctinationFile = '', resolve = null, storeInformation = null, callback = null){
    this.process(operation, secretPassword, file, desctinationFile, resolve, storeInformation, callback);
  }

  process(operation, secretPassword, file, desctinationFile, resolve, storeInformation, callback) {
    let Operator = null;
    switch(operation){
      case 'decrypt':
        Operator =  require('./' + operation);
        return new Operator()[operation + 'File'](file, secretPassword, callback);
        break;
      case 'encrypt':
        Operator =  require('./' + operation);
        return new Operator()[operation + 'File'](file, desctinationFile, secretPassword, resolve, storeInformation, callback);
        break;
      default:
        console.log('Operation not supported!');
    }
  }

}

module.exports = Index;

