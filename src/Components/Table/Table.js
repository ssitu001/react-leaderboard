import React, { Component } from 'react';

import TableRow from '../TableRow/TableRow';
import './Table.css';

class Table extends Component {
  constructor() {
    super();

    this.state = {
      rowsData: [],
      sortByLeast: false,
    };
  }

  componentDidMount() {
    const top30Url = 'https://fcctop100.herokuapp.com/api/fccusers/top/recent';
    this.fetchData(top30Url)
  }

  fetchData(url) {
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
      this.setState({
        rowsData: data,
      });
      console.log('data', data);
    })
    .catch((err) => console.err('err::', err))
  }

  componentDidUpdate() {
    console.log(this.state)
  }

  sortPast30Days = (evt) => {
    evt.preventDefault();
    const {rowsData, sortByLeast} = this.state;

    const sortedData = !sortByLeast ? rowsData.sort((a, b) => a.recent - b.recent) : rowsData.sort((a, b) => b.recent - a.recent);

    this.setState({
      rowsData: sortedData,
      sortByLeast: !this.state.sortByLeast,
    });
  }

  render() {
    let rows = this.state.rowsData.map((rowData, i) => {
      return <TableRow id={i+1} rowData={rowData} key={i}/>
    });

    return (
      <div>
        <table>
          <tbody>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Camper Name</th>
              <th scope="col" onClick={this.sortPast30Days}>Points in past 30 days</th>
              <th scope="col">All time points</th>
            </tr>
            {rows}
            </tbody>
        </table>
      </div>
    )
  }
}

export default Table;