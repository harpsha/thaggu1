import React, { Component } from 'react';
import styled from 'styled-components';
import { Container,ContainerFluid, MainAppContainer, media } from '../../style/containers';
import colors from '../../style/colors';
import gradients from '../../style/gradients';
import fonts from '../../style/font-styles';
import trans from '../../trans';
import UButton from '../common/UButton';
import UTable from '../common/Table';
import UploadField from '../Uploads/components/UploadFile';
import Details from '../Downloads/Details';
import Icon from '../../components/common/icons/Icons';
import {ICONS} from '../../components/common/icons/iconsConstants';
import ActionsIcons from '../common/ActionsIcons';
import SmallProgress from '../common/images/small-progress.svg';
import UHint from '../common/Hint';

const DownloadsTable = styled(UTable)`
  position: relative;
`;


const Subtitle = styled.h4`
  font-size:${fonts.mediumSize};
  color:${colors.fontPrimary};
`;

const Progress = styled.img`

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
    const {onDragFilesFromTorrent, onClickAddFilesFromTorrent} = this.props;
    return (
      <ContainerFluid>
        <div>
          <DownloadsTable>
            <thead>
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
            </thead>
            <tbody>
                <tr>
                  <th><input type="checkbox" /></th>
                  <td>SomeFIle</td>
                  <td><Icon icon={ICONS.Search} color="#D4D4D4" /></td>
                  <td><Progress src={SmallProgress} /></td>
                  <td>1.5 Gb</td>
                  <td>18</td>
                  <td>29 </td>
                  <td>128 Mb/s</td>
                  <td>128 Mb/s</td>
                  <td>01.02.18</td>
                  <td>02.02.18</td>
                  <td><ActionsIcons /></td>
                </tr>
                <tr>
                  <td colSpan="12"><NoTorrents>{trans('FirstEntrance.Download.table.noFilesYet')}</NoTorrents></td>
                </tr>
              </tbody>


          </DownloadsTable>
          <UHint>
            <p>
              {trans('FirstEntrance.Download.hint')}
            </p>
          </UHint>
          <Details />
          <UploadField  subtitle={trans('Upload.UploadComment')}
                        onDragFilesToTorrent={onDragFilesFromTorrent}
                        onClickAddFilesToTorrent={onClickAddFilesFromTorrent} />
        </div>
      </ContainerFluid>
    );
  }
}
