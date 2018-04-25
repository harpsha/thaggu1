import React, { Component } from 'react';
import styled from 'styled-components';
import { Container,ContainerFluid, MainAppContainer, media } from '../../style/containers';
import colors from '../../style/colors';
import fonts from '../../style/font-styles';
import trans from '../../trans';
import UTable from '../common/Table';
import Details from '../HistoryPage/Details';
import Icon from '../../components/common/icons/Icons';
import {ICONS} from '../../components/common/icons/iconsConstants';

const UploadsTable = styled(UTable)`
  
`;


const Subtitle = styled.h4`
  font-size:${fonts.mediumSize};
  color:${colors.fontPrimary};
`;

const Progress = styled.img`

`;

export default class HistoryPage extends Component {
  render() {
    return (
      <ContainerFluid>
        <div>
          <UploadsTable>
            <tr>
              <th><input type="checkbox" /></th>
              <th>{trans('table.FileName')}</th>
              <th>{trans('table.#')}</th>
              <th>{trans('table.Size')}</th>
              <th>{trans('table.Peers')}</th>
              <th>{trans('table.Seeds')}</th>
              <th>{trans('table.Speed')}</th>
              <th>{trans('table.Uploaded')}</th>
              <th>{trans('table.AddedOn')}</th>
              <th>{trans('table.CompletedOn')}</th>
              <th>{trans('history.Seeded')}</th>
              <th>{trans('history.Earned')}</th>
            </tr>
            <tr>
              <th><input type="checkbox" /></th>
              <td>SomeFIle</td>
              <td><Icon icon={ICONS.Search} color="#D4D4D4" /></td>
              <td>1.5 Gb</td>
              <td>18</td>
              <td>29 </td>
              <td>128 Mb/s</td>
              <td>128 Mb/s</td>
              <td>01.02.18</td>
              <td>02.02.18</td>
              <td> 3 d 14h 18m</td>
              <td>18 000</td>
            </tr>
          </UploadsTable>
          <Details />
        </div>
      </ContainerFluid>
    );
  }
}
