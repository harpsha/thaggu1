import React, { Component } from 'react';
import styled from 'styled-components';
import colors from '../../../style/colors';
import fonts from '../../../style/font-styles';
import trans from "../../../trans";

const ProgressImage = styled.div`
   text-align: center;
   position: relative;
   display: block;
   > p {
    color: ${colors.fontPrimary};
    font-size: ${fonts.standardSize};
    margin: 0;
    margin-top: -5px;
    top: 50%;
    left: 0;
    position:absolute;
    width: 100%;
    font-weight: 600;
   }
   > span {
    color: ${colors.fontSecondary};
    font-size: ${fonts.smallSize};
    top: 35%;
    left: 0;
    position:absolute;
    width: 100%;
    font-weight: 600;
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

export default class CircleFilesGraph extends React.PureComponent {
  render() {
    return (
      <ProgressImage>
        <svg height="10em" width="10em">
          <circle
            stroke="#20C3DB"
            strokeWidth="5px"
            r="4em"
            cx="5em"
            cy="5em"
            fill="transparent"
            strokeDasharray="0"
            strokeDashoffset="0"
          />
          <circle
            stroke="#e95547"
            strokeWidth="5px"
            r="4em"
            cx="5em"
            cy="5em"
            fill="transparent"
            strokeDasharray="5em"
            strokeDashoffset="0"
          />
          <circle
            stroke="#484848"
            strokeWidth="5px"
            r="4em"
            cx="5em"
            cy="5em"
            fill="transparent"
            strokeDasharray="10em"
            strokeDashoffset="0"
          />
        </svg>
        <span>{trans('wallet.graphs.TotalSize')}</span>
        <p>12 GB</p>
      </ProgressImage>
    )
  }
}



