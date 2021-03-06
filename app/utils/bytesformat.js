/**
 * Created by maximnord on 2/22/18.
 */

export const bytesToSize = (bytes) => {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (bytes == 0) return '0 Byte';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Number((bytes / Math.pow(1024, i)).toFixed(2)) + ' ' + sizes[i];
};