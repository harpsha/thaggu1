import React, { Component } from 'react';
import styled from 'styled-components';
import { Container,ContainerFluid, MainAppContainer, media } from '../../style/containers';
import colors from '../../style/colors';
import gradients from '../../style/gradients';
import fonts from '../../style/font-styles';
import trans from '../../trans';
import UButton from '../common/UButton';
import UTable from '../common/Table';
import Details from '../FinishedPage/Details';
import Icon from '../../components/common/icons/Icons';
import {ICONS} from '../../components/common/icons/iconsConstants';
import ActionsIcons from '../common/ActionsIcons';
import SmallProgressBlue from '../common/images/small-progress-blue.svg';
import Pick from '../common/images/pick.svg';
import PopUp from '../common/PopUp';
import UInput from '../common/inputText';
import UTextarea from '../common/inputTextarea';
import ErrorField from '../common/errorField';
import UHint from '../common/Hint';

const FinishedTable = styled(UTable)`
  position: relative;
`;

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

const Subtitle = styled.h4`
  font-size:${fonts.mediumSize};
  color:${colors.fontPrimary};
`;

const Progress = styled.img`

`;
const PopUpTitle = styled.h2`
  font-size:${fonts.largeSize};
  color:${colors.fontPrimary};
  font-weight:400;
  margin:0.5em 0;
  text-align:center;
`;

const Row = styled.div`
  display:flex;
  flex-flow:row wrap;
  flex:0 1 100%;
  justify-content:space-between;
`;

const HalfColumn = styled.div`
  display:flex;
  flex-flow:column wrap;
  flex:0 0.48 48%;
`;

const FullColumn = styled.div`
  display:flex;
  flex-flow:column wrap;
  flex:0 1 100%;
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
  margin:0 auto;
  display:flex;
  align-items:center;
  justify-content:center;
`;
const FileCover = styled.div`
  position:relative;
`;
const FileButton = styled.a`
  position: absolute;
  top: 0;
  right: 0;
  width: 45px;
  height: 96%;
  display: block;
  background-size: 10px;
  background-repeat: no-repeat;
  background-position: center;
  border:1px solid ${colors.fontSecondary};
  background-color:#484848;
  background-image:url(${Pick});;
`;

const Ufr = styled(FileButton)`
  color:${colors.fontPrimary};
  background-image: none;
  line-height: 2.1;
  text-align: center;
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

export default class DownloadsPage extends Component {
  render() {
    return (
      <ContainerFluid>
        <div>
          <Actions>
            <Subtitle>{trans('finished.title')}</Subtitle>
            <div>
              <UButton secondary href="#">{trans('finished.Reseed')}</UButton>
              <UButton href="#">{trans('finished.SetANewPrice')}</UButton>
              <UButton additional href="#">{trans('finished.Unpack')}</UButton>
            </div>

          </Actions>
          <FinishedTable>
            <tr>
              <th><input type="checkbox" /></th>
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
            <tr>
              <th><input type="checkbox" /></th>
              <td>SomeFIle</td>
              <td><Icon icon={ICONS.Search} color="#D4D4D4" /></td>
              <td><Progress src={SmallProgressBlue} /></td>
              <td>1.5 Gb</td>
              <td>18</td>
              <td>29 </td>
              <td>128 Mb/s</td>
              <td>128 Mb/s</td>
              <td>01.02.18</td>
              <td>02.02.18</td>
              <td><ActionsIcons /></td>
            </tr>
            <NoTorrents>{trans('FirstEntrance.Finished.table.noFilesYet')}</NoTorrents>
          </FinishedTable>
          <UHint>
            <ul>
              <li>{trans('FirstEntrance.Finished.hint.first')}</li>
              <li>{trans('FirstEntrance.Finished.hint.second')}</li>
              <li>{trans('FirstEntrance.Finished.hint.third')}</li>
            </ul>
          </UHint>
          <Details />
        </div>
        {/*<PopUp>*/}
          {/*<PopUpTitle>{trans('popups.reseed.title')}</PopUpTitle>*/}
          {/*<PopUpTorrentName>SomeFileName.torrent</PopUpTorrentName>*/}
          {/*<PopUpTorrentSize>28.8 Gb</PopUpTorrentSize>*/}
          {/*<Row>*/}
            {/*<HalfColumn>*/}
              {/*<UInput placeholder={trans('popups.upload.Enter.torrent.name')} />*/}
              {/*<ErrorField>Some error</ErrorField>*/}
            {/*</HalfColumn>*/}
            {/*<HalfColumn>*/}
              {/*<FileCover>*/}
                {/*<UInput placeholder={trans('popups.upload.Enter.Price')} />*/}
                {/*<Ufr>{trans('popups.upload.UFR')}</Ufr>*/}
              {/*</FileCover>*/}
              {/*<ErrorField>Some error</ErrorField>*/}
            {/*</HalfColumn>*/}
            {/*<FullColumn>*/}
              {/*<FileCover>*/}
                {/*<UInput placeholder={trans('popups.upload.Enter.choose.file.path')} />*/}
                {/*<FileButton href="#"></FileButton>*/}
              {/*</FileCover>*/}
              {/*<ErrorField>Some error</ErrorField>*/}
            {/*</FullColumn>*/}
            {/*<FullColumn>*/}
              {/*<FileCover>*/}
                {/*<UInput placeholder={trans('popups.upload.Enter.choose.archive.path')} />*/}
                {/*<FileButton href="#"></FileButton>*/}
              {/*</FileCover>*/}
              {/*<ErrorField>Some error</ErrorField>*/}
            {/*</FullColumn>*/}
            {/*<FullColumn>*/}
              {/*<UTextarea placeholder={trans('popups.upload.Enter.torrent.description')} />*/}
              {/*<ErrorField>Some error</ErrorField>*/}
            {/*</FullColumn>*/}
            {/*<PopAction>*/}
              {/*<UButton secondary href="#">{trans('popups.reseed.reseed')}</UButton>*/}
            {/*</PopAction>*/}
          {/*</Row>*/}
        {/*</PopUp>*/}
      </ContainerFluid>
    );
  }
}
