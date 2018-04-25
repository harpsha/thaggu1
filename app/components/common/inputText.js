import React from 'react';
import styled from 'styled-components';
import colors from '../../style/colors';
import fonts from '../../style/font-styles';


const UInput = styled.input`
  padding:0.5em;
  background-color:transparent;
  border: 1px solid ${colors.fontSecondary};
  font-size:${fonts.standardSize};
  color:${colors.fontPrimary};
  width:100%;
  &:focus {
    outline-color: ${colors.brandSecondary} !important;
  }
`;

const InputFix = styled.div`
  position: relative;
  max-width: 100%;
  display: flex;
`;


export default class extends React.PureComponent {
  render() {
    const { ...props } = this.props;
    return <InputFix>
      <UInput type="text" {...props} />

    </InputFix>
  }
}