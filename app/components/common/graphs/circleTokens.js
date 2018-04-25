import React, { Component } from 'react';
import styled from 'styled-components';
import colors from '../../../style/colors';
import fonts from '../../../style/font-styles';
import trans from "../../../trans";

const ProgressImage = styled.div`
   text-align: center;
   position: relative;
   display: block;
   > span {
    color: ${colors.brandSecondary};
    font-size: ${fonts.standardSize};
    top: 45%;
    left: 0;
    position: absolute;
    width: 100%;
    font-weight: 300;
   }
   > svg {
       
      overflow: visible;
      transform-origin: 0;
      display: block;
       > circle {
         fill: transparent;
         
    }
   }
`;

export default class CircleTokensGraph extends React.PureComponent {
  render() {
    return (
      <ProgressImage>
        <svg height="10em" width="10em">
          <circle
            stroke="#484848"
            strokeWidth="5px"
            r="4em"
            cx="5em"
            cy="5em"
            fill="transparent"
            strokeDasharray="0"
            strokeDashoffset="0"
          />
          <circle
            stroke="#20C3DB"
            strokeWidth="5px"
            r="4em"
            cx="5em"
            cy="5em"
            fill="transparent"
            strokeDasharray="90%"
            strokeDashoffset="190%"
          />
          <circle
            stroke="#e95547"
            strokeWidth="5px"
            r="4em"
            cx="5em"
            cy="5em"
            fill="transparent"
            strokeDasharray="100%"
            strokeDashoffset="100%"
          />
        </svg>
        <span>+16 UFR</span>
      </ProgressImage>
    )
  }
}



