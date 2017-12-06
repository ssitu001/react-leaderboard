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
    if (sortType === 'past30Days') {
      this.fetchData(top30Url);
    }

    if (sortType === 'allTime') {
      this.fetchData(allTimeUrl)
    }
  }

  render() {
    const rows = this.state.rowsData.map((rowData, i) => {
      return <TableRow key={i} id={i+1} rowData={rowData} />
    });

    const sorters = sortByMapping.map((toSortBy, i) => {
      return <ToSortHeader key={i} sortBy={toSortBy.type} heading={toSortBy.heading} onClick={this.handleSort} />
    });

    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Camper Name</th>
              {sorters}
            </tr>
            {rows}
            </tbody>
        </table>
      </div>
    )
  }
}

export default Table;