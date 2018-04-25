/**
 * Created by maximnord on 2/23/18.
 */
import React from 'react';
import styled from 'styled-components';

import Cancel from './images/cancel-btn.svg';
import colors from '../../style/colors';
import fonts from '../../style/font-styles';
import PopUp from './PopUp';

import UButton from './UButton';

const PopUpTitle = styled.h2`
  font-size:${fonts.largeSize};
  color:${colors.fontPrimary};
  font-weight:400;
  margin:0.5em 0;
  text-align:center;
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

const Row = styled.div`
  display:flex;
  flex-flow:row wrap;
  flex:0 1 100%;
  justify-content:space-between;
`;
const PopAction = styled.div`
  margin:0 auto;
  display:flex;
  align-items:center;
  justify-content:center;
`;


const PopButton = styled(UButton)`
  margin:0 0.5em;
`;
export default class extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showConfirmation: false
    }
    this.handlerResult = this.handlerResult.bind(this);
  }

  componentWillMount() {
    const {show} = this.props;

    this.setState({showConfirmation: show});
  }
  componentWillReceiveProps(newProps) {
    const {show} = newProps;
    this.setState({showConfirmation: show});
  }
  handlerResult(result) {
    const {onClick} = this.props;
    onClick(result);
  }

  render() {

    return show ? <PopUp>
      <ClosePopUp onClick={this.handlerResult.bind(false)}></ClosePopUp>
      <PopUpTitle>{this.props.children}</PopUpTitle>
      <Row>
        <PopAction>
          <PopButton additional onClick={this.handlerResult.bind(false)}>{trans('cancel')}</PopButton>
          <PopButton secondary onClick={this.handlerResult.bind(true)}>{trans('Yes')}</PopButton>
        </PopAction>
      </Row>
    </PopUp> : null;
  }
}