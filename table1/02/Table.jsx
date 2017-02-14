const getDisplayName = (el) => {
  return el && el.type && (el.type.displayName || el.type.name);
};

const renderChangeRate = (changeRate) => {
     //... 
};

const renderThs = (columns) => {
  return columns.map((col, index) => {
    const { name, dataKey, th } = col.props;
    const props = { name, dataKey, colIndex: index };
    let content;
    let className;

    if (React.isValidElement(th)) {
      content = React.cloneElement(th, props);
      className = getDisplayName(th);
    } else if (_.isFunction(th)) {
      content = th(props);
    } else {
      content = name || '';
    }

    return (
      <th
        key={`th-${index}`}
        style={getStyle(col.props)}
        className={`table-th col-${index} col-${dataKey} ${className || ''}`}
      >
        {content}
      </th>
    );
  });
};

const renderTds = (data, entry, columns, rowIndex) => {
  return columns.map((col, index) => {
    const { dataKey, td } = col.props;
    const value = getValueOfTd(entry, dataKey);
    const props = { data, rowData: entry, tdValue: value, dataKey, rowIndex, colIndex: index };

    let content;
    let className;
    if (React.isValidElement(td)) {
      content = React.cloneElement(td, props);
      className = getDisplayName(td);
    } else if (td === 'changeRate') {
      content = renderChangeRate(value || '');
    } else if (_.isFunction(td)) {
      content = td(props);
    } else {
      content = formatIndex(parseValueOfTd(value), dataKey, td);
    }
    return (
      <td
        key={`td-${index}`}
        style={getStyle(col.props)}
        className={`table-td col-${index} col-${dataKey} ${className || ''}`}
      >
        {content}
      </td>
    );
  });
};

const renderRows = (data, columns) => {
  if (!data || !data.length) {return null;}

  return data.map((entry, index) => {
    return (
      <tr className="table-tbody-tr" key={`tr-${index}`}>
        {renderTds(data, entry, columns, index)}
      </tr>
    );
  });
};

function Table(props) {
  const { children, data, className } = props;
  const columns = findChildrenByType(children, Column);

  return (
    <div className={`table-container ${className || ''}`}>
      <table className="base-table">
        {hasNames(columns) && (
          <thead>
            <tr className="table-thead-tr">
              {renderThs(columns)}
            </tr>
          </thead>
        )}
        <tbody>{renderRows(data, columns)}</tbody>
      </table>
    </div>
  );
}