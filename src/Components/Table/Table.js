import React, { Component } from 'react';

import TableRow from '../TableRow/TableRow';
import ToSortHeader from '../ToSortHeader/ToSortHeader';
import './Table.css';

const top30Url = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
const allTimeUrl = 'https://fcctop100.herokuapp.com/api/fccusers/top/alltime';
const sortByMapping = [
  {type: 'past30Days', heading: 'Points in past 30 days'},
  {type: 'allTime', heading: 'All time points'},
];

class Table extends Component {
  constructor() {
    super();

    this.state = {
      rowsData: [],
      initialRecentDataShown: true,
      allTimeDataShown: false,
      allTimeDataDesc: true,
    };
  }

  componentDidMount() {
    this.fetchData(top30Url)
  }

  fetchData(url) {
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
      this.setState({
        rowsData: data,
      });
    })
    .catch((err) => console.err('err::', err))
  }

  handleSort = (sortType) => {    
    if (sortType === 'past30Days' && this.state.allTimeDataShown) {
      this.fetchData(top30Url);
      this.setState({
        initialRecentDataShown: true,
        allTimeDataShown: false,
      });
    }

    else if (sortType === 'past30Days') {
      this.sortRowsRecentData();
    }

    else if (sortType === 'allTime' && this.state.allTimeDataShown) {
      this.sortAllTimeData();
    }

    else if (sortType === 'allTime') {
      this.fetchData(allTimeUrl);
      this.setState({
        initialRecentDataShown: false,
        allTimeDataShown: true,
      });
    }
  }

  sortRowsRecentData() {
    const { rowsData, initialRecentDataShown } = this.state;

    const sortedRecentData = initialRecentDataShown ? rowsData.sort((a, b) => a.recent - b.recent) : rowsData.sort((a, b) => b.recent - a.recent);

    this.setState({
      rowsData: sortedRecentData,
      initialRecentDataShown: !this.state.initialRecentDataShown,
    });
  }

  sortAllTimeData() {
    const { rowsData, allTimeDataDesc } = this.state;

    const sortedAllTimeData = allTimeDataDesc ? rowsData.sort((a, b) => a.alltime - b.alltime) : rowsData.sort((a, b) => b.alltime - a.alltime);

    this.setState({
      rowsData: sortedAllTimeData,
      allTimeDataDesc: !this.state.allTimeDataDesc,
    });
  }

  render() {
    const rows = this.state.rowsData.map((rowData, i) => {
      return <TableRow key={i} id={i+1} rowData={rowData} />
    });

    const sorters = sortByMapping.map((toSortBy, i) => {
      return <ToSortHeader key={i} sortBy={toSortBy.type} heading={toSortBy.heading} onClick={this.handleSort} />
    });

    return (
      <table>
        <tbody>
          <tr>
            <th scope="col">#Rank</th>
            <th scope="col">Username</th>
            {sorters}
          </tr>
          {rows}
          </tbody>
      </table>
    )
  }
}

export default Table;