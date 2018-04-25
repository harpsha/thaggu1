// @flow

//dialog
//import {dialog} from 'electron';

import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import WebTorrent from 'webtorrent';
import {toBuffer, random, randomString} from '../utils/crypto.factory';
import {encrypt} from '../utils/ecies.factory';

import AppScreen from './App';

const client = new WebTorrent();
var createTorrent = require('create-torrent');


var ut_message = require('ut_message');
var ut_metadata = require('ut_metadata')
var ut_pex = require('ut_pex')

import trans from '../trans';

const {dialog} = require('electron').remote;

const torrents = [];

type Props = {};

//const _download = require('./download');
//const torrentParser = require('./torrent-parser');
const fs = require('fs');
const path = require('path');
const p = path.join(__dirname, '/devel/Xcode_9.2_Beta_2.torrent');
const downloadPath = path.join(__dirname, '/downloads/');
const devel = path.join(__dirname, '/devel/');


let Encryptor = require('../utils/file-cryptor');
const copyFileSync = require('fs-copy-file-sync');
//const { COPYFILE_EXCL } = copyFileSync.constants;


var parseTorrent = require('parse-torrent');
var dragDrop = require('drag-drop');
let filesList = null;


console.log(client);

client.on('torrent', (torrent) => {
  console.log('client.on.torrent', torrent);
});

client.on('error', (err) => {
  console.log('client.on.error', err);
});

//import Encryptor from '../utils/file-encriptor';

export default class Home extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      uri: '',
      torrent: '',
      torrentFile: '',
      ware: null,
      savePath: '',
      filePaths: []
    };
  }

  handleChangeInput = (e) => {
    console.log(e.target.value);
    this.setState({uri: e.target.value});
  };

  seed = () => {
    const {torrentFile} = this.state;
    console.log('Seed file click');
    if (filesList !== null) {
      console.log('files: ', filesList);

      client.seed(filesList, (torrent) => {

        let w = null;

        let fileName = `${devel}${Date.now()}-test.torrent`;
        fs.writeFile(fileName, torrent.torrentFile);
        console.log('Torrent file created: ', fileName);

        console.log('onseed getting called');
        torrent.on('infoHash', function () { console.log('infoHash'); });
        torrent.on('metadata', function () { console.log('metadata'); });
        torrent.on('ready', function () { console.log('ready'); });
        torrent.on('done', function () {

          w.extended(3, 'i\'m seeder and I done upload to you file'); //first param will be either 1, 2 or 3
          console.log('done');
        });
        torrent.on('download', function () { console.log('download'); });
        torrent.on('wire', (wire) => {

          w = wire;
          this.setState({wire});
          wire.use(ut_message())

          //wire.ut_message.start() // TODO two-way communication
          wire.ut_message.on('peer', function (peer) {
            console.log('ut_message: got peer: %s (from %s)', peer, addr)
            self.addPeer(peer)
          })
         // wire.use(ut_message());
          //or
          wire.use(ut_metadata());
          //or

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


            if(obj.toString() === 'TEST'){

              wire.extended(3, 'please get this message'); //first param will be either 1, 2 or 3


            }

          });

          wire.ut_pex.on('warning', (err) => {
            console.log('warning', err.message)
          })

          wire.extended(2, 'i\'m seeder and I send message 2');

          console.log('wire');

        });

        console.log('fileAdded to seed');
        console.log(torrent);
        this.setState({torrent});
        torrent.on('download', (bytes) => {
          console.log('download');

          console.log('===========here', bytes, 'here===f====');
        });
        //fs.writeFile(`${devel}${Date.now()}-mytest.torrent`, torrent)
      });

      client.on('torrent', function (torrent) {
        console.log('client.on getting called');
        torrent.on('infoHash', function () { console.log('Co infoHash'); });
        torrent.on('metadata', function () { console.log('Co metadata'); });
        torrent.on('ready', function () { console.log('Co ready'); });
        torrent.on('done', function () { console.log('Co done'); });
        torrent.on('download', function () { console.log('Co download'); });
        torrent.on('wire', function () { console.log('Co wire'); });
      });
    }

  };

  create = () => {
    console.log('here');
    createTorrent(
      '/Users/maximnord/Downloads/Ethereum-Based Bittorrent Client Desktop Application Specs.pdf', (err, torrent) => {
        if (!err) {
          //console.log(torrent);
          let fileName = `${devel}${Date.now()}-test.torrent`;
          fs.writeFile(fileName, torrent);
          console.log('Torrent file created: ', fileName);
          this.setState({torrentFile: fileName});
        }
      });

  };
  run = () => {
    const torrent = parseTorrent(fs.readFileSync(p));
    console.log(torrent);
    const magnetFile = parseTorrentparseTorrent.toMagnetURI({
      infoHash: torrent.infoHash,
      dn: torrent.files[0].name,
      tr: torrent.announce
    });

    this.setState({uri: magnetFile});

    //'magnet:?dn=Xcode_9.2_Beta_2.xip&tr=udp%3A%2F%2Ftracker.openbittorrent.com%3A80&xt=urn:btih:bb32670ef409f319560ecc2994b5322386d5d6a7';

    console.log(magnetFile);

    //const torrent = torrentParser.open(p);

    // _download(torrent);

    /*alert(p);
     const torrentFile = fs.readFileSync(p);
     alert('here1');
     //alert(torrentFile);




     const torrent =  bencode.decode(torrentFile);

     tracker.getPeers(torrent, peers => {
     console.log('list of peers: ', peers);
     });
     */

    /*const url = urlParse(torrent.announce.toString('utf8'));
     const socket = dgram.createSocket('udp4');
     const myMsg = Buffer.from('hello?', 'utf8');
     socket.send(myMsg, 0, myMsg.length, url.port, url.host, () => {});
     socket.on('message', msg => {
     console.log('message is', msg);
     });*/
    //console.log(torrent.announce.toString('utf8'));
  };

  wire = ()=>{
    const {wire} = this.state;
    wire.extended(3, 'I clicked button and send to you'); //first param will be either 1, 2 or 3
  };

  add = () => {
    const {uri} = this.state;
    console.log(filesList);
    client.add(filesList[0], {path: downloadPath}, (torrent) => {
      // Got torrent metadata!
      console.log('Client is downloading:', torrent.infoHash);
      this.setState({uri: '', torrent});
      torrent.on('download', (bytes) => {
        console.log('torrent.on.download', bytes);
        this.forceUpdate();
      });

      torrent.on('infoHash', () => { console.log('torrent.on.infoHash'); });
      torrent.on('metadata', () => { console.log('torrent.on.metadata'); });
      torrent.on('ready', () => { console.log('torrent.on.ready'); });
      torrent.on('done', () => { console.log('torrent.on.done'); });

      torrent.on('wire', (wire) => {

        wire.use(ut_message())

        //wire.ut_message.start() // TODO two-way communication
        wire.ut_message.on('peer', function (peer) {
          console.log('ut_message: got peer: %s (from %s)', peer, addr)
          self.addPeer(peer)
        })
        // wire.use(ut_message());



        //or
        wire.use(ut_metadata());
        //or

        wire.ut_metadata.fetch()

        wire.ut_metadata.on('metadata', (metadata) => {
          console.log(metadata);
        });

        wire.ut_metadata.on('warning', (err) => {
          console.log(err);
        });


        wire.use(ut_pex());

        wire.extended(3, 'hello'); //first param will be either 1, 2 or 3


        wire.on('extended', (ext, obj) => {
          console.log('extended', ext, obj.toString());
        });

        wire.ut_pex.on('warning', (err) => {
          console.log('warning', err.message)
        })

        wire.extended(2, 'hello');

        console.log('wire');

        console.log('torrent.on.wire', wire);


      });
      torrent.on('noPeers', (announceType) => {console.log('torrent.on.noPeers', announceType);});
      torrent.on('warning', (err) => {console.log('torrent.on.warning', err);});
      torrent.on('error', (err) => {console.log('torrent.on.error', err);});
    });
  };

  selectedFile = (filePaths) => {
    console.log(filePaths);
    this.setState({filePaths})
  };
  selectedFilePath = (filePaths) => {
    this.setState({savePath: filePaths});
  }

  openDialog = () => {
    console.log(dialog);
    dialog.showOpenDialog({properties: ['openFile', 'openDirectory', 'multiSelections']}, (filePaths)=>this.selectedFile(filePaths));
  };

  openDialogTOSelectPath = () => {
    console.log(dialog);
    dialog.showOpenDialog({properties: ['createDirectory', 'openDirectory']}, (filePaths)=>this.selectedFilePath(filePaths));
  };

  runTest = async () => {
    const {filePaths, savePath} = this.state;
    console.log(filePaths);
    const tokenRandom = randomString(30);
    const publicKey = randomString(50);

    for (let file in filePaths){
      console.log(filePaths[file]);
      let outputFileName = filePaths[file].split("/").slice(-1).pop();
      let destinationFile = `${savePath}/${outputFileName}`;
      console.log("here: ", destinationFile);
      let encryptor = new Encryptor('encrypt', 'mySecretPassword', filePaths[file], destinationFile );
      console.log(encryptor);
      console.log('------', 'here', '--------');


      /*return  new Promise(function (resolve, reject) {
        return resolve(copyFileSync(filePaths[file], destinationFile));
      }).then(function (Px) {


      });*/
      // let content = await fs.readFileSync(filePaths[file]);
      // const encryptContent = await encrypt(publicKey, content);
      //
      // console.log(content.length, encryptContent);
      //
      // await fs.writeFileSync(`${savePath}/${fileName}`, encryptContent)
      console.log(filePaths[file]);
    }
  };


  runTestDecrypt = async () => {
    const {filePaths, savePath} = this.state;
    console.log(filePaths);
    const tokenRandom = randomString(30);
    const publicKey = randomString(50);
    for (let file in filePaths){
      console.log(filePaths[file]);
      let outputFileName = filePaths[file].split("/").slice(-1).pop();
      let destinationFile = `${savePath}/${outputFileName}`;
      let decrypt = new Encryptor('decrypt', 'mySecretPassword', filePaths[file]);
      console.log(decrypt);
    }
  };

  render() {
    const {uri, torrent} = this.state;
    console.log(torrent);
    return (
      <AppScreen>

        <div style={{border: "1px solid black", padding: "50px"}}>
          <div>
            <input onChange={this.handleChangeInput}/>
            <button type='button' onClick={this.add}>add {trans("prev")}</button>
            <button type='button' onClick={this.run}>parse</button>
            <button type='button' onClick={this.create}>create</button>
            <button type='button' onClick={this.seed}>seed file</button>
            <button type='button' onClick={this.wire}>send message</button>

            <button type="button" onClick={this.openDialog}>Open Dialog</button>
            <button type="button" onClick={this.openDialogTOSelectPath}>Open Path</button>
            <button type="button" onClick={this.runTest}>Run test</button>
            <button type="button" onClick={this.runTestDecrypt}>Run test decrypt</button>

            <Link to="/test">Link to test page</Link>

          </div>
          <div>{torrent.path}</div>
          {(torrent) &&
          (
            <div>
              <hr/>
              <div> {torrent && torrent.name} ({torrent && parseInt(torrent.progress * 100)}%)</div>
              <ul>
                {torrent && torrent.files && torrent.files.length > 0 && torrent.files.map((file, ii) => (
                  <li key={ii}>{file && file.name}</li>
                ))}
              </ul>
            </div>
          )}

        </div>

      </AppScreen>
      );
  }
}
