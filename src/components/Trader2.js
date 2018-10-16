import React, { Component } from 'react';
import {Image, Text, View} from 'react-native';
import {Button, CardSection } from "./common";
import {Actions} from "react-native-router-flux";

class Trader1 extends Component {

  onNextPress() {
    Actions.trader3();
  }

  render() {
    return (
      <View>
        <CardSection>
          <Text>
            Trader 2
          </Text>
        </CardSection>

        <CardSection>
          <Button onPress={this.onNextPress.bind(this)}>
            Next
          </Button>
        </CardSection>
      </View>
    );
  }
}

export default Trader1;
