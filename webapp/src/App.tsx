import * as React from 'react';
import { BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import Layout from './Layout'
import { Styles } from './Styles'
import { format } from 'date-fns'
import { isEndOfMonth, getDiffInDays } from './Utils'
import * as moment from 'moment'
import { uniqBy } from 'lodash'

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
  fullMonthCheck: Electricity[];
}

const formatDate = (date: Date) => format(date, 'DD/MM/YYYY');

class App extends React.Component<{}> {
  readonly state: Readonly<MeterReadingsData> = {
    electricity: [],
    graphData: [],
    fullMonthCheck: []
  };

  componentDidMount() {
    this.fetchData()
  }

  fetchData = () => {
    fetch(API)
      .then(response => response.json())
      .then(data => this.setState(data, () => this.energyUsageData()));
  }

  getNextMonth = (array: Electricity[], index: number) => {
    const nextIndex = (index + 1) % array.length
    const nextMonth = array[nextIndex] !== undefined ? array[nextIndex] : array[index];
    return nextMonth;
  }

  getPreviousMonth = (array: Electricity[], index: number) => {
    const previousIndex = (index - 1) % array.length
    const previousMonth = array[previousIndex] !== undefined ? array[previousIndex] : array[index];
    return previousMonth;
  }

  getCompleteMonths = (current: Electricity, nextMonth: Electricity): Electricity[] => {
    if (isEndOfMonth(current.readingDate)) {
      const isValidMonth = getDiffInDays(moment(nextMonth.readingDate), moment(current.readingDate))
      const minimumMonthDays = 28;
      if (isValidMonth > minimumMonthDays) { //  Check whether a moment object is the end of the month, then take those who are and trying to find if they are a month next to each other
        const acc = [];
        const energyUsage = (nextMonth.cumulative - current.cumulative).toFixed(2);
        return [...acc, { date: formatDate(current.readingDate), energyUsage }];
      }
    }
  }

  monthlyEstimate = (nextMonth: Electricity, previousMonth: Electricity, current: Electricity) => {
    const monthUsage = nextMonth.cumulative - previousMonth.cumulative;
    const periodInDays = getDiffInDays(moment(nextMonth.readingDate), moment(previousMonth.readingDate))
    const averageDailyUsageCurrentMonth = monthUsage / periodInDays;
    const getDaysInMonth = moment(current.readingDate).daysInMonth()
    const monthlyEstimate = (getDaysInMonth * averageDailyUsageCurrentMonth).toFixed(2);
    return monthlyEstimate;
  }

  energyUsageData = () => {
    const { electricity } = this.state;
    const graphData = electricity.reduce((all, current, index, arr) => {
      const previousMonth = this.getPreviousMonth(arr, index);
      const nextMonth = this.getNextMonth(arr, index);

      const isStartMonth = moment(previousMonth.readingDate).isSame(current.readingDate)
      const isEndMonth = moment(nextMonth.readingDate).isSame(current.readingDate)
      if (!isStartMonth && !isEndMonth) {
        const fullMonthsReading = this.getCompleteMonths(current, nextMonth)
        const fullMonthCheck = fullMonthsReading !== undefined ? fullMonthsReading : [];

        const readingList = [...all, ...fullMonthCheck, { date: formatDate(current.readingDate), energyUsage: this.monthlyEstimate(nextMonth, previousMonth, current) }]
        const monthlyElectricityUsage = uniqBy(readingList, 'date')
        return monthlyElectricityUsage;
      }
      return all
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
                <Styles.Header>Estimated monthly energy usage</Styles.Header>
                <BarChart width={900} height={400} data={graphData}>
                  <XAxis dataKey="date" />
                  <YAxis dataKey="energyUsage" />
                  <CartesianGrid horizontal={false} />
                  <Tooltip />
                  <Bar dataKey="energyUsage" fill="#03ad54" isAnimationActive={false} />
                </BarChart>
              </Styles.DataContainer>
            </>
          )
          : <Styles.SpinnerWrapper>
            <Spinner />
          </Styles.SpinnerWrapper>
        }
      </Layout>
    );
  }
};

export default App;
