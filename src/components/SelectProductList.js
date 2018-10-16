import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import { productsFetch } from '../actions';
import SelectProductListItem from './SelectProductListItem';

class SelectProductList extends Component {
  componentWillMount() {
    this.props.productsFetch();
  }

  renderRow(product) {
    return <SelectProductListItem product={product.item} />;
  }

  render() {
    return (
   
      <FlatList
        data={this.props.products}
        renderItem={this.renderRow}
        keyExtractor={(key) => key.uid.toString()}
      />
    );
  }
}

const mapStateToProps = state => {
  const products = _.map(state.products, (val, uid ) => {
    const product = { ...val, uid };
    return product;
  });
  console.log("products:", JSON.stringify(products));
  return { products };
};

export default connect(mapStateToProps, { productsFetch })(SelectProductList);
