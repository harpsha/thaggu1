import React from 'react';
import styled from 'styled-components';
import colors from '../../style/colors';
import fonts from '../../style/font-styles';

const HintOver = styled.div`
    background-color: #171616;
    border: 1px  solid ${colors.fontSecondary};
`;

const UHint = styled.div`
  width:100%;
  text-align:left;
  font-size:${fonts.smallSize};
  padding:0.5em;
  > p {
  color:${colors.fontSecondary};
  font-size:${fonts.standardSize};
    > a {
        text-decoration:none;
        color:${colors.fontPrimary};
     }
  }
  > ul {
    > li {
      color:${colors.fontSecondary};
      font-size:${fonts.standardSize};
      list-style:circle;
      padding:0.5em 0;
      > a {
        text-decoration:none;
        color:${colors.fontPrimary};
      }
    }
  }
  
`;

export default class extends React.PureComponent {
  render() {
    const { ...props } = this.props;
    return <HintOver>
      <UHint {...props} />
    </HintOver>
  }
}