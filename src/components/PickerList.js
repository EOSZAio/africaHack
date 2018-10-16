import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import { pickersFetch } from '../actions';
import PickerListItem from './PickerListItem';

class PickerList extends Component {
  

  componentWillMount() {
    this.props.pickersFetch();
  }

  renderRow(picker) {
    return <PickerListItem picker={picker.item} />;
  }

  render() {
      return (
        <FlatList
          data={this.props.pickers}
          renderItem={this.renderRow}
          keyExtractor={(key) => key.uid.toString()}
        />
      );
  }
}

const mapStateToProps = state => {
  const pickers = _.map(state.pickers, (val, uid) => {
    return { ...val, uid };
  });
  return { pickers };
};

export default connect(mapStateToProps, { pickersFetch })(PickerList);
