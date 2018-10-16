import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PickerForm from './PickerForm';
import { pickerChange, pickerSave, pickerGetBalance, pickerDelete } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';

class PickerEdit extends Component {
  state = { showModal: false };

  componentWillMount() {
    _.each(this.props.picker, (value, prop) => {
      this.props.pickerChange({ prop, value });
    });
  }

  onButtonPress() {
    const { name, image, account, owner_private, active_private, uid } = this.props.picker;

    this.props.pickerGetBalance({ account });
    this.props.pickerSave({ name, image, account, owner_private, active_private, uid });
  }

  onAccept() {
    const { uid } = this.props.picker;

    this.props.pickerDelete({ uid });
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <Card>
        <PickerForm />

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Save Changes
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
            Delete
          </Button>
        </CardSection>

        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Are you sure you want to delete this?
        </Confirm>

      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { uid, name, image, account, owner_private, active_private } = state.picker;
  const picker = { uid, name, image, account, owner_private, active_private };

  return { picker };
};

export default connect(mapStateToProps, {
  pickerChange, pickerSave, pickerGetBalance, pickerDelete
})(PickerEdit);
