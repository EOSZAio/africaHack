import React, { Component } from 'react';
import { connect } from 'react-redux';
import { productChange, productCreate } from '../actions';
import { Card, CardSection, Button } from './common';
import ProductForm from './ProductForm';

class ProductCreate extends Component {
  onButtonPress() {
    const { name, image, price } = this.props;

    this.props.productCreate({ name, image, price });
  }

  render() {
    return (
      <Card>
        <ProductForm {...this.props} />
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
  const { name, image, price } = state.product;

  return { name, image, price };
};

export default connect(mapStateToProps, {
  productChange, productCreate
})(ProductCreate);
