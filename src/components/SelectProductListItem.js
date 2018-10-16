import React, { Component } from 'react';
import {Image, Text, TouchableWithoutFeedback, View} from 'react-native';
import { connect } from 'react-redux';
import {transactionChange} from "../actions";
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';

class SelectProductListItem extends Component {
  onRowPress() {
    this.props.transactionChange({ prop: 'product_uid', value: this.props.product.uid });
    this.props.transactionChange({ prop: 'product_name', value: this.props.product.name });
    this.props.transactionChange({ prop: 'product_image', value: this.props.product.image });
    this.props.transactionChange({ prop: 'product_price', value: this.props.product.price });
    Actions.transactionForm({ product: this.props.product });
  }

  render() {
    const { name, image } = this.props.product;
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

export default connect(null, { transactionChange })(SelectProductListItem);
