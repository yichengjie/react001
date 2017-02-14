import React, { Component } from 'react';

const columnOpts = [
  { key: 'a', name: 'col-a' },
  { key: 'b', name: 'col-b' },
];

function SomeTable(props) {
  const { data } = props;

  return (
    <div className="some-table">
      <ul className="table-header">
        {
          columnOpts.map((opt, colIndex) => (
            <li key={`col-${colIndex}`}>{opt.name}</li>
          ))
        }
      </ul>
      <ul className="table-body">
        {
          data.map((entry, rowIndex) => (
            <li key={`row-${rowIndex}`}>
              {
                columnOpts.map((opt, colIndex) => (
                  <span key={`col-${colIndex}`}>{entry[opt.key]}</span>
                ))
              }
            </li>
          ))
        }
      </ul>
    </div>
  );
}