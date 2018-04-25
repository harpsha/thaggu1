/**
 * Created by maximnord on 2/8/18.
 */


// @flow
import React, { Component } from 'react';


export default class AppScreen extends Component<Props> {

  constructor(props) {
    super(props);
    this.state = {
      uri: '',
      torrent: '',
      torrentFile: '',
      ware: null
    };
  }

  componentWillMount(){

  }

  render() {
    return <div style={{border: "1px solid red", padding: "50px"}}>
        <div>

        </div>


      {this.props.children}
    </div>;
  }
}
