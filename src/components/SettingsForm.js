import React, { Component } from 'react';
import { Button, Card, CardSection, Input } from "./common";
import connect from "react-redux/es/connect/connect";
import { settingsChange, settingsCreate, settingsFetch, settingsSave } from "../actions";

class SettingsForm extends Component {
  componentWillMount() {
    this.props.settingsFetch();
  }

  onButtonPress() {
    const { name, account, owner_private, active_private, uid } = this.props;

    if (uid) {
      this.props.settingsSave({ name, account, owner_private, active_private, uid });

    } else {
      this.props.settingsCreate({ name, account, owner_private, active_private });
    }
  }

  render() {
    return (
      <Card>

        <CardSection>
          <Input
            label="Name"
            placeholder="Name"
            value={this.props.name}
            onChangeText={value => this.props.settingsChange({ prop: 'name', value })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Account"
            placeholder="EOS account"
            value={this.props.account}
            onChangeText={value => this.props.settingsChange({ prop: 'account', value })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Owner key"
            placeholder="Private key : 5..."
            value={this.props.owner_private}
            onChangeText={value => this.props.settingsChange({ prop: 'owner_private', value })}
          />
        </CardSection>

        <CardSection>
          <Input
            label="Active key"
            placeholder="Private key : 5..."
            value={this.props.active_private}
            onChangeText={value => this.props.settingsChange({ prop: 'active_private', value })}
          />
        </CardSection>

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Save
          </Button>
        </CardSection>

      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, account, owner_private, active_private, uid } = state.settings;
  return { name, account, owner_private, active_private, uid };
};

export default connect(mapStateToProps, { settingsChange, settingsCreate, settingsFetch, settingsSave })(SettingsForm);
