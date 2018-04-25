
import crypto from 'crypto';
import ethUtil from 'ethereumjs-util';

export const toBuffer = function (hex) {
  return ethUtil.toBuffer(hex);
};

export const random = function (bytes) {
  return crypto.randomBytes(bytes);
};

export const randomString = function (bytes) {
  return ethUtil.bufferToHex(random(bytes));
};
