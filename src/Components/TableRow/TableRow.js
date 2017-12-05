import React from 'react';

import './TableRow.css';

const TableRow = (props) => {
  const {alltime, img, lastUpdate, recent, username} = props.rowData;
  const fccURL = `www.freecodecamp.com/${username}`;

  return (
    <tr>
      <td>{props.id}</td>
      <td align="left">
        <a href={fccURL} target="_blank" >
          <img className="camper-image" src={img} alt="no img"></img>
          <span className="camper-name">{username}</span>
        </a>
      </td>
      <td>{recent}</td>
      <td>{alltime}</td>
    </tr>
  )
}

export default TableRow;
