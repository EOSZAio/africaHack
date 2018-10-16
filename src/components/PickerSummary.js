import _ from 'lodash';
import React, { Component } from 'react';
import {Image, Text, TouchableWithoutFeedback, View} from 'react-native';
import { connect } from 'react-redux';
import { pickerChange, transactionChange, pickerGetBalance } from '../actions';
import { Card, CardSection, Button } from './common';
import {Actions} from "react-native-router-flux";

class PickerSummary extends Component {

  onTransactionPress() {
    this.props.transactionChange({ prop: 'picker_uid', value: this.props.picker.uid });
    this.props.transactionChange({ prop: 'picker_name', value: this.props.picker.name });
    this.props.transactionChange({ prop: 'picker_image', value: this.props.picker.image });
    this.props.transactionChange({ prop: 'picker_account', value: this.props.picker.account });
    Actions.selectProductList();
  }

  onEditPress() {
    Actions.pickerEdit({ picker: this.props.picker });
  }

  render() {
    const { name, image, account, balance } = this.props.picker;
    const  {
      thumbnailContainerStyle,
      thumbnailStyle,
      conentStyle,
      titleStyle
    } = styles;

    return (
      <Card>
        <CardSection>
          <View style={thumbnailContainerStyle}>
            <Image
              style={thumbnailStyle}
              source={{ uri: image }}
            />
          </View>
          <View style={conentStyle}>
            <Text style={titleStyle}>{name}</Text>
            <Text style={titleStyle}>{(balance ? balance : '$0.00')}</Text>
          </View>
        </CardSection>

        <CardSection>
          <Button onPress={this.onTransactionPress.bind(this)}>
            Sell
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={this.onEditPress.bind(this)}>
            Profile
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const styles = {
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignContent: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  thumbnailStyle: {
    height: 100,
    width: 100,
    borderRadius: 5
  },
  conentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  titleStyle: {
    fontSize: 18,
    paddingLeft: 5
  }
};

const mapStateToProps = (state) => {
  const { uid, name, image, account, owner_private, active_private, balance } = state.picker;
  const picker = { uid, name, image, account, owner_private, active_private, balance };

  return { picker };
};

export default connect(mapStateToProps, { pickerChange, transactionChange, pickerGetBalance })(PickerSummary);
