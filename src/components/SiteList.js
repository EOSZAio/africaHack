import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, FlatList, Image, Text } from 'react-native';
import { sitesFetch } from '../actions';
import { Card, CardSection } from './common';
import SiteListItem from './SiteListItem';

class SiteList extends Component {
  componentWillMount() {
    this.props.sitesFetch();
    console.log("sitelist", this.props);
  }

  renderRow(site) {
    return <SiteListItem site={site.item}/>;
  }

  render() {
    const { name, settings } = this.props.product;
    const { image } = JSON.parse(settings);
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
  const sites = _.map(state.sites, (val, uid ) => {
    const site = { ...val, uid };
    return site;
  });
  console.log("sites:", JSON.stringify(sites));
  return { sites };
};

export default connect(mapStateToProps, { sitesFetch })(SiteList);
