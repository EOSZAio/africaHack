import React, { Component } from 'react';
import {Image, Text, View} from 'react-native';
import { connect } from 'react-redux';
import {transactionChange} from '../actions';
import {Button, Card, CardSection, Input} from "./common";
import {Actions} from "react-native-router-flux";
import _ from "lodash";

class TransactionForm extends Component {

  componentWillMount() {
    _.each(this.props.transaction, (value, prop) => {
      this.props.pickerChange({ prop, value });
    });

//    console.log('=====> TransactionForm.componentWillMount', this.props);
  }

  onContinuePress() {
    const { quantity, product_price } = this.props;
    const product_value = (quantity && product_price ? quantity * product_price : 0.00).toFixed(2);

    this.props.transactionChange({ prop: 'quantity', value: quantity });
    this.props.transactionChange({ prop: 'product_value', value: product_value });

//    console.log('=====> TransactionForm.onContinuePress', this.props);

    Actions.skipList();
  }

  render() {
    const { picker_name, picker_image, product_name, product_image, quantity, product_price } = this.props;
    const product_value = (quantity && product_price ? quantity * product_price : 0.00).toFixed(2);
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
              source={{ uri: picker_image }}
            />
          </View>
          <View style={conentStyle}>
            <Text style={titleStyle}>{picker_name}</Text>
          </View>
        </CardSection>

        <CardSection>
          <View style={thumbnailContainerStyle}>
            <Image
              style={thumbnailStyle}
              source={{ uri: product_image }}
            />
          </View>
          <View style={conentStyle}>
            <Text style={titleStyle}>{product_name}</Text>
          </View>
        </CardSection>

        <CardSection>
          <Input
            label="Weight"
            placeholder="0.00 kg"
            value={quantity}
            onChangeText={value => this.props.transactionChange({ prop: 'quantity', value })}
          />
        </CardSection>

        <CardSection>
          <Text style={styles.titleStyle}>
            ${product_value}
          </Text>
        </CardSection>

        <CardSection>
          <Button onPress={this.onContinuePress.bind(this)}>
            Continue
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
    height: 75,
    width: 75,
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
  const { picker_name, picker_image, product_name, product_image, quantity, product_price } = state.transaction;
  console.log('=====> TransactionForm.mapStateToProps', state);

  return { picker_name, picker_image, product_name, product_image, quantity, product_price };
};

export default connect(mapStateToProps, { transactionChange })(TransactionForm);
