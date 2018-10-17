import React, { Component } from 'react';
import {Image, Text, View} from 'react-native';
import { connect } from 'react-redux';
import {transactionChange, transactionSuccess} from '../actions';
import {Button, Card, CardSection, Input} from "./common";
import {Actions} from "react-native-router-flux";
import _ from "lodash";
import { transaction } from '../utils/eosjs-client';

class OrderForm extends Component {
  componentWillMount(){
    console.log("orderForm", this.props.site);
  }

  placeOrder() {
    const { owner } = this.props.site;
    const { id } = this.props.site.product;
    const { buy_weight, price } = this.props;

    const data = {
      traider: "traider1",
      site: owner,
      productid: id,
      offer_price: price,
      weight: buy_weight
    };

    transaction("testsite1", "batchoffer", data).then( result => {
      console.log("yay", result);
      this.props.transactionSuccess();
      Actions.traderConfirmationForm({data, selected: this.props.site });
    })
    .catch(error => {
      console.log("aww", error);
    });
  }

  render() {
    const {  product, sitename } = this.props.site;
    const product_name = product.name;
    const settings = JSON.parse(product.settings);
    const product_image = settings.image;

    const site_name = sitename;  
    const  {
      thumbnailContainerStyle,
      thumbnailStyle,
      conentStyle,
      titleStyle
    } = styles;

    return (
      <View>
      <Card>
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
          <View style={conentStyle}>
            <Text style={titleStyle}>Site: {site_name}</Text>
          </View>
        </CardSection>

        <CardSection>
          <Input
            label="Weight (kg):"
            placeholder="0.00 kg"
            value={this.props.buy_weight}
            onChangeText={value => this.props.transactionChange({ prop: 'buy_weight', value })}
          />
        </CardSection>

        <CardSection>
        <Input
            label="Price R:"
            placeholder="ZAR 0.00"
            value={this.props.price}
            onChangeText={value => this.props.transactionChange({ prop: 'price', value })}
          />
        </CardSection>
      </Card>

      <Card>
         <CardSection>
          <Button onPress={this.placeOrder.bind(this)}>
            Place Order
          </Button>
        </CardSection>
      </Card>
      </View>
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
  const { buy_weight, price } = state.transaction;


  return { buy_weight, price};
};

export default connect(mapStateToProps, { transactionChange, transactionSuccess })(OrderForm);
