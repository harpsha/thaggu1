import React, { Component } from 'react';
import styled from 'styled-components';
import colors from '../../../style/colors';
import { ContainerFluid } from '../../../style/containers';
import trans from '../../../trans';
import fonts from '../../../style/font-styles';
import gradients from "../../../style/gradients";

const Menu = styled.div`
  display:flex;
  flex-flow:row wrap;
  justify-content: space-between;
  align-items: center;
  margin:1em 0;
  &.active{
    font-weight: bold;
  }
`;
const Nav = styled.ul`
  display:inline;
  padding:0;
  > li {
  display:inline-block;
  text-transform:uppercase;
  padding:0em 1em;
  }
`;

const MenuLink = styled.a`
  color: ${colors.fontPrimary};
  
  font-family: 'Open Sans', sans-serif;
  transition: all 0.3s;
  font-size: ${fonts.standardSize};
  text-transform:uppercase;
  &:hover, &:active, &:focus {
  color: ${colors.brandPrimary};
  border-bottom:2px solid ${colors.brandPrimary};
  cursor:pointer;}
  ${({active}) => active ? `
    color: ${colors.brandPrimary};
    border-bottom:2px solid ${colors.brandPrimary};
    ` : `
    padding:1em 0;`}
`;

const History = styled(MenuLink)`
  color:${colors.fontSecondary};
  &.active{
    font-weight:bold;
  }
  &:hover, &:active, &:focus {
  border-bottom:0px;
  }
`;

import {UPLOAD_PAGE, DOWNLOAD_PAGE, FINISHED_PAGE, HISTORY_PAGE, WALLET_PAGE} from '../../../constants';

const MENU = [{title: "Upload", link: UPLOAD_PAGE},
  {title: "Download", link: DOWNLOAD_PAGE},
  {title: "Finished", link: FINISHED_PAGE},
  {title: "WalletAndEarnings", link: WALLET_PAGE},
];

export class MenuItem extends React.Component {
  constructor(props){
    super(props);
  }

  render() {
    console.log(this.props);
    let active = this.props.selectedPage === this.props.link ? true : null;
    return <li><MenuLink active={active}
                         onClick={()=>this.props.onClick(this.props.link)}>{trans(this.props.title)}</MenuLink>
    </li>;
  }
}


export default class NavMenu extends Component {
  constructor(props) {
    super(props);

  }

  handlerMenuClick(selectedPage) {
    const {onSelectPage} = this.props;
    onSelectPage(selectedPage);
  }

  render() {
    const {selectedPage} = this.props;
    return (
      <ContainerFluid>
        <Menu>
          <Nav>
            {
              MENU && MENU.map((item, i) => {
                return <MenuItem key={i}
                                 onClick={(page)=>this.handlerMenuClick(page)}
                                 selectedPage={selectedPage}
                                 link={item.link}
                                 title={item.title}
                                  />
              })
            }
          </Nav>
          <History onClick={()=>this.handlerMenuClick(HISTORY_PAGE)}>{trans('History')}</History>
        </Menu>
      </ContainerFluid>
    );
  }
}