import React, { Component } from 'react';
import styled from 'styled-components';
import { Container, ContainerFluid, media } from '../../../style/containers';
import colors from '../../../style/colors';
import fonts from '../../../style/font-styles';
import trans from '../../../trans';
import UButton from '../../common/UButton';
import UInput from '../../common/inputText';
import Ok from '../../common/images/checking.svg';

const Subtitle = styled.h4`
  font-size:${fonts.mediumSize};
  color:${colors.fontThird};
  font-weight:300;
`;
const WalletSection = styled.div`
  display:flex;
  flex-flow:row wrap;
  flex:1;
  justify-content:space-between;
  padding:1em 0;
  > div {
    padding:0.5em 1em;
    > h4 {
      margin:0.5em 0;
      
    }
  }
`;

const WalletInputSection = styled.div`
  display:flex;
  flex-flow:column wrap;
  flex:0.33;
  border:1px solid ${colors.fontSecondary};
  border-radius:0.5em;
`;

const WalletBallanceSection = styled.div`
  display:flex;
  flex-flow:column wrap;
  flex:0.3;
  border:1px solid ${colors.fontSecondary};
  border-radius:0.5em;
  text-align:center;
`;

const WithdrawSection = styled.div`
  display:flex;
  flex-flow:column wrap;
  flex:0.33;
  border:1px solid ${colors.fontSecondary};
  border-radius:0.5em;
  text-align:center;
  > h4 {
  text-align:center !important;
  }
`;

const Actions = styled.div`
  display:flex;
  flex-flow:row wrap;
  align-items:center;
  justify-content:space-between;
`;

const WalletButton = styled(UButton)`
  width:100px;
  margin: 0 auto;
`;

const BallanceDiv = styled.div`
  flex-flow:row wrap;
  border-bottom:1px solid ${colors.fontSecondary};
  justify-content:space-between;
  position:relative;
  margin-bottom:1em;
  
`;

const Currency = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 50px;
  height: 100%;
  display:flex;
  align-items: center;
    justify-content: center;
  background-color:#484848;
  color:${colors.fontPrimary};
  background-image: none;
  line-height: 2.1;
  text-align: center;
`;

const Ballance = styled.h4`
  font-size:${fonts.middleSize};
  color:${colors.fontPrimary};
  padding: 0.25em;
  margin: 0;
  text-align: left;
  font-weight: normal;
`;
const FileCover = styled.div`
  position:relative;
  width: 100%;
  margin-bottom: 1em;
`;
const FileButton = styled.a`
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

const WInput = styled(UInput)`
  font-size:${fonts.smallSize};
  padding:1em 0.5em;
`;

const BallanceOne = styled(Ballance)`
  margin:0 0 0.7em !important;
`;


const SubtitleFlexRow = styled.div`
  display:flex;
  flex-flow:row wrap;
  align-items:center;
  justify-content:space-between;
  > h4 {
    margin:0.5em 0;
  }
  > span {
    font-size:${fonts.smallSize};
    color:${colors.fontSecondary};
    font-weight:300;
      > a {
      font-weight:600;
      color:${colors.fontPrimary};
      text-decoration:underline;
    }
  }
`;

const Info = styled.div`
  font-size:0.8em;
  text-decoration:underline;
  color:${colors.fontPrimary};
  font-style: italic;
  padding:0 0.5em;
  width:auto;
  float:right;
  > div {
    display:none;
    position: absolute;
    top: 2em;
    right: -150%;
    font-style: normal;
    width: 200px;
    color: ${colors.fontPrimary};
    padding: 0.5em;
    background-color: #1e1e1e;
    box-shadow: 0 4px 10px 4px rgba(0,0,0,0.5);
  }
  &:hover {
    > div {
    display:block;
    }
  }
`;



export default class WalletTop extends Component {
  render() {
    return (
          <WalletSection>
            <WalletInputSection>
              <SubtitleFlexRow>
                <Subtitle>{trans('wallet.titles.Wallet')}</Subtitle>
                <span>{trans('wallet.LoadWallet')}<a href="#">{trans('wallet.byPrivateKey')}</a></span>
              </SubtitleFlexRow>
              <Actions>
                <FileCover>
                  <WInput placeholder={trans('wallet.inputs.WalletAdress')} />
                  <FileButton href="#"></FileButton>
                </FileCover>
                <WalletButton secondary>{trans('wallet.buttons.CreateNew')}</WalletButton>
                <WalletButton additional>{trans('wallet.buttons.Change')}</WalletButton>
              </Actions>
            </WalletInputSection>
            <WalletBallanceSection>
              <Subtitle>{trans('wallet.titles.WalletBalance')}</Subtitle>
              <BallanceDiv>
                <Ballance>3000.1</Ballance>
                <Currency>UFR</Currency>
              </BallanceDiv>
              <BallanceDiv>
                <Ballance>1000.011</Ballance>
                <Currency>ETH
                  <Info>i<div>{trans('wallet.eth.info')}</div></Info>
                </Currency>
              </BallanceDiv>
            </WalletBallanceSection>
            <WithdrawSection>
              <Subtitle>{trans('wallet.titles.Withdraw')}</Subtitle>
              <BallanceOne>3000 UFR</BallanceOne>
              <WalletButton>{trans('wallet.buttons.Withdraw')}</WalletButton>
            </WithdrawSection>
          </WalletSection>
    );
  }
}
