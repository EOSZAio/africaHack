import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { pickerChange } from '../actions';
import { CardSection, Input } from './common';

class PickerForm extends Component {
  render() {
    return (
      <View>
        <CardSection>
          <Input
            label="Name"
            placeholder="Name"
            value={this.props.name}
            onChangeText={value => this.props.pickerChange({ prop: 'name', value })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Image"
            placeholder="http://www.example.com/image.png"
            value={this.props.image}
            onChangeText={value => this.props.pickerChange({ prop: 'image', value })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Account"
            placeholder="EOS account"
            value={this.props.account}
            onChangeText={value => this.props.pickerChange({ prop: 'account', value })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Owner key"
            placeholder="Private key : 5..."
            value={this.props.owner_private}
            onChangeText={value => this.props.pickerChange({ prop: 'owner_private', value })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Active key"
            placeholder="Private key : 5..."
            value={this.props.active_private}
            onChangeText={value => this.props.pickerChange({ prop: 'active_private', value })}
          />
        </CardSection>

      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, image, account, owner_private, active_private } = state.picker;

  return { name, image, account, owner_private, active_private };
};

export default connect(mapStateToProps, { pickerChange })(PickerForm);
