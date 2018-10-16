import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View, Image } from 'react-native';

import { connect } from 'react-redux';
import { pickerChange, settingsFetch, pickerGetBalance } from '../actions';

import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';
import _ from "lodash";

class PickerListItem extends Component {
  onRowPress() {
    _.each(this.props.picker, (value, prop) => {
      this.props.pickerChange({ prop, value });
    });

    this.props.settingsFetch();
    this.props.pickerGetBalance({ account: this.props.picker.account });

    Actions.pickerSummary({ picker: this.props.picker });
  }

  render() {
    const { name, image } = this.props.picker;
    const  {
      thumbnailContainerStyle,
      thumbnailStyle,
      conentStyle,
      titleStyle
    } = styles;

    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          <CardSection>
            <View style={thumbnailContainerStyle}>
              <Image
                style={thumbnailStyle}
                source={{ uri: image }}
              />
            </View>
            <View style={conentStyle}>
              <Text style={titleStyle}>{name}</Text>
            </View>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
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

export default connect(null, { pickerChange, settingsFetch, pickerGetBalance })(PickerListItem);
