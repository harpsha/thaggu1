// @flow
import React, { Component } from 'react';
import Home from '../components/Home';
import { Container, MainAppContainer, AppContainer } from '../style/containers';
import gradients from '../style/gradients';
import UploadsPage from '../components/Uploads';
import DownloadsPage from '../components/Downloads';
import HistoryPage from '../components/HistoryPage';
import WalletPage from '../components/WalletPage';
import FinishedPage from '../components/FinishedPage';
import NavMenu from '../components/common/mainMenu';
import SideMenuContainer from '../components/common/sideMenu';

import {settingsStore} from '../utils/localStorage';

import {
  UPLOAD_PAGE,
  DOWNLOAD_PAGE,
  FINISHED_PAGE,
  HISTORY_PAGE,
  WALLET_PAGE,
  TS_DEFAULT,
  TS_GENERATION_ENCRYPTED,
  TS_GENERATION_TORRENT,
  TS_SET_COSTS,
  TS_STATUS_REMOVE,
  TS_STATUS_PLAY,
  TS_STATUS_STOP,
  STORE_INFORMATION_LENGTH
} from '../constants';

const {dialog} = require('electron').remote;

const {shell} = require('electron')


import trans from '../trans';


let Encryptor = require('../utils/file-cryptor');

import {toBuffer, random, randomString} from '../utils/crypto.factory';
import {encryptFile, decryptFile} from '../utils/fileProcessing';
import {generateTorrentFile, addTorrrent, runTorrents} from '../utils/torrent';

type Props = {};

export default class HomePage extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      uploadTorrent: {},
      downloadTorrent: {},
      selectedFiles: [],
      selectedPath: '',
      selectedPage: UPLOAD_PAGE,
      torrentTokens: {},
      torrentName: '',
      torrentCost: '',
      torrentDescription: '',
      tokenRandom: '',
      generateTorrentStatus: TS_DEFAULT,
      torrents: [],
      progressInfo: null,
      fileGenerationIndexOf: 0,
      filesSizes: {}
    };
    this.handlerSelectPage = this.handlerSelectPage.bind(this);
    this.handlerOnCreateTorrentUpload = this.handlerOnCreateTorrentUpload.bind(this);
    this.handlerRunTorrentGeneration = this.handlerRunTorrentGeneration.bind(this);
    this.handlerGenerateCostsOfTorrent = this.handlerGenerateCostsOfTorrent.bind(this);
    this.handlerTorrentCost = this.handlerTorrentCost.bind(this);
    this.handlerRemoveFile = this.handlerRemoveFile.bind(this);
    this.handlerSelectFiles = this.handlerSelectFiles.bind(this);
    this.handlerSetTorrentProperty = this.handlerSetTorrentProperty.bind(this);
    this.handlerSelectedFilePath = this.handlerSelectedFilePath.bind(this);
    this.handlerRemoveTorrentFromList = this.handlerRemoveTorrentFromList.bind(this);
    this.handlerChangeStatus = this.handlerChangeStatus.bind(this);
    this.handlerOnCancelCreatTorrent = this.handlerOnCancelCreatTorrent.bind(this);
    this.handlerChangeProgress = this.handlerChangeProgress.bind(this);
    this.handlerOnCreateTorrentDownload = this.handlerOnCreateTorrentDownload.bind(this);

    this.clearSelecedFiles = this.clearSelecedFiles.bind(this);
    this.encryptFiles = this.encryptFiles.bind(this);
    this.generateTorrentFile = this.generateTorrentFile.bind(this);
  }

  componentWillMount(){
    console.log(settingsStore.get('torrents'));
    let selectedPath = settingsStore.get("selectedPath");
    if (typeof selectedPath !== 'undefined') {
      this.setState({selectedPath:  selectedPath});
    }
    this.setState({torrents: settingsStore.get("torrents")});
    // reinitialize torrent list
    runTorrents(settingsStore.get('torrents'));
    console.log('here');
  }

  handlerOnCreateTorrentUpload(filesPath) {
    //console.log("=====",filesPath,"====");
    this.setState({selectedFiles: filesPath});
    this.handlerTorrentCost()
  };

  handlerOnCreateTorrentDownload(torrentFile) {

  };

  handlerSelectPage(selectedPage) {
    this.setState({selectedPage});
  }

  clearSelecedFiles() {
    this.setState({
      selectedFiles: [],
      torrentName: '',
      torrentDescription: '',
      torrentCost: '',
      generateTorrentStatus: TS_DEFAULT});
  }

  handlerOnCancelCreatTorrent() {
    this.clearSelecedFiles();
  }

  handlerChangeProgress(filePath, readLength, isDone = false) {
    let {progressInfo, filesSizes, fileGenerationIndexOf} = this.state;
    //progress++;
    let allSize = filesSizes.reduce((all, cur) => all + cur.size, 0);
    let indexOf = filesSizes.findIndex((el)=>el.name === filePath);
    let left = progressInfo === null || indexOf !== fileGenerationIndexOf ? filesSizes[indexOf].size : progressInfo.left;
    let allLeft = progressInfo === null ? allSize : progressInfo.allLeft;

    progressInfo = {
      all: filesSizes.length,
      current: indexOf,
      allSize: allSize,
      left: left - readLength,
      file: filePath,
      allLeft: allLeft - readLength,
      read: readLength,
      fileSize: filesSizes[indexOf].size
    }
    this.setState({progressInfo, fileGenerationIndexOf: indexOf});
  }

  async encryptFiles() {
    const {selectedPath, selectedFiles, torrentName, torrentDescription, torrentCost} = this.state;
    const tokenRandom = randomString(30);
    const publicKey = randomString(50);
    const storeInformation = randomString(STORE_INFORMATION_LENGTH);
    console.log("Some info to file ", storeInformation)
    const torrentTokens = {tokenRandom, publicKey, storeInformation};
    this.setState({torrentTokens});
    // show progress popup
    this.setState({generateTorrentStatus: TS_GENERATION_ENCRYPTED});
    this.forceUpdate();
    // encrypt files
    let encryptedFiles = await encryptFile(selectedFiles,
      selectedPath,
      tokenRandom,
      storeInformation,
      this.handlerChangeProgress);
    // set null progress info
    this.setState({progressInfo: null, fileGenerationIndexOf: 0});
    // create torrent file

    // show create torrent file
    this.setState({generateTorrentStatus: TS_GENERATION_TORRENT});

    return encryptedFiles;

  }

  async generateTorrentFile(encryptedFiles) {
    const {selectedPath, torrentTokens, torrentName, torrentDescription, torrentCost} = this.state;

/*    decryptFile(encryptedFiles, torrentTokens.tokenRandom, (data)=> {
      console.log("I restored data: ", data);
      console.log("Is all data correct? ", torrentTokens);
    })*/

    let torrentFiles = await generateTorrentFile(selectedPath,
      encryptedFiles,
      torrentName,
      `${torrentDescription}\r\nTorrent Costs: ${torrentCost} ${trans('popups.upload.UFR')}`);

    if (torrentFiles) {
      // write information about torrent
      shell.showItemInFolder(torrentFiles.fileName);
      let torrents = settingsStore.get('torrents');
      torrentFiles = {
        torrentTokens: torrentTokens,
        torrentCost: torrentCost,
        addedDate: new Date(),
        status: TS_STATUS_PLAY,
        torrentDescription: torrentDescription,
        ...torrentFiles
      };
      if (typeof torrents === 'undefined') {
        torrents = [];
      }
      torrents.push(torrentFiles);
      // add ctorrent to seed
      //addTorrrent(torrentFiles);
      settingsStore.set('torrents', torrents);
      this.setState({
        tokenRandom: torrentTokens.tokenRandom,
        torrents: torrents
      });
      this.clearSelecedFiles();
      this.forceUpdate();
    }
    this.setState({generateTorrentStatus: TS_DEFAULT});
  }

  async handlerRunTorrentGeneration(filesSizes) {
    const {selectedPath, selectedFiles, torrentName, torrentDescription, torrentCost} = this.state;
    this.setState({filesSizes});
    let encryptedFiles = await this.encryptFiles();
    this.generateTorrentFile(encryptedFiles);
  }

  async handlerGenerateCostsOfTorrent() {
  }

  handlerSetTorrentProperty(type, value){
    const state = {};
    state[type] = value;
    this.setState(state);

  }

  handlerTorrentCost() {
    this.setState({generateTorrentStatus: TS_SET_COSTS});
    //this.handlerRunTorrentGeneration();
  }

  handlerRemoveFile(newFiles) {
    this.setState({selectedFiles: newFiles});
  }

  handlerRemoveTorrentFromList(item) {
    let torrentList = settingsStore.get('torrents');
    torrentList.splice(item, 1);
    settingsStore.set('torrents', torrentList);
    this.setState({torrents: torrentList});
  }

  handlerSelectFiles(files) {
    const {selectedFiles} = this.state;
    selectedFiles.push.apply(selectedFiles, files);
    this.setState({selectedFiles});
  }
  handlerSelectedFilePath(filePaths) {
    this.setState({selectedPath: filePaths});
  }

  handlerChangeStatus(i, type) {
    let torrentList = settingsStore.get('torrents');
    torrentList[i].status = type;// === TS_STATUS_PLAY ? TS_STATUS_STOP : TS_STATUS_PLAY;
    settingsStore.set('torrents', torrentList);
    this.setState({torrents: torrentList});
  }

  render() {
    const {selectedPage, selectedFiles, selectedPath, generateTorrentStatus, torrents, progressInfo} = this.state;
    let pageContent = null;
    switch (selectedPage) {
      case UPLOAD_PAGE:
        pageContent = <UploadsPage onDragFilesToTorrent={this.handlerOnCreateTorrentUpload}
                                   onClickAddFilesToTorrent={this.handlerTorrentCost}
                                   onSelectPath={this.handlerSelectedFilePath}
                                   onSelectFiles={this.handlerSelectFiles}
                                   onRemoveFile={this.handlerRemoveFile}
                                   onRemoveTorrent={this.handlerRemoveTorrentFromList}
                                   onSetTorrentProperty={this.handlerSetTorrentProperty}
                                   onGenerateTorrent={this.handlerRunTorrentGeneration}
                                   onChangeStatus={this.handlerChangeStatus}
                                   onCancel={this.handlerOnCancelCreatTorrent}
                                   selectedFiles={selectedFiles}
                                   selectedPath={selectedPath}
                                   torrentsList={torrents}
                                   progressInfo={progressInfo}
                                   generateTorrentStatus={generateTorrentStatus}/>;
        break;
      case DOWNLOAD_PAGE:
        pageContent = <DownloadsPage onDragFilesFromTorrent={this.handlerOnCreateTorrentDownload}
                                     onClickAddFilesFromTorrent={this.handlerOnCreateTorrentDownload} />;
        break;
      case FINISHED_PAGE:
        pageContent = <FinishedPage />;
        break;
      case WALLET_PAGE:
        pageContent = <WalletPage />;
        break;
      case HISTORY_PAGE:
        pageContent = null;
        break;
    }

    return (
        <MainAppContainer>
          <SideMenuContainer />
            <AppContainer>
              <NavMenu selectedPage={selectedPage}
                       onSelectPage={this.handlerSelectPage}/>
              {pageContent}
            </AppContainer>
        {/*<Home />*/}
        </MainAppContainer>
    );
  }
}
