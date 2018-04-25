import styled from 'styled-components';
import { css } from 'styled-components';
import colors from '../style/colors';

export const sizes = {
  large: 1919,
  big: 1199,
  desktop: 991,
  tablet: 767,
  phone:150,
}

// iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const emSize = sizes[label]
  accumulator[label] = (...args) => css`
    @media (max-width: ${emSize}px) {
      ${css(...args)}
    }
    
  `
  return accumulator
}, {})

export const Container = styled.div`
    margin-right: auto;
    margin-left: auto;
    padding-left: 20px;
    padding-right: 20px;
    max-width: 100%;
    display:block;
    &:after, &:before  {
        content: " ";
        display: table;
    }
    &:after {
        clear: both;
    }
    ${media.big`
        width: 1180px;
        max-width: 1180px;`}
    
    ${media.desktop` 
        width: 980px;
        max-width: 100%;`}
    ${media.tablet`

        width: 760px;
        max-width: 100%;`}
   
    
  
    
`;

export const ContainerFluid = styled.div`
    margin-right: auto;
    margin-left: auto;
    padding-left: 20px;
    padding-right: 20px;
    &:after, &:before  {
        content: " ";
        display: table;
    }
    &:after {
        clear: both;
    }
    ${media.phone`
        padding:0;`}
    ${media.desktop`
        padding-left: 20px;
        padding-right: 20px;`}
    
`;

export const MainAppContainer = styled.div`
    &:after, &:before  {
        content: " ";
        display: table;
    }
    display:flex;
    position: relative;
    height: 100%;
    align-items: flex-start;
    justify-content: flex-start;

`;

export const AppContainer = styled.div`
  margin-left: 100px;
      width: 100%;
`;

export const SideMenu = styled.div`
  position:fixed;
  z-index: 999;
  left:0;
  top:0;
  width:100px;
  height:100%;
  box-shadow: 3px 0 4px 0 rgba(0, 0, 0, 0.24);
  background:${colors.sideBlack};
`;
