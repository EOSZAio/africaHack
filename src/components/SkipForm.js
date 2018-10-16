import React, { Component } from 'react';
import { connect } from 'react-redux';
import { skipChange, skipCreate } from '../actions';
import { Card, CardSection, Button, Input } from './common';

class SkipForm extends Component {
  onButtonPress() {
    const { code } = this.props;

    this.props.skipCreate({ code });
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Code"
            placeholder="Code"
            value={this.props.code}
            onChangeText={value => this.props.skipChange({ prop: 'code', value })}
          />
        </CardSection>

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Create
          </Button>
        </CardSection>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { code } = state.skip;

  return { code };
};

export default connect(mapStateToProps, {
  skipChange, skipCreate
})(SkipForm);
