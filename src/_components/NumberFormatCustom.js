import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

class NumberFormatCustom extends React.Component {
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
        format="+## # ## ## ## ##"
      />
    );
  }
}

NumberFormatCustom.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export {NumberFormatCustom}
