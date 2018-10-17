import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, Image, Text } from 'react-native';
import { sitesFetch, transactionChange } from '../actions';
import { Card, CardSection } from './common';
import SiteListItem from './SiteListItem';

class SiteList extends Component {
  componentWillMount() {
    this.props.sitesFetch();
    this.props.transactionChange({ prop: 'product', value: this.props.product });
  }

  renderRow(site) {
    return <SiteListItem site={site.item}/>;
  }

  render() {
    const { name, settings, current_weight } = this.props.product;
    const { image } = JSON.parse(settings);
    let weight = 0.00;
    weight = parseFloat(current_weight).toFixed(2);
    
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
                source={{ uri: image }}
              />
            </View>
            <View style={conentStyle}>
              <Text style={titleStyle}>{name}</Text>
              {/*<Text style={titleStyle}>{weight}kg</Text>*/}
            </View>
          </CardSection>
        </Card>
        <Card>
        <FlatList
          data={this.props.sites}
          renderItem={this.renderRow}
          keyExtractor={(key) => key.uid.toString()}
        />
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

const mapStateToProps = state => {
  const { product } = state.transaction;
  const sites = _.map(state.sites, (val, uid ) => {
    const site = { ...val, uid, product };
    return site;
  });
  return { sites };
};

export default connect(mapStateToProps, { sitesFetch, transactionChange })(SiteList);
