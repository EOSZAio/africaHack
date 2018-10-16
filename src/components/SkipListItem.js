import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { CardSection } from './common';
import connect from "react-redux/es/connect/connect";
import {transactionChange} from "../actions";

class SkipListItem extends Component {
  onRowPress() {
    this.props.transactionChange({ prop: 'bin_uid', value: this.props.skip.uid });
    this.props.transactionChange({ prop: 'bin_code', value: this.props.skip.code });
    Actions.transactionDoneForm({ skip: this.props.skip });
  }

  render() {
    const { code } = this.props.skip;

    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>
              {code}
            </Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

export default connect(null, { transactionChange })(SkipListItem);
