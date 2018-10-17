import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { CardSection, Button } from './common';
import { Actions } from 'react-native-router-flux';

class TraderConfirmationForm extends Component {
  componentWillMount() {
    console.log("trader", this.props);
  }

  onAccept() {
    Actions.homeForm();
  }

  render() {
    const { cardSectionStyle, containerStyle, thumbNail, thumbnailContainerStyle, thumbnailStyle, conentStyle, titleStyle } = styles;
    const { offer_price, weight } = this.props.data;
    const { sitename, product } = this.props.selected;
    const { name, settings } = product;
    const { image } = JSON.parse(settings);
    return (
      <View style={containerStyle}>
       <CardSection>
          <View style={cardSectionStyle}>
            <Text style={titleStyle}>Site Name: {sitename}</Text>
          </View>
       </CardSection>

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

        <CardSection>
        <View style={cardSectionStyle}>
            <Text style={titleStyle}>Weight bought: {weight}kg</Text>
            <Text style={titleStyle}>Price paid: R {offer_price}</Text>
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

export default TraderConfirmationForm;