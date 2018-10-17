import React, { Component } from 'react';
import {Image, Text, TouchableWithoutFeedback, View} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';

class SiteListItem extends Component {
  onRowPress() {
    //Actions.productEdit({ product: this.props.product });
  }

  render() {
    //const { name, image } = this.props.product;
    /*
    geohash: "kekj1"
owner: "testsite1"
settings: "{"contact":"Sebokeng","number":"0612345678"}"
sitename: "Test site 1"
*/
    const { geohash, owner, settings, sitename } = this.props.site;
    const { contact, number } = JSON.parse(settings);

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
                source={require('../images/sites.png')} 
              />
            </View>
            <View style={conentStyle}>
              <Text style={titleStyle}>{sitename}</Text>
              <Text style={titleStyle}>{owner}</Text>
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

export default SiteListItem;
