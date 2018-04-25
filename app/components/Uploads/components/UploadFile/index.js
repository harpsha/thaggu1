import React, { Component } from 'react';
import styled from 'styled-components';
import { media } from '../../../../style/containers';
import colors from '../../../../style/colors';
import trans from '../../../../trans';
import fonts from '../../../../style/font-styles';

import Dropzone from 'react-dropzone';


const UpWrapper = styled.div`
  background:#111215;
  display:flex;
  align-content:center;
  justify-content: center;
  margin:0.5em 0 1em;
  padding: 1em 0;
  
`;

const Field = styled.div`
`;

const UploadTitle = styled.h3`
  color:${colors.fontPrimary};
  text-transform:uppercase;
  font-weight:bold;
  font-size:${fonts.bigSize};
  text-align:center;
`;
const DropzoneStyled = styled(Dropzone)`
  width: auto;
  height: auto;
  cursor:pointer;
`;
const UploadPlus = styled(UploadTitle)`
  font-size:2em;
  margin:0.5em 0;
`;

const UploadComment = styled.h4`
  font-size:${fonts.standardSize};
  color:${colors.fontPrimary};
`;


export default class UploadsPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      filePaths: []
    };

    this.handlerOnDrop = this.handlerOnDrop.bind(this);
    this.handlerOnClick = this.handlerOnClick.bind(this);

  }

  handlerOnDrop(filePaths) {
    const {onDragFilesToTorrent} = this.props;
    this.setState({filePaths})
    console.log('here 123');
    onDragFilesToTorrent(filePaths);
  }

  handlerOnClick(e){
    //e.preventDefault();
    //e.stopPropagation();
    console.log('here');
    const {onClickAddFilesToTorrent} = this.props;
    onClickAddFilesToTorrent();
  }

  render() {
    const {title = null, subtitle = null} = this.props;
    return (
      <DropzoneStyled disableClick={true} onDrop={this.handlerOnDrop}>
        <UpWrapper onClick={(e)=>this.handlerOnClick()}>
          <Field>
            {title ? <UploadTitle>{title}</UploadTitle> : null}
            <UploadPlus >+</UploadPlus>
            <UploadComment>{subtitle}</UploadComment>
          </Field>
        </UpWrapper>
      </DropzoneStyled>
    );
  }
}