/**
 * Created by maximnord on 2/20/18.
 */
import WebTorrent from 'webtorrent';

export const client = new WebTorrent();
let createTorrent = require('create-torrent');
let parseTorrent = require('parse-torrent');

const fs = require('fs');
let ut_message = require('ut_message');
let ut_metadata = require('ut_metadata');
let ut_pex = require('ut_pex');

import trans from '../trans';

const torrents = [];



export const removeTorrent = (torrentId) => {
  try {
    client.remove(torrentId);
  } catch (e) {

  }
}

export const generateTorrentFile = (selectedPath, filesList, torrentName, torrentDescription) => {
  return new Promise((resolve) => {
    try {
      client.seed(filesList, (torrent) => {
        let parsedTorrent = parseTorrent(torrent);
        let fileName = `${selectedPath}/${torrentName}.torrent`;
        eventsTorrent(torrent);
        fs.writeFileSync(fileName, torrent.torrentFile);
        resolve({magnetURI: torrent.magnetURI, fileName, torrentName: `${torrentName}.torrent`});
      });
    } catch (e) {
      console.log("On seeding method error: ", e);
      resolve(null);
    }

    // return createTorrent(
    // filesList, {comment: torrentDescription}, (err, torrent) => {
    //   let fileName = `${selectedPath}/${torrentName}.torrent`;
    //   if (!err) {
    //     let parsedTorrent = parseTorrent(torrent);
    //     fs.writeFile(fileName, torrent, ()=> resolve({parsedTorrent, fileName, torrentName: `${torrentName}.torrent`}));
    //   } else {
    //     resolve(null);
    //   }
    // });
    // client.seed(filesList, (torrent) => {
    //   console.log('test 123321');
    //   console.log(torrent, fileName);
    //   fs.writeFile(fileName, torrent.torrentFile);
    // });
  });
};

export const eventsTorrent = (torrent) => {
  torrent.on('infoHash', function () {
    console.log('infoHash');
  });
  torrent.on('metadata', function () {
    console.log('metadata');
  });
  torrent.on('ready', function () {
    console.log('ready');
  });
  torrent.on('done', function () {
    w.extended(3, 'i\'m seeder and I done upload to you file'); //first param will be either 1, 2 or 3
    console.log('done');
  });
  torrent.on('download', function () {
    console.log('download');
  });
  torrent.on('wire', (wire) => {
    w = wire;
    wire.use(ut_message())
    //wire.ut_message.start() // TODO two-way communication
    wire.ut_message.on('peer', function (peer) {
      console.log('ut_message: got peer: %s (from %s)', peer, addr)
      self.addPeer(peer)
    })
    wire.use(ut_metadata());
    wire.ut_metadata.fetch()
    wire.ut_metadata.on('metadata', (metadata) => {
      xconsole.log(metadata);
    });
    wire.ut_metadata.on('warning', (err) => {
      console.log(err);
    });
    wire.use(ut_pex());
    wire.extended(3, 'i\'m seeder and I send message 3'); //first param will be either 1, 2 or 3
    wire.on('extended', (ext, obj) => {
      console.log('extended', ext, obj.toString());
      if (obj.toString() === 'TEST') {
        wire.extended(3, 'please get this message'); //first param will be either 1, 2 or 3
      }
    });
    wire.ut_pex.on('warning', (err) => {
      console.log('warning', err.message)
    })
    wire.extended(2, 'i\'m seeder and I send message 2');
  });

};

export const addTorrrent = (torrent) => {
    try {
      if (torrent && torrent.allTorrent && torrent.allTorrent.torrentFile) {
        console.log("addTorrent: ", torrent.allTorrent.torrentFile);
        console.log("addTorrent: ", torrent);
        let torrentId = torrent.allTorrent.torrentFile;
        let clientGet = client.get(torrentId);

        console.log("clientGet: ", clientGet);

        client.add(torrent.allTorrent.torrentFile, (torrent) => {
          // Got torrent metadata!
          console.log("client.add: ", torrent);
          //return;
          eventsTorrent(torrent);
        });
      }
    } catch (e) {
      console.log("We have some errors: ", e);
    }
};

export const runTorrents = (torrentList) => {
  for (let index in torrentList) {
    addTorrrent(torrentList[index]);
  }
};