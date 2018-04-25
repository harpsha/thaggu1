import React, { Component } from 'react';
import styled from 'styled-components';
import colors from '../../../style/colors';
import {ICONS} from '../../common/icons/iconsConstants';
import Icon from '../../common/icons/Icons';

import {TS_STATUS_PLAY, TS_STATUS_REMOVE, TS_STATUS_STOP} from '../../../constants';

const ActIcons = styled.div`
  > svg {
    margin:0 0.25em;
  }
`;

export default class extends React.PureComponent {
  constructor(props){
    super(props);
  }

  componentWillMount(){

  }

  render() {
    const {onClick, status} = this.props;
    return <ActIcons>
      {
        status === TS_STATUS_STOP ? <a onClick={()=>{onClick(TS_STATUS_PLAY)}} ><Icon icon={ICONS.Play} color={colors.brandSecondary} /></a> :
          <a onClick={()=>{onClick(TS_STATUS_STOP)}}><Icon  icon={ICONS.Stop} color={colors.fontPrimary} /></a>
      }
      <a onClick={()=>{onClick(TS_STATUS_REMOVE)}} ><Icon icon={ICONS.Cancel} color={colors.brandDarker} /></a>
    </ActIcons>
  }
}