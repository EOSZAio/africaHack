import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { CardSection, Button } from './common';
import { Actions } from 'react-native-router-flux';

class ConfirmationForm extends Component {
  onAccept() {
    Actions.homeForm();
  }

  render() {
    const { cardSectionStyle, containerStyle, thumbNail, thumbnailContainerStyle, thumbnailStyle, conentStyle, titleStyle } = styles;
    const { site, weight, product_name, product_image, picker_image, picker_name } = this.props;
    //const product_value = (quantity && product_price ? quantity * product_price : 0.00).toFixed(2);
    return (
      <View style={containerStyle}>
       {/*<CardSection>
          <View style={cardSectionStyle}>
            <Text style={titleStyle}>Site Name: {site}</Text>
          </View>
       </CardSection>*/}

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
        <View style={cardSectionStyle}>
            <Text style={titleStyle}>Product Added:</Text>
          </View>
          {/*<View style={thumbnailContainerStyle}>
            <Image
              style={thumbnailStyle}
              source={{ uri: product_image }}
            />
      </View>*/}
          <View style={conentStyle}>
            <Text style={titleStyle}>{product_name}</Text>
          </View>
        </CardSection>

        <CardSection>
        <View style={conentStyle}>
            <Text style={titleStyle}>Weight Added: {weight}kg</Text>
          </View>
        </CardSection>

        <CardSection>
          <Image style={thumbNail} source={require('../images/success.png')} />
        </CardSection>

        <CardSection>
          <Button onPress={this.onAccept.bind(this)}>
          Done
          </Button>
        </CardSection>
      </View>
    );
  }
}


const styles = {
  cardSectionStyle: {
    justifyContent: 'center'
  },
  textStyle: {
    flex: 1,
    flexDirection: 'column',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40,
    color: 'green'
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  },
  thumbNail: {
    flex: 1,
    resizeMode: 'contain',
    width: 160,
    height: 160,
    alignItems: 'center',
    justifyContent: 'center'
  },
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

export default ConfirmationForm;