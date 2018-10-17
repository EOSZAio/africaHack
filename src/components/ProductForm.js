import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { productChange } from '../actions';
import { CardSection, Input } from './common';

class ProductForm extends Component {
  render() {
    return (
      <View>
        <CardSection>
          <Input
            label="Name"
            placeholder="Name"
            value={this.props.name}
            onChangeText={value => this.props.productChange({ prop: 'name', value })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Image"
            placeholder="http://www.example.com/image.png"
            value={this.props.image}
            onChangeText={value => this.props.productChange({ prop: 'image', value })}
          />
        </CardSection>


        <CardSection>
          <Input
            label="Price"
            placeholder="$1.00/kg"
            value={this.props.price}
            onChangeText={value => this.props.productChange({ prop: 'price', value })}
          />
        </CardSection>

      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, image, price } = state.product;

  return { name, image, price };
};

export default connect(mapStateToProps, { productChange })(ProductForm);
