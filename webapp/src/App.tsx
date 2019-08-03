import * as React from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import Layout from './Layout'
import { Styles } from './Styles'
import styled from 'styled-components'
import { format } from 'date-fns'

const API = 'https://storage.googleapis.com/bulb-interview/meterReadingsReal.json';

const Spinner = () => (
  <Styles.StyledSpinner viewBox="0 0 50 50">
    <circle
      className="path"
      cx="25"
      cy="25"
      r="20"
      fill="none"
      strokeWidth="4"
    />
  </Styles.StyledSpinner>
);

interface Electricity {
  cumulative: number;
  readingDate: Date;
  unit: string;
}

type GraphData = Pick<Electricity, 'readingDate' | 'cumulative'>;

interface MeterReadingsData {
  electricity: Electricity[];
  graphData: GraphData[];
}

const formatDate = (date: Date) => format(date, 'MM/DD/YYYY');

const meterReadingsRows = (electricity: Electricity[]) => electricity.map(reading => (
  <Styles.TableRow data-test="tablerow" key={String(reading.readingDate)}>
    <Styles.TableCell data-test="date">{formatDate(reading.readingDate)}</Styles.TableCell>
    <Styles.TableCell data-test="cumulative">{reading.cumulative}</Styles.TableCell>
    <Styles.TableCell data-test="unit">{reading.unit}</Styles.TableCell>
  </Styles.TableRow>
));

class App extends React.Component<{}> {
  readonly state: Readonly<MeterReadingsData> = {
    electricity: [],
    graphData: []
  };

  componentDidMount() {
    this.fetchData()
  }

  fetchData = () => {
    fetch(API)
      .then(response => response.json())
      .then(data => this.setState(data, () => this.energyUsageData()));
  }

  energyUsageData = () => {
    const { electricity } = this.state;
    const graphData = electricity.reduce((all, item, index, arr) => {
      if (index < (arr.length - 2)) {
        const nextIndex = (index + 1) % arr.length;
        const nextMonth = arr[nextIndex] !== undefined ? arr[nextIndex] : arr[index];
        const currentMonth = item.cumulative;
        const energyUsage = nextMonth.cumulative - currentMonth;
        const energyUsageData = [...all, { date: formatDate(nextMonth.readingDate), energyUsage }];
        return energyUsageData;
      }
      return all;
    }, [])
    this.setState({ graphData });
  }
  render() {
    const { electricity, graphData } = this.state;
    return (
      <Layout>
        {electricity.length !== 0 ?
          (
            <>
              <Styles.DataContainer>
                <Styles.Header>Energy Usage</Styles.Header>
                <BarChart width={900} height={400} data={graphData}>
                  <XAxis dataKey="date" />
                  <YAxis dataKey="energyUsage" />
                  <CartesianGrid horizontal={false} />
                  <Tooltip />
                  <Bar dataKey="energyUsage" fill="#03ad54" isAnimationActive={false} />
                </BarChart>
              </Styles.DataContainer>

              <Styles.DataContainer>
                <Styles.Header>Meter Readings</Styles.Header>

                <Styles.Table data-test="table">
                  <tbody>
                    <Styles.TableRow>
                      <th>Date</th>
                      <th>Reading</th>
                      <th>Unit</th>
                    </Styles.TableRow>
                    {meterReadingsRows(electricity)}
                  </tbody>
                </Styles.Table>

              </Styles.DataContainer>
            </>
          )
          : <Styles.SpinnerWrapper>
            {Spinner()}
          </Styles.SpinnerWrapper>
        }
      </Layout>
    );
  }
};

export default App;
