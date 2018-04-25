import React, { Component } from 'react';
import styled from 'styled-components';
import { media } from '../../../style/containers';
import colors from '../../../style/colors';
import trans from '../../../trans';
import fonts from '../../../style/font-styles';
import bigProgressBlue from '../../common/images/bigProgress-blue.svg';


const DetailsWrapper = styled.div`
  background:#111215;
  display:flex;
  margin:0.5em 0 1em;
  padding: 0em 1em;
  border:1px solid ${colors.fontSecondary};
  overflow-y:auto;
`;

const Field = styled.div`
  width:100%;
`;

const UploadTitle = styled.h3`
  color:${colors.fontPrimary};
  text-transform:uppercase;
  font-weight:bold;
  font-size:${fonts.bigSize};
  text-align:center;
`;

const Menu = styled.div`
  display:flex;
  flex-flow:row wrap;
  justify-content: space-between;
  align-items:center;
  margin:0em 0;
`;
const Nav = styled.ul`
  display:inline;
  padding:0;
  > li {
  display:inline-block;
  padding-right:1em;
  }
`;
const SeedingPrice = styled.div`
  > span {
    color:${colors.brandSecondary};
  }
`;

const MenuLink = styled.a`
  color: ${colors.fontSecondary};
  padding:1em 0;
  font-family: 'Open Sans', sans-serif;
  transition: all 0.3s;
  font-size: ${fonts.standardSize};
  &:hover, &:active, &:focus {
  color: ${colors.fontPrimary};
  }
`;

const Column = styled.div`
  display:flex;
  flex-flow:column wrap;
`;
const Row = styled.div`
  display:flex;
  flex-flow:row wrap;
  justify-content:space-between;
  align-items: flex-start;
`;
const HalfFlex = styled.div`
  display:flex;
  flex-flow:row wrap;
  flex: 0 0.45 45%;
  padding-right:0.5em;
      align-items: flex-start;
  > p {
  font-size:${fonts.smallSize};
  margin:0.5em 0;
  }
  
`;
const HalfFlexA = styled(HalfFlex)`
  flex: 0 0.65 65%;
  padding-right:0;
`;
const HalfFlexB = styled(HalfFlex)`
  flex: 0 0.35 35%;
  padding-right:0;
`;

const HalfFlexDetail = styled(HalfFlex)`
  color:${colors.fontPrimary};
`;

const SecondFlex = styled(HalfFlex)`
  flex: 0 0.3 30%;
  padding-right:0;
`;
const SubTitle = styled.h5`
  font-size:${fonts.standardSize};
  color:${colors.fontPrimary};
  margin: 0.5em 0;
  width: 100%;
`;

const ThirdFlex = styled.div`
  display:flex;
  flex-flow:row wrap;
  flex: 0 0.31 31%;
  align-items: flex-start;
  justify-content:space-between;
`;

const FullFlex = styled.div`
  display:flex;
  flex-flow:row wrap;
  flex: 0 1 100%;
  > p {
  font-size:${fonts.smallSize};
  }
`;

const ProgressField = styled.div`
  display:flex;
  flex-flow:row wrap;
  flex: 0 1 100%;
`;

const ProgressName = styled.h5`
  flex: 0 0.1 10%;
  margin: 0.5em 0;
`;

const ProgressBar = styled.img`
  flex: 0 0.85 85%;
  padding:0 0.5em;
`;

export default class Details extends Component {
  render() {
    return (
      <DetailsWrapper>
        <Field>
          <Menu>
            <Nav>
              <li><MenuLink href="#">{trans('details.GeneralInfo')}</MenuLink></li>
              <li><MenuLink href="#">{trans('details.Files')}</MenuLink></li>
              <li><MenuLink href="#">{trans('details.Peers')}</MenuLink></li>
              <li><MenuLink href="#">{trans('details.Speed')}</MenuLink></li>
            </Nav>
            <SeedingPrice>{trans('details.Price')}<span> 1000 UFR</span></SeedingPrice>
          </Menu>
          <ProgressField>
            <ProgressName>{trans('details.Uploading')}</ProgressName>
            <ProgressBar src={bigProgressBlue} />
          </ProgressField>
          <Column>
            <Row>
              <HalfFlexA>
                <SubTitle>{trans('details.Transfer')}</SubTitle>
                <ThirdFlex>
                  <HalfFlex><p>{trans('details.TimeElapsed')}</p></HalfFlex>
                  <HalfFlexDetail><p>1h 17m</p></HalfFlexDetail>
                  <HalfFlex><p>{trans('details.Uploaded')}</p></HalfFlex>
                  <HalfFlexDetail><p>1.2 Gb</p></HalfFlexDetail>
                  <HalfFlex><p>{trans('details.UploadSpeed')}</p></HalfFlex>
                  <HalfFlexDetail><p>128 kb/s</p></HalfFlexDetail>
                  <HalfFlex><p>{trans('details.ShareRatio')}</p></HalfFlex>
                  <HalfFlexDetail><p>1.3</p></HalfFlexDetail>
                </ThirdFlex>
                <ThirdFlex>
                  <HalfFlex><p>{trans('details.Remaining')}</p></HalfFlex>
                  <HalfFlexDetail><p>3h 7m</p></HalfFlexDetail>
                  <HalfFlex><p>{trans('details.Uploaded')}</p></HalfFlex>
                  <HalfFlexDetail><p>200 Mb</p></HalfFlexDetail>
                  <HalfFlex><p>{trans('details.UploadSpeed')}</p></HalfFlex>
                  <HalfFlexDetail><p>18 kb/s</p></HalfFlexDetail>
                </ThirdFlex>
                <ThirdFlex>
                  <SecondFlex><p>{trans('details.Wasted')}</p></SecondFlex>
                  <HalfFlexDetail><p>3.1 Mb</p></HalfFlexDetail>
                  <SecondFlex><p>{trans('details.Seeds')}</p></SecondFlex>
                  <HalfFlexDetail><p>3 of 4</p></HalfFlexDetail>
                  <SecondFlex><p>{trans('details.Peers')}</p></SecondFlex>
                  <HalfFlexDetail><p>1 of 12</p></HalfFlexDetail>
                </ThirdFlex>
              </HalfFlexA>
              <HalfFlexB>
                <SubTitle>{trans('details.General')}</SubTitle>
                <FullFlex>
                  <SecondFlex><p>{trans('details.Path')}</p></SecondFlex>
                  <HalfFlexDetail><p>/Users/Alex/Torrents/torrentname.mp4</p></HalfFlexDetail>
                  <SecondFlex><p>{trans('details.Size')}</p></SecondFlex>
                  <HalfFlexDetail><p>4 Gb</p></HalfFlexDetail>
                  <SecondFlex><p>{trans('details.Created')}</p></SecondFlex>
                  <HalfFlexDetail><p>12.02.2017</p></HalfFlexDetail>
                  <SecondFlex><p>{trans('details.Pieces')}</p></SecondFlex>
                  <HalfFlexDetail><p>128 Mb x 10</p></HalfFlexDetail>
                </FullFlex>
              </HalfFlexB>
            </Row>
            <Row>
              <FullFlex>
                <SubTitle>{trans('details.Description')}</SubTitle>
                <p>There is a moment in the life of any aspiring astronomer
                  that it is time to buy that first telescope.
                  It’s exciting to think about setting up your own viewing station
                  whether that is on the deck of your home or having a powerful but
                  mobile telescope set up to take to the remove countryside to really
                  get a good shot at some breath taking star gazing.
                </p>
              </FullFlex>
            </Row>
          </Column>
        </Field>
      </DetailsWrapper>
    );
  }
}