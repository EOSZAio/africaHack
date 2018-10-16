import React, { Component } from 'react';
import { connect } from 'react-redux';
import { pickerChange, pickerCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import PickerForm from './PickerForm';

class PickerCreate extends Component {
  onButtonPress() {
    const { name, image, account, owner_private, active_private } = this.props;

    this.props.pickerCreate({ name, image, account, owner_private, active_private });
  }

  render() {
    return (
      <Card>
        <PickerForm {...this.props} />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Create
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, image, account, owner_private, active_private } = state.picker;

  return { name, image, account, owner_private, active_private };
};

export default connect(mapStateToProps, {
  pickerChange, pickerCreate
})(PickerCreate);
