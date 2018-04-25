import React from 'react';
import styled from 'styled-components';
import colors from '../../../style/colors';
import fonts from '../../../style/font-styles';


const PopUpOver = styled.div`
    position: fixed;
    background-color: rgba(0,0,0,0.5);
    z-index: 998;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    display: flex;
    flex-flow: column wrap;
    align-items: center;
    justify-content: center;
`;
const PopUp = styled.div`
  background-color:#fff;
  position:relative;
  z-index:998;
  padding: 1em 1.5em 3em;
  width:400px;
  height:430px;
  background-color: #1e1e1e;
  box-shadow: 0 0 10px 4px rgba(0, 0, 0, 0.5);
`;


export default class extends React.PureComponent {
  render() {
    const { ...props } = this.props;
    return <PopUpOver>
      <PopUp {...props} />
    </PopUpOver>
  }
}