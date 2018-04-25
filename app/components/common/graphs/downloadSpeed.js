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

export default class DownloadSpeedProgress extends React.PureComponent {
  constructor(props){
    super(props);
    this.state = {
      downloadSpeed: 1000
    };
  }

  componentWillMount(){
    setInterval(()=>{
      this.setState({
        downloadSpeed: client.downloadSpeed
      });
    }, 1000);
  }

  render() {
    const {downloadSpeed} = this.state;

    return (
      <ProgressImage>
        <svg height="5em" width="5em">
          <circle
            stroke="#20C3DB"
            strokeWidth="3px"
            r="2em"
            cx="0em"
            cy="-4em"
            fill="transparent"
            strokeDasharray="24.00em"
            strokeDashoffset="15em"
          >
          </circle>
        </svg>
        <span>{downloadSpeed}<br />
          mb/s</span>
        <p>{trans('details.DownloadSpeed')}</p>
      </ProgressImage>
    )
  }
}



