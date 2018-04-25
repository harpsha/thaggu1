import React, { Component } from 'react';
import styled from 'styled-components';
import colors from '../../../style/colors';
import trans from "../../../trans";

import {client} from '../../../utils/torrent';

const ProgressImage = styled.div`
   text-align: center;
   position: relative;
   display: inline-block;
   > p {
    color: ${colors.fontSecondary};
    font-size: 0.7em;
    margin: 0;
    margin-top: -5px;
    font-weight:200;
   }
   > span {
    color: ${colors.fontPrimary};
    font-size: 0.9em;
    position: absolute;
    top: 2.1em;
    left: 1.8em;
    font-weight:600;
   }
   > svg {
       margin: 0 auto;
       > circle {
         fill: transparent;
         transform: rotate(140deg); // to fix Firefox
    }
   }
`;

export default class UploadSpeedProgress extends React.PureComponent {

  constructor(props){
    super(props);
    this.state = {
      uploadSpeed: 1500,
    };
  }

  componentWillMount(){
    setInterval(()=>{
      this.setState({
        uploadSpeed: client.downloadSpeed,
        downloadSpeed: client.uploadSpeed
      });
    }, 1000);
  }

  render() {
    const {uploadSpeed} = this.state;
    return (
      <ProgressImage>
        <svg height="5em" width="5em">
          <circle
            stroke="#DB2027"
            strokeWidth="3px"
            r="2em"
            cx="0em"
            cy="-4em"
            fill="transparent"
            strokeDasharray="21.00em"
            strokeDashoffset="15em"
          >
          </circle>
        </svg>
        <span>{uploadSpeed} <br />
          mb/s</span>
        <p>{trans('details.UploadSpeed')}</p>
  </ProgressImage>
  )
  }
}



