import React, { Component } from 'react';
import {Image, Text, View} from 'react-native';
import {Button, Card, CardSection } from "./common";
import {Actions} from "react-native-router-flux";
import connect from "react-redux/es/connect/connect";
import {transactionChange} from "../actions";

class TransactionDoneForm extends Component {

  onDonePress() {
    Actions.pickerList();
  }

  render() {
    const { picker_name, picker_image, product_name, product_image, skip_code, product_value } = this.props.transaction;
    const  {
      thumbnailContainerStyle,
      thumbnailStyle,
      conentStyle,
      titleStyle
    } = styles;

    return (
      <Card>
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
          <View style={thumbnailContainerStyle}>
            <Image
              style={thumbnailStyle}
              source={{ uri: product_image }}
            />
          </View>
          <View style={conentStyle}>
            <Text style={titleStyle}>{product_name}</Text>
          </View>
        </CardSection>

        <CardSection>
          <Text style={styles.titleStyle}>
            {skip_code}
          </Text>
        </CardSection>

        <CardSection>
          <Text style={styles.titleStyle}>
            ${product_value}
          </Text>
        </CardSection>

        <CardSection>
          <Text style={styles.titleStyle}>
            Transaction confirmed
          </Text>
        </CardSection>

        <CardSection>
          <Button onPress={this.onDonePress.bind(this)}>
            Done
          </Button>
        </CardSection>
      </Card>
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

const mapStateToProps = (state) => {
  const { picker_uid, picker_name, picker_account, picker_image, product_uid, product_name, product_image, quantity, product_value, skip_uid, skip_code, transaction_state } = state.transaction;
  const transaction = { picker_uid, picker_name, picker_account, picker_image, product_uid, product_name, product_image, quantity, product_value, skip_uid, skip_code, transaction_state };

  return { transaction };
};

export default connect(mapStateToProps, { transactionChange })(TransactionDoneForm);
