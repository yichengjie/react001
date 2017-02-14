import React, { PropTypes, Component } from 'react';

const propTypes = {
  name: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  th: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  td: PropTypes.oneOfType([
    PropTypes.element, PropTypes.func, PropTypes.oneOf([
      'int', 'float', 'percent', 'changeRate'
    ])
  ]),
};

const defaultProps = {
  align: 'left',
};

function Column() {
  return null;
}

Column.propTypes = propTypes;
Column.defaultProps = defaultProps;
export default Column;