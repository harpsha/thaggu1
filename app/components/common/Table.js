import React from 'react';
import styled from 'styled-components';
import colors from '../../style/colors';
import fonts from '../../style/font-styles';

const TableOver = styled.div`
    height: 300px;
    overflow-y: auto;
`;

const UTable = styled.table`
  width:100%;
  text-align:left;
  border-collapse: collapse;
  font-size:${fonts.smallSize};
  > tr {
    &:hover {
        color:${colors.fontPrimary};
      }
    &:first-child {
      &:hover {
        color:${colors.brandDarker};
      }
    }
    > th {
    padding:0.5em;
    color:${colors.brandDarker};
    border-collapse: collapse;
    border-bottom: 1px solid #b7b5b5;
    }
    > td {
    padding:0.5em;
    border-collapse: collapse;
    border-bottom: 1px solid #b7b5b5;
    }
  }
  
`;

export default class extends React.PureComponent {
  render() {
    const { ...props } = this.props;
    return <TableOver>
      <UTable {...props} />
    </TableOver>
  }
}