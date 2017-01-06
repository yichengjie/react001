export const generateSwitch = (name, options) => {
  const propTypes = {
    className: PropTypes.string,
    activeKey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onChange: PropTypes.func.isRequired,
  };

  const Switch = (props) => {
    //...
    return (
      <span className={classes}>
        {
          options.map((entry, index) => (
            //...
          ))
        }
      </span>
    );
  };

  Switch.propTypes = propTypes;
  Switch.displayName = name;

  return Switch;
};


export const ASwitch = generateSwitch('ABSwitch', [
  { name: 'AA', key: 'a' },
  { name: 'BB', key: 'b' },
]);

export const BSwitch = generateSwitch('CDSwitch', [
  { name: 'CC', key: 'c' },
  { name: 'DD', key: 'd' },
]);
