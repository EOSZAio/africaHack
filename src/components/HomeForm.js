import React, { Component } from 'react';
import { Card, CardSection, Button } from './common';
import {Actions} from "react-native-router-flux";

class HomeForm extends Component {
  onTraderPress() {
    console.log('onTraderPress');
    Actions.traderProductList();
  }

  onLogoutPress() {
    console.log('onLogoutPress');
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Button onPress={() => Actions.pickerList()}>
            Pickers
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={this.onTraderPress.bind(this)}>
            Trader
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={() => Actions.productList()}>
            Products
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={() => Actions.settingsForm()}>
            Settings
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={this.onLogoutPress.bind(this)}>
            Logout
          </Button>
        </CardSection>
      </Card>
    );
  }
}

export default HomeForm;
