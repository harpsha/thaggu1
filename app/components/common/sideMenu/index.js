import React, { Component } from 'react';
import styled from 'styled-components';
import { SideMenu } from '../../../style/containers';
import logo from '../../common/images/logo.png';
import UploadSpeedProgress from '../graphs/uploadSpeed';
import DownloadSpeedProgress from '../graphs/downloadSpeed';

const Logo = styled.img`
  max-width:100%;
  width: 75px;
  margin: 0 auto 2em;
  display: block;
`;

const SideWrapper = styled.div`
  position:relative;
  margin:0 auto;
  padding: 1em 0.5em;
  text-align: center;
`;

export default class SideMenuContainer extends Component {
  render() {
    return (
      <SideMenu>
        <SideWrapper>
          <Logo src={logo} />
          <UploadSpeedProgress />
          <DownloadSpeedProgress />
        </SideWrapper>
      </SideMenu>
    );
  }
}