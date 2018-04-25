import React, { Component } from 'react';
import styled from 'styled-components';
import { ContainerFluid, media } from '../../style/containers';
import colors from '../../style/colors';
import gradients from '../../style/gradients';
import fonts from '../../style/font-styles';
import trans from '../../trans';
import UButton from '../common/UButton';
import UTable from '../common/Table';
import UploadField from '../Uploads/components/UploadFile';
import Icon from '../../components/common/icons/Icons';
import { ICONS } from '../../components/common/icons/iconsConstants';
import ActionsIcons from '../common/ActionsIcons';
import SmallProgressBlue from '../common/images/small-progress-blue.svg';
import FullProgressRed from '../common/images/full_progress_red.svg';
import FullProgress from '../common/images/full_progress.svg';
import Add from '../common/images/add.svg';
import Cancel from '../common/images/cancel-btn.svg';
import Remove from '../common/images/remove.svg';
import PopUp from '../common/PopUp';
import UInput from '../common/inputText';
import UTextarea from '../common/inputTextarea';
import ErrorField from '../common/errorField';
import UHint from '../common/Hint';
import Ok from '../common/images/checking.svg';
import logo from '../common/images/logo.png';

import Confirmation from '../common/confirmation';

//ß//import AmCharts from 'am';

import moment from 'moment';
import {TS_DEFAULT,
  TS_GENERATION_TORRENT,
  TS_GENERATION_ENCRYPTED,
  TS_SET_COSTS,
  TS_STATUS_PLAY,
  TS_STATUS_STOP,
  TS_STATUS_REMOVE} from '../../constants';

import {fileSize} from '../../utils/fileProcessing';

const {dialog} = require('electron').remote;
import {bytesToSize} from '../../utils/bytesformat';

const Actions = styled.div`
  display:flex;
  flex-flow:row wrap; 
  justify-content:space-between;
  align-items:center;
    > div {
    display:flex;
    flex-flow:row wrap;
    align-items:center;
      > div {
      margin:0 0.5em;
      }
  }
`;
const UploadsTable = styled(UTable)`
  position: relative;
`;


const Subtitle = styled.h4`
  font-size:${fonts.mediumSize};
  color:${colors.fontPrimary};
`;

const PopUpTitle = styled.h2`
  font-size:${fonts.largeSize};
  color:${colors.fontPrimary};
  font-weight:400;
  margin:0.5em 0;
  text-align:center;
`;

const Progress = styled.img`
  height:15px;
`;

const SmallProgress = styled.img`
  
`;

const Row = styled.div`
  display:flex;
  flex-flow:row wrap;
  flex:0 1 100%;
  justify-content:space-between;
  height:250px;
  overflow-y:auto;
`;

const HalfColumn = styled.div`
  display:flex;
  flex-flow:column wrap;
  flex:0 0.48 48%;
  position:relative;
  margin-bottom:1.2em;
`;

const FullColumn = styled.div`
  display:flex;
  flex-flow:column wrap;
  flex:0 1 100%;
  position:relative;
  margin-bottom:1.2em;
`;

const PopUpTorrentName = styled.p`
  font-size:${fonts.standardSize};
  color:${colors.fontPrimary};
  text-align:center;
  margin:0.5em 0;
`;
const PopUpTorrentSize = styled.span`
  font-size:${fonts.middleSize};
  color:${colors.brandSecondary};
  text-align: center;
  margin: 0.5em 0 1em;
  display: block;
`;
const PopAction = styled.div`
  margin:2em auto 1em;
  display:flex;
  align-items:center;
  justify-content:center;
`;
const FileCover = styled.div`
  position:relative;
`;

const WalletCover = styled.div`
  position:relative;
  width: 100%;
  margin-bottom: 1em;
`;

const FileButton = styled.a`
  position: absolute;
  top: 0;
  right: 0;
  width: 45px;
  height: 94%;
  display: block;
  background-size: 10px;
  background-repeat: no-repeat;
  background-position: center;
  border:1px solid ${colors.fontSecondary};
  background-color:#484848;
  background-image:url(${Add});
`;

const RemoveButton = styled(FileButton)`
  background-image:url(${Remove});
`;

const Ufr = styled(FileButton)`
  color:${colors.fontPrimary};
  background-image: none;
  line-height: 2.1;
  text-align: center;
`;

const ClosePopUp = styled.a`
  position:absolute;
  width:25px;
  height:25px;
  top:5px;
  right:5px;
  background-size: 10px;
  background-repeat: no-repeat;
  background-position: center;
  background-image:url(${Cancel});
`;

const PopButton = styled(UButton)`
  margin:0 0.5em;
`;

const SmallPopUp = styled(PopUp)`
  height:auto;
`;

const NoTorrents = styled.div`
  position: absolute;
  top: 100%;
  width: 100%;
  text-align: center;
  font-weight: 400;
  color:${colors.fontPrimary};
  font-size:${fonts.middleSize};
`;

const WInput = styled(UInput)`
  font-size:${fonts.smallSize};
  padding:1em 0.5em;
`;

const WalletButton = styled.a`
  position: absolute;
  top: 0;
  right: 0;
  width: 40px;
  height: 94%;
  display: block;
  background-size: 10px;
  background-repeat: no-repeat;
  background-position: center;
  border:1px solid ${colors.fontSecondary};
  background-color:${colors.brandSecondary};
  background-image:url(${Ok});
  &:hover {
    background-color: #0cb2c9;
  }
`;

const PopUpImportnatMessage = styled.p`
  color:${colors.fontPrimary};
  font-size:${fonts.standardSize};
  padding:0.5em 0;
`;
const PopUpDescription = styled.p`
  color:${colors.fontSecondary};
  font-size:${fonts.standardSize};
  padding:0.5em 0;
`;
const Divider = styled.hr`
  width:100%;
  border:0;
  border-bottom:1px solid ${colors.fontSecondary};
`;

const PopUpLogo = styled.img`
  width: 35px;
`;
const PopUpSubtitle = styled.p`
  width:100%;
  text-align:center;
  padding:0.5em;
  color:${colors.fontSecondary};
  font-size:${fonts.middleSize};
`;

const ProgressPopUpText = styled.p`
  font-size:${fonts.standardSize};
  color:${colors.fontPrimary};
  margin:0;
  > span {
    font-size:${fonts.mediumSize};
    color:${colors.fontSecondary};
  }
`;

const ActionsOne = styled(Actions)`
  justify-content:center;
  align-items:center;
  width: 100%;
  margin-top: 0.5em;
`;
const ProgressSubtitle = styled.p`
  text-align:left;
  font-size:${fonts.mediumSize};
  color:#fff;
  padding:0;
  margin:0;
  
`;

const ProgressRow = styled(Row)`
  height:100%;
`;

const MinusButton = styled(FileButton)`

`;
const AddButton = styled(FileButton)`
  right:45px;
`;


export default class UploadsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onSelectTorrent: null,
      selectedFiles: [],
      selectedPath: '',
      generateTorrentStatus: null,
      torrentName: 'Untitled',
      torrentCost: '',
      torrentDescription: '',
      validationError: false,
      torrentsList: [],
      filesSizes: [],
      progressInfo: {}
    };
    this.renderEncryptionPopup = this.renderEncryptionPopup.bind(this);
    this.renderCostsPopup = this.renderCostsPopup.bind(this);
    this.renderProgressPopup = this.renderProgressPopup.bind(this);
    this.handlerOnEnteredValues = this.handlerOnEnteredValues.bind(this);
    this.handlerCancelCreateTorrent = this.handlerCancelCreateTorrent.bind(this);

    // handlers to choose destination path
    this.handlerSelectPath = this.handlerSelectPath.bind(this);
    this.handlerSelectDestinationPath = this.handlerSelectDestinationPath.bind(this);
    this.handlerSelectedFilePath = this.handlerSelectedFilePath.bind(this);


    // Add files to torrent generation
    this.handlerAddSelectedFiles = this.handlerAddSelectedFiles.bind(this);
    this.handlerAddFiles = this.handlerAddFiles.bind(this);

    this.handlerAddSelectedFiles = this.handlerAddSelectedFiles.bind(this);
    this.handlerGetFilesSize = this.handlerGetFilesSize.bind(this);

    this.handlerActionsClick = this.handlerActionsClick.bind(this);
    this.clearTorrentInfo = this.clearTorrentInfo.bind(this);
  }

  componentWillMount() {
    const {onSelectTorrent, progressInfo, torrentsList, selectedFiles, selectedPath, generateTorrentStatus} = this.props;
    this.setState({onSelectTorrent, progressInfo, selectedFiles, selectedPath, generateTorrentStatus, torrentsList});
  }

  componentWillReceiveProps(nextProps) {
    const {onSelectTorrent, progressInfo, selectedFiles, torrentsList, selectedPath, generateTorrentStatus} = nextProps;
    if (this.state.generateTorrentStatus === TS_GENERATION_TORRENT && generateTorrentStatus === TS_DEFAULT) {
      this.clearTorrentInfo();
    }
    this.setState({onSelectTorrent, progressInfo, selectedFiles, selectedPath, torrentsList, generateTorrentStatus});
  }

  clearTorrentInfo() {
    this.setState({
      torrentName: 'Untitled',
      torrentCost: '',
      torrentDescription: ''
    });
  }

  handlerCancelCreateTorrent() {
    const {onCancel} = this.props;
    this.clearTorrentInfo();
    onCancel();
  }

  handlerOnEnteredValues() {
    const {onGenerateTorrent} = this.props;
    // validation
    let validationError = false;
    this.handlerGetFilesSize(1);
    const {selectedPath, selectedFiles, torrentName, torrentCost, torrentDescription, filesSizes} = this.state;

    if (torrentName === 'Untitled') {
      validationError = true;
    }
    if (torrentCost === '') {
      validationError = true;
    }
    if (selectedFiles.length === 0) {
      validationError = true;
    }
    if (selectedPath === '') {
      validationError = true;
    }
    if (!validationError) {

      onGenerateTorrent(filesSizes);
      this.setState({filesSizes: []});
    }
    this.setState({validationError});
  }

  handlerSelectPath(){
    const {onSelectPath, selectedPath} = this.props;
    onSelectPath(selectedPath);
  }

  handlerSelectedFilePath(filePaths) {
    const {onSelectPath} = this.props;
    onSelectPath(filePaths);
    this.setState({validationError: false});
    //this.setState({selectedPath: filePaths});
    //this.handlerSelectPathAfterSelectFile();
  }

  handlerSelectDestinationPath(){
    dialog.showOpenDialog({title: trans("Upload.selectedPath"),properties: ['createDirectory', 'openDirectory']}, (filePaths)=>this.handlerSelectedFilePath(filePaths));
  }

  handlerAddSelectedFiles(filePaths) {
    const {onSelectFiles} = this.props;
    onSelectFiles(filePaths);
    this.setState({validationError: false});
  }

  handlerAddFiles() {
    dialog.showOpenDialog({properties: ['openFile', 'multiSelections']}, (filePaths)=>this.handlerAddSelectedFiles(filePaths));
  }

  handlerChangeInput(type, e) {
    const state = {};
    state[type] = e.target.value;
    console.log(type, state[type]);
    this.setState(state);
    const {onSetTorrentProperty} = this.props;
    onSetTorrentProperty(type, state[type]);
    this.setState({validationError: false});
  }
  handlerActionsClick(i, type, e){

    console.log(i, type);
    const {onRemoveTorrent, onChangeStatus} = this.props;
    switch (type) {
      case TS_STATUS_REMOVE:
        if(window.confirm(trans("remove.torrent"))){
          onRemoveTorrent(i);
        }
        break;
      case TS_STATUS_STOP:
      case TS_STATUS_PLAY:
        onChangeStatus(i, type);
        break;

    }

  }

  handlerRemoveFile(index) {
    const {selectedFiles} = this.state;
    const {onRemoveFile} = this.props;
    //console.log(selectedFiles);
    selectedFiles.splice(index, 1);

    //console.log(selectedFiles);

    onRemoveFile(selectedFiles);

  }

  handlerGetFilesSize (setState = false) {
    let _fileSize = 0;
    const {selectedFiles, filesSizes} = this.state;
    _fileSize = bytesToSize(selectedFiles.reduce((all, cur) => {
      let size = 0;
      if (cur.size) {
        size = all + cur.size;
        if (setState) {
          filesSizes.push({name: cur.path, size: cur.size});
        }
      } else {
        // try to fs
        size = all + fileSize(cur);
        if (setState) {
          filesSizes.push({name: cur, size: fileSize(cur)});
        }
      }
      return size;
    }, 0)); //selectedFiles
    if (setState) {
      this.setState({filesSizes});
    }
    return _fileSize;
  }

  renderFirstEntrancePopup() {
    return <SmallPopUp>
      <ClosePopUp onClick={this.handlerCancelCreateTorrent}></ClosePopUp>
      <PopUpTitle><PopUpLogo src={logo}/>{trans('FirstEntrance.PopUp.Title')}</PopUpTitle>
      <PopUpSubtitle>{trans('FirstEntrance.PopUp.Title')}</PopUpSubtitle>
      <WalletCover>
        <WInput placeholder={trans('wallet.inputs.WalletAdress')}/>
        <WalletButton href="#"></WalletButton>
      </WalletCover>
      <PopUpDescription>{trans('FirstEntrance.PopUp.description')}</PopUpDescription>
      <Divider/>
      <PopUpImportnatMessage>{trans('FirstEntrance.PopUp.important')}</PopUpImportnatMessage>
      <PopAction>
        <PopButton secondary>{trans('wallet.buttons.CreateNew')}</PopButton>
        <PopButton additional>{trans('FirstEntrance.PopUp.Addwallet')}</PopButton>
      </PopAction>
    </SmallPopUp>
  }

  renderCostsPopup() {
    const {selectedPath, selectedFiles, torrentName, torrentCost, validationError, torrentDescription} = this.state;
    const fileSize = this.handlerGetFilesSize();
    return <PopUp>
      <ClosePopUp onClick={this.handlerCancelCreateTorrent}></ClosePopUp>
      <PopUpTitle>{trans('popups.upload.UploadDetails')}</PopUpTitle>
      <PopUpTorrentName>{torrentName}.torrent</PopUpTorrentName>
      {fileSize ? <PopUpTorrentSize>{fileSize}</PopUpTorrentSize> : null}
      <Row>
        <HalfColumn>
          <UInput value={torrentName === 'Untitled' ? '' : torrentName} onChange={this.handlerChangeInput.bind(this, 'torrentName')} placeholder={trans('popups.upload.Enter.torrent.name')}/>
          {validationError && torrentName === 'Untitled' ? <ErrorField>{trans("upload.error.torrentName")}</ErrorField> : null }
        </HalfColumn>
        <HalfColumn>
          <FileCover>
            <UInput onChange={this.handlerChangeInput.bind(this, 'torrentCost')} value={torrentCost} placeholder={trans('popups.upload.Enter.Price')}/>
            <Ufr>{trans('popups.upload.UFR')}</Ufr>
          </FileCover>
          {validationError && torrentCost === '' ? <ErrorField>{trans("upload.error.torrentCost")}</ErrorField> : null }
        </HalfColumn>
        { selectedFiles && selectedFiles.length && selectedFiles.map((file, i) => {
          return <FullColumn key={i}>
            <FileCover>
              <UInput readOnly={'readOnly'} value={file && file.path || file} placeholder={trans('popups.upload.Enter.choose.file.path')}/>
              <FileButton onClick={this.handlerAddFiles} href="#"></FileButton>
              <RemoveButton onClick={this.handlerRemoveFile.bind(this, i)} href="#"></RemoveButton>
              {/* remove button */}
            </FileCover>
          </FullColumn>
        }) || null }
        <FullColumn>
          <FileCover>
            <UInput readOnly={'readOnly'}  placeholder={trans('popups.upload.Enter.choose.file.path')}/>
            <AddButton onClick={this.handlerAddFiles} href="#"></AddButton>
            <RemoveButton href="#"></RemoveButton>
          </FileCover>
          {validationError && selectedFiles.length === 0 ? <ErrorField>{trans("upload.error.torrentFiles")}</ErrorField> : null }
        </FullColumn>
        <FullColumn>
          <FileCover>
            <UInput readOnly={'readOnly'}  value={selectedPath ? selectedPath : ''} placeholder={trans('popups.upload.Enter.choose.archive.path')}/>
            <FileButton onClick={this.handlerSelectDestinationPath} href="#"></FileButton>
          </FileCover>
          {validationError && selectedPath === '' ? <ErrorField>{trans("upload.error.torrentPath")}</ErrorField> : null }
        </FullColumn>
        <FullColumn>
          <UTextarea value={torrentDescription} onChange={this.handlerChangeInput.bind(this, 'torrentDescription')} placeholder={trans('popups.upload.Enter.torrent.description')}/>
        </FullColumn>
      </Row>
      <PopAction>
        <PopButton additional onClick={this.handlerCancelCreateTorrent}>{trans('cancel')}</PopButton>
        <PopButton secondary onClick={this.handlerOnEnteredValues}>{trans('Upload')}</PopButton>
      </PopAction>
    </PopUp>
  }

  renderProgressPopup(title, progressInfo = null) {
    let progress = null;
    if (progressInfo) {
        const {allLeft, allSize, left, read, fileSize} = progressInfo;
        let allPercent = parseInt((allSize - allLeft) * 100 / allSize);
        let currentPercent = parseInt((fileSize - left) * 100 / fileSize);
        progress = <FullColumn>
          <div>{allPercent}% <Progress style={{width: `${allPercent}%`}}src={FullProgress}/></div>
          <div>{trans("Processing")} {progressInfo.file}</div>
          <div>{currentPercent}% <Progress style={{width: `${currentPercent}%`}}src={FullProgressRed}/></div>
        </FullColumn>
    }
    let skCube = [];
    for (let i = 1; i < 10; i++) {
      skCube.push(<div key={i} className={`sk-cube sk-cube${i}`}></div>);
    }
    return <SmallPopUp>
      <PopUpTitle>{title}</PopUpTitle>
      <FullColumn>
        {/*<Progress src={SmallProgressBlue}/>*/}
        <div className="sk-cube-grid">
          {skCube}
        </div>
      </FullColumn>
      {progress}
    </SmallPopUp>;
  }

  renderNewProgressPopup(title, progressInfo = null) {
    let progress = null;
    if (progressInfo) {
      const {allLeft, allSize, left, read, fileSize} = progressInfo;
      let allPercent = parseInt((allSize - allLeft) * 100 / allSize);
      let currentPercent = parseInt((fileSize - left) * 100 / fileSize);
      progress = <ProgressRow>
        <FullColumn><ProgressSubtitle>{trans('Progress.Popup.All.files')}</ProgressSubtitle></FullColumn>
        <HalfColumn>
          <ProgressPopUpText>{trans('Progress.Popup.Upload')}<span> (987 MB) </span>{trans('Progress.Popup.Files')}
          </ProgressPopUpText>
        </HalfColumn>
        <HalfColumn><ProgressPopUpText>{trans('Progress.Popup.Complete')}<span> 387 MB (39.2 %) </span></ProgressPopUpText></HalfColumn>
        <FullColumn>
          <Progress style={{width: `${allPercent}%`}} src={FullProgress}/>
        </FullColumn>
        <FullColumn><ProgressSubtitle>{trans('Progress.Popup.Current.file')}</ProgressSubtitle></FullColumn>
        <HalfColumn><ProgressPopUpText>fileindex.mp4</ProgressPopUpText></HalfColumn>
        <HalfColumn><ProgressPopUpText>{trans('Progress.Popup.Complete')}<span>167 MB (89.3 %)</span></ProgressPopUpText></HalfColumn>
        <FullColumn>
          <Progress style={{width: `${currentPercent}%`}} src={FullProgressRed}/>
        </FullColumn>
        <HalfColumn><ProgressPopUpText>{trans('Progress.Popup.Total.Size')}<span> 987 MB </span></ProgressPopUpText></HalfColumn>
        <HalfColumn><ProgressPopUpText>{trans('Progress.Popup.Files.uploaded')}<span>5</span></ProgressPopUpText></HalfColumn>
        <ActionsOne><PopButton additional>{trans('cancel')}</PopButton></ActionsOne>
      </ProgressRow>
    }
    let skCube = [];
    for (let i = 1; i < 10; i++) {
      skCube.push(<div className={`sk-cube sk-cube${i}`}></div>);
    }
    return <SmallPopUp>
      <PopUpTitle>{title}</PopUpTitle>
      <FullColumn>
        {/*<Progress src={SmallProgressBlue}/>*/}
        <div className="sk-cube-grid">
          {skCube}
        </div>
      </FullColumn>
      {progress}
    </SmallPopUp>;
  }

  renderEncryptionPopup() {
    const {generateTorrentStatus, progressInfo} = this.state;
    let result = null;
    switch (generateTorrentStatus) {
      case TS_GENERATION_ENCRYPTED:
        result = this.renderProgressPopup(trans('popups.fileencript'), progressInfo);
        break;
      case TS_GENERATION_TORRENT:
        result = this.renderProgressPopup(trans('popups.torrentgenerate'));
        break;
      case TS_SET_COSTS:
        result = this.renderCostsPopup();
        break;
    }
    return result;
  }

  render() {
    const {onDragFilesToTorrent, onClickAddFilesToTorrent} = this.props;
    const {torrentsList} = this.state;
    const infoPopUp = this.renderEncryptionPopup();

    let torrentsListTable = null;
    if (torrentsList && torrentsList.length) {
      torrentsListTable = torrentsList.map((item, i)=> {
        return (<tr key={i}>
          <th><input type="checkbox"/></th>
          <td>{item.torrentName}</td>
          <td><Icon icon={ICONS.Search} color='#D4D4D4'/></td>
          <td><SmallProgress src={SmallProgressBlue}/></td>
          <td>{item && item.parsedTorrent && item.parsedTorrent.length && bytesToSize(item.parsedTorrent.length) || trans("Unknown")}</td>
          <td>---</td>
          <td>---</td>
          <td>128 Mb/s</td>
          <td>128 Mb/s</td>
          <td>{item && item.addedDate && moment(item.addedDate).format('LLLL') || '--/--/--'} </td>
          <td>02.02.18</td>
          <td><ActionsIcons status={item && item.status || TS_STATUS_STOP } onClick={(type)=> {
            this.handlerActionsClick(i, type)
          }}/></td>
        </tr>);
      });
    } else {
      torrentsListTable = <tr>
        <td colspan="12"><NoTorrents>{trans('FirstEntrance.Upload.table.noFilesYet')}</NoTorrents></td>
      </tr>;
    }

    return (
      <ContainerFluid>
        <div>
          <UploadField title={trans('Upload.UploadYourFile')} subtitle={trans('Upload.UploadComment')}
                       onDragFilesToTorrent={onDragFilesToTorrent}
                       onClickAddFilesToTorrent={onClickAddFilesToTorrent}/>
          <UHint>
            <p>{trans('FirstEntrance.Upload.hint.subtitle')}</p>
            <ul>
              <li>{trans('FirstEntrance.Upload.hint.first')}<a
                href="#">{trans('FirstEntrance.Upload.hint.first.link')}</a>{trans('FirstEntrance.Upload.hint.first.end')}
              </li>
              <li>{trans('FirstEntrance.Upload.hint.second')}</li>
              <li>{trans('FirstEntrance.Upload.hint.third')}</li>
            </ul>
          </UHint>
          <Actions>
            <Subtitle>{trans('Upload.Uploads')}</Subtitle>
            <div>
              <UButton additional href="#">{trans('Upload.Details')}</UButton>
              <UButton href="#">{trans('Upload.GetALink')}</UButton>
            </div>
          </Actions>
          <UploadsTable>
            <thead>
            <tr>
              <th><input type="checkbox"/></th>
              <th>{trans('table.FileName')}</th>
              <th>{trans('table.#')}</th>
              <th>{trans('table.Progress')}</th>
              <th>{trans('table.Size')}</th>
              <th>{trans('table.Peers')}</th>
              <th>{trans('table.Seeds')}</th>
              <th>{trans('table.Speed')}</th>
              <th>{trans('table.Uploaded')}</th>
              <th>{trans('table.AddedOn')}</th>
              <th>{trans('table.CompletedOn')}</th>
              <th>{trans('table.Actions')}</th>
            </tr>
            </thead>
            <tbody>
            {torrentsListTable}
            </tbody>
          </UploadsTable>
        </div>
        {infoPopUp}

      </ContainerFluid>
    );
  }
}
