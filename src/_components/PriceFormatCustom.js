import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

class PriceFormatCustom extends React.Component {
  render() {
    return (
      <NumberFormat
        {...this.props}
        onValueChange={values => {
          this.props.onChange({
            target: {
              value: values.value,
            },
          });
        }}
      />
    );
  }
}

PriceFormatCustom.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export { PriceFormatCustom }
