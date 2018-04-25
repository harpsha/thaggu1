import React, { Component } from 'react';
import styled from 'styled-components';
//import AmCharts from 'amcharts3';
var AmCharts = require('amcharts3/amcharts/amcharts');

import { Container, ContainerFluid, media } from '../../../style/containers';
import colors from '../../../style/colors';
import fonts from '../../../style/font-styles';
import trans from '../../../trans';
import CircleFilesGraph from '../../common/graphs/circleFiles';
import CircleTokensGraph from '../../common/graphs/circleTokens';

const Subtitle = styled.h4`
  font-size:${fonts.mediumSize};
  color:${colors.fontThird};
  font-weight:300;
`;

const GraphsSection = styled.div`
  display:flex;
  flex-flow:row wrap;
  flex:1;
  justify-content:space-between;
  padding:0;
`;

const CircleGraphs = styled.div`
  display:flex;
  flex-flow:column wrap;
  flex:0.34;
`;

const OneGraph = styled.div`
  display:flex;
  flex-flow:column wrap;
  margin:0.5em 0;
  border:1px solid ${colors.fontSecondary};
  border-radius:0.5em;
  padding:0.5em 1em;
    > h4 {
      margin:0.5em 0;
    }
`;

const StatisticGraph = styled.div`
  display:flex;
  flex-flow:column wrap;
  flex:0.64;
  border:1px solid ${colors.fontSecondary};
  border-radius:0.5em;
  padding:0.5em 1em;
  margin:0.5em 0;
    > h4 {
      margin:0.5em 0;
    }
`;

const GraphInfo = styled.div`
  display:flex;
  flex-flow:row wrap;
`;
const GraphLegend = styled.div`
  display:flex;
  flex-flow: column wrap;
  justify-content: center;
`;
const LegendRow = styled.div`
  display:flex;
  flex-flow:row wrap;
  margin:0.5em;
  align-items:center;
`;
const BlueSquare = styled.div`
  width:12px;
  height:12px;
  background-color:${colors.brandSecondary};
  margin-right:0.5em;
`;
const RedSquare = styled(BlueSquare)`
  background-color:${colors.brandPrimary};
`;
const GraySquare = styled(BlueSquare)`
  background-color:${colors.fontSecondary};
`;


const HRline = styled.hr`
  border:0;
  border-bottom:1px solid ${colors.fontSecondary};
  width:100%;
`;
const StatisticTotals = styled.div`
  display:flex;
  flex-flow:row wrap;
  align-items:center;
  justify-content:space-between;
  margin:0.5em 0;
`;
const TotalOne = styled.div`
  display:flex;
  flex-flow:row wrap;
  align-items:center;
  justify-content:space-between;
  flex:0 0.3 30%;
`;

const Sign = styled.div`
  font-size:${fonts.standardSize};
  color:${colors.fontSecondary};
  text-transform:uppercase;
  font-weight:300;
`;
const TotalValue = styled.div`
  
`;

const Value = styled.span`
  font-size:${fonts.middleSize};
  color:${colors.fontPrimary};
`;
const Status = styled.span`
  font-size:${fonts.smallSize};
  color:${colors.brandSecondary};
`;

//import AmCharts from '@amcharts/amcharts3-react';


//var AmCharts = require("@amcharts/amcharts3-react");

export default class WalletGraphs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      canRenderCharts: false,
      AmChartsObj: null
    };

  }

  componentWillMount() {
    Promise.all([
    import
    ('amcharts3/amcharts/serial'),
    import
    ('amcharts3/amcharts/themes/black')
  ]).
    then(()=> {
      this.setState({canRenderCharts: true});
      var AmCharts = require("@amcharts/amcharts3-react");
      this.setState({AmChartsObj: AmCharts});
    });
  }

  render() {
    const config = {
      'type': 'serial',
      'theme': 'black',
      'marginTop':0,
      'marginRight': 80,
      'dataProvider': [{
        'year': '1950',
        'value': -0.307
      }, {
        'year': '1951',
        'value': -0.168
      }, {
        'year': '1952',
        'value': -0.073
      }, {
        'year': '1953',
        'value': -0.027
      }, {
        'year': '1954',
        'value': -0.251
      }, {
        'year': '1955',
        'value': -0.281
      }, {
        'year': '1956',
        'value': -0.348
      }, {
        'year': '1957',
        'value': -0.074
      }, {
        'year': '1958',
        'value': -0.011
      }, {
        'year': '1959',
        'value': -0.074
      }, {
        'year': '1960',
        'value': -0.124
      }, {
        'year': '1961',
        'value': -0.024
      }, {
        'year': '1962',
        'value': -0.022
      }, {
        'year': '1963',
        'value': 0
      }, {
        'year': '1964',
        'value': -0.296
      }, {
        'year': '1965',
        'value': -0.217
      }, {
        'year': '1966',
        'value': -0.147
      }, {
        'year': '1967',
        'value': -0.15
      }, {
        'year': '1968',
        'value': -0.16
      }, {
        'year': '1969',
        'value': -0.011
      }, {
        'year': '1970',
        'value': -0.068
      }, {
        'year': '1971',
        'value': -0.19
      }, {
        'year': '1972',
        'value': -0.056
      }, {
        'year': '1973',
        'value': 0.077
      }, {
        'year': '1974',
        'value': -0.213
      }, {
        'year': '1975',
        'value': -0.17
      }, {
        'year': '1976',
        'value': -0.254
      }, {
        'year': '1977',
        'value': 0.019
      }, {
        'year': '1978',
        'value': -0.063
      }, {
        'year': '1979',
        'value': 0.05
      }, {
        'year': '1980',
        'value': 0.077
      }, {
        'year': '1981',
        'value': 0.12
      }, {
        'year': '1982',
        'value': 0.011
      }, {
        'year': '1983',
        'value': 0.177
      }, {
        'year': '1984',
        'value': -0.021
      }, {
        'year': '1985',
        'value': -0.037
      }, {
        'year': '1986',
        'value': 0.03
      }, {
        'year': '1987',
        'value': 0.179
      }, {
        'year': '1988',
        'value': 0.18
      }, {
        'year': '1989',
        'value': 0.104
      }, {
        'year': '1990',
        'value': 0.255
      }, {
        'year': '1991',
        'value': 0.21
      }, {
        'year': '1992',
        'value': 0.065
      }, {
        'year': '1993',
        'value': 0.11
      }, {
        'year': '1994',
        'value': 0.172
      }, {
        'year': '1995',
        'value': 0.269
      }, {
        'year': '1996',
        'value': 0.141
      }, {
        'year': '1997',
        'value': 0.353
      }, {
        'year': '1998',
        'value': 0.548
      }, {
        'year': '1999',
        'value': 0.298
      }, {
        'year': '2000',
        'value': 0.267
      }, {
        'year': '2001',
        'value': 0.411
      }, {
        'year': '2002',
        'value': 0.462
      }, {
        'year': '2003',
        'value': 0.47
      }, {
        'year': '2004',
        'value': 0.445
      }, {
        'year': '2005',
        'value': 0.47
      }],
      'valueAxes': [{
        'axisAlpha': 0,
        'position': 'left'
      }],
      'graphs': [{
        'id':'g1',
        'balloonText': '[[category]]<br><b><span style="font-size:14px;">[[value]]</span></b>',
        'bullet': 'round',
        'bulletSize': 8,
        'lineColor': '#0FC9E3',
        'lineThickness': 2,
        'negativeLineColor': '#EF674C',
        'type': 'smoothedLine',
        'valueField': 'value'
      }],
      // 'chartScrollbar': {
      //   'graph':'g1',
      //   'gridAlpha':0,
      //   'color':'#888888',
      //   'scrollbarHeight':55,
      //   'backgroundAlpha':0,
      //   'selectedBackgroundAlpha':0.1,
      //   'selectedBackgroundColor':'#888888',
      //   'graphFillAlpha':0,
      //   'autoGridCount':true,
      //   'selectedGraphFillAlpha':0,
      //   'graphLineAlpha':0.2,
      //   'graphLineColor':'#c2c2c2',
      //   'selectedGraphLineColor':'#888888',
      //   'selectedGraphLineAlpha':1
      //
      // },
      'chartCursor': {
        'categoryBalloonDateFormat': 'YYYY',
        'cursorAlpha': 0,
        'valueLineEnabled':true,
        'valueLineBalloonEnabled':true,
        'valueLineAlpha':0.5,
        'fullWidth':true
      },
      'dataDateFormat': 'YYYY',
      'categoryField': 'year',
      'categoryAxis': {
        'minPeriod': 'YYYY',
        'parseDates': true,
        'minorGridAlpha': 0.1,
        'minorGridEnabled': true
      },
      'export': {
        'enabled': false
      }
    };
    let Chart = null;
    const {AmChartsObj} = this.state;
    if (AmChartsObj) {
      Chart = <AmChartsObj.React

        style={{
          width: "100%",
          height: "320px"
        }}
        options={config}
         />
    }

    return (
      <GraphsSection>
          <CircleGraphs>
            <OneGraph>
              <Subtitle>{trans('wallet.titles.TokensBalance')}</Subtitle>
              <HRline />
              <GraphInfo>
                <CircleTokensGraph />
                <GraphLegend>
                  <LegendRow>
                    <BlueSquare></BlueSquare>
                    <span>{trans('wallet.graphs.Received')}</span>
                  </LegendRow>
                  <LegendRow>
                    <RedSquare></RedSquare>
                    <span>{trans('wallet.graphs.Paid')}</span>
                  </LegendRow>
                  <LegendRow>
                    <GraySquare></GraySquare>
                    <span>{trans('wallet.graphs.Expected')}</span>
                  </LegendRow>
                </GraphLegend>
              </GraphInfo>
            </OneGraph>
            <OneGraph>
              <Subtitle>{trans('wallet.titles.FilesFlow')}</Subtitle>
              <HRline />
              <GraphInfo>
                <CircleFilesGraph />
                <GraphLegend>
                  <LegendRow>
                    <BlueSquare></BlueSquare>
                    <span>{trans('wallet.graphs.Uploaded')}</span>
                  </LegendRow>
                  <LegendRow>
                    <RedSquare></RedSquare>
                    <span>{trans('wallet.graphs.Downloaded')}</span>
                  </LegendRow>
                  <LegendRow>
                    <GraySquare></GraySquare>
                    <span>{trans('wallet.graphs.Seeded')}</span>
                  </LegendRow>
                </GraphLegend>
              </GraphInfo>
            </OneGraph>
          </CircleGraphs>
          <StatisticGraph>
            <Subtitle>{trans('wallet.titles.WalletStatistic')}</Subtitle>
            {Chart}
            {/*<AmCharts {...config} />*/}
            <StatisticTotals>
              <TotalOne>
                <Sign>{trans('wallet.total.Current.balance')}</Sign>
                <TotalValue>
                  <Value>207.03</Value>
                  <Status>+ 12%</Status>
                </TotalValue>
              </TotalOne>
              <TotalOne>
                <Sign>{trans('wallet.total.Total.Received')}</Sign>
                <TotalValue>
                  <Value>207.03</Value>
                  <Status>+ 12%</Status>
                </TotalValue>
              </TotalOne>
              <TotalOne>
                <Sign>{trans('wallet.total.Total.Paid')}</Sign>
                <TotalValue>
                  <Value>207.03</Value>
                  <Status>+ 12%</Status>
                </TotalValue>
              </TotalOne>
            </StatisticTotals>
          </StatisticGraph>
        </GraphsSection>
    );
  }
}
