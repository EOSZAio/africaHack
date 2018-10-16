import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import { skipsFetch } from '../actions';
import SkipListItem from './SkipListItem';

class SkipList extends Component {
  componentWillMount() {
    this.props.skipsFetch();
  }

  renderRow(skip) {
    return <SkipListItem skip={skip.item} />;
  }

  render() {
    return (
      <FlatList
        dataSource={this.props.skips}
        renderRow={this.renderRow}
        keyExtractor={(key) => key.uid.toString()}
      />
    );
  }
}

const mapStateToProps = state => {
  const skips = _.map(state.skips, (val, uid ) => {
    const skip = { ...val, uid };
    return skip;
  });

  return { skips };
};

export default connect(mapStateToProps, { skipsFetch })(SkipList);
