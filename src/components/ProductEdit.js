import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductForm from './ProductForm';
import { productChange, productSave, productDelete } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';

class ProductEdit extends Component {
  state = { showModal: false };

  componentWillMount() {
    _.each(this.props.product, (value, prop) => {
      this.props.productChange({ prop, value });
    });
  }

  onButtonPress() {
    const { name, image, price } = this.props;

    this.props.productSave({ name, image, price, uid: this.props.product.uid });
  }

  onAccept() {
    const { uid } = this.props.product;

    this.props.productDelete({ uid });
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  render() {
    return (
      <Card>
        <ProductForm />

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
  const { name, image, price } = state.product;

  return { name, image, price };
};

export default connect(mapStateToProps, {
  productChange, productSave, productDelete
})(ProductEdit);
