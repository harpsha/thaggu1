import React, { Component } from 'react';
import styled from 'styled-components';
import { Container, ContainerFluid, media } from '../../style/containers';
import colors from '../../style/colors';
import fonts from '../../style/font-styles';
import trans from '../../trans';
import UTable from '../common/Table';
import UButton from '../common/UButton';
import WalletGraphs from '../WalletPage/components/GraphsSection';
import WalletTop from '../WalletPage/components/WalletSection';
import PopUp from '../common/PopUp';
import Cancel from '../common/images/cancel-btn.svg';
import UInput from '../common/inputText';

const TransactionsTable = styled(UTable)``;

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
  color:${colors.fontThird};
  font-weight:300;
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
  overflow-y:auto;
  overflow-x:hidden;
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

const PopAction = styled.div`
  margin:2em auto 1em;
  display:flex;
  align-items:center;
  justify-content:center;
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

const PopText = styled.span`
  width:auto;
  text-align:left;
  padding:0.5em 0;
  color:${colors.fontPrimary};
  font-weight:100;
  font-size:${fonts.mediumSize};
`;
const Min = styled.span`
  width:100%;
  text-align:left;
  padding:0.5em 0;
  color:${colors.brandSecondary};
  font-size:${fonts.bigSize};
`;
const Max = styled(Min)`
  color:${colors.brandPrimary};
`;
const Helper = styled.p`
  font-size:${fonts.smallSize};
  color:${colors.brandDarker};
`;

const SmallPopUp = styled(PopUp)`
  height:auto;
`;
const PopUpSubtitle = styled.p`
  width:100%;
  text-align:center;
  padding:0.5em 0;
  margin:0;
  color:${colors.fontPrimary};
  font-weight:100;
  font-size:${fonts.mediumSize};
`;
const ActionsOne = styled(Actions)`
  justify-content:center;
  align-items:center;
  width: 100%;
  margin-top: 0.5em;
`;

export default class WalletPage extends Component {
  constructor(props) {
    super(props);
    this.renderWithdrawPopup = this.renderWithdrawPopup.bind(this);
  }
  renderWithdrawPopup() {
    return <SmallPopUp>
      <ClosePopUp onClick={this.handlerCancelCreateTorrent}></ClosePopUp>
      <PopUpTitle>{trans('Withdraw.Popup.Title')}</PopUpTitle>
      <Row>
      <HalfColumn>
        <PopText>{trans('Withdraw.Popup.Minimum')}</PopText>
        <Min>100 {trans('popups.upload.UFR')}</Min>
      </HalfColumn>
      <HalfColumn>
        <PopText>{trans('Withdraw.Popup.Maximum')}</PopText>
        <Max>3000 {trans('popups.upload.UFR')}</Max>
      </HalfColumn>
      <FullColumn>
        <UInput placeholder={trans('Withdraw.Popup.input')}/>
      </FullColumn>
      <FullColumn>
        <Helper>{trans('Withdraw.Popup.help')}</Helper>
      </FullColumn>
      </Row>
      <ActionsOne>
        <PopButton>{trans('Withdraw.Popup.Title')}</PopButton>
      </ActionsOne>
    </SmallPopUp>
  }
  render() {
    const withdrawPopUp = this.renderWithdrawPopup();
    return (
      <ContainerFluid>
        <div>
          <WalletTop />
          <WalletGraphs />
          <Subtitle>{trans('wallet.titles.TransactionsHistory')}</Subtitle>
          <TransactionsTable>
            <thead>
              <tr>
                <th>{trans('wallet.transactions.n')}</th>
                <th>{trans('wallet.transactions.ID')}</th>
                <th>{trans('wallet.transactions.Type')}</th>
                <th>{trans('wallet.transactions.Amount')}</th>
                <th>{trans('wallet.transactions.AddedOn')}</th>
                <th>{trans('wallet.transactions.CompletedOn')}</th>
                <th>{trans('wallet.transactions.Status')}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>128</th>
                <td>0213901392</td>
                <td>Withdraw</td>
                <td>180000 UFR</td>
                <td>01.02.18 - 18:21</td>
                <td>--</td>
                <td>In progress</td>
              </tr>
            </tbody>
          </TransactionsTable>
          {withdrawPopUp}
        </div>
      </ContainerFluid>
    );
  }
}
