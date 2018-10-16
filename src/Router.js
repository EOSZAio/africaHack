import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import HomeForm from "./components/HomeForm";
import PickerList from "./components/PickerList";
import PickerCreate from "./components/PickerCreate";
import PickerSummary from "./components/PickerSummary";
import PickerEdit from "./components/PickerEdit";
import ProductList from "./components/ProductList";
import ProductCreate from "./components/ProductCreate";
import ProductEdit from "./components/ProductEdit";
import SettingsForm from "./components/SettingsForm";

import SelectProductList from "./components/SelectProductList";
import SkipList from "./components/SkipList";
import SkipForm from "./components/SkipForm";
import TransactionForm from "./components/TransactionForm";
import TransactionDoneForm from "./components/TransactionDoneForm";
import Trader1 from "./components/Trader1";
import Trader2 from "./components/Trader2";
import Trader3 from "./components/Trader3";

const RouterComponent = () => {
  return (
    <Router>
      <Scene key="root" hideNavBar >
        <Scene key="auth">
          <Scene
            key="login"
            component={LoginForm}
            title="Please Login"
            initial
          />
        </Scene>

        <Scene key="main">
          <Scene
            key="homeForm"
            component={HomeForm}
            title="EOS ZA"
            initial
          />

          <Scene
            key="pickerList"
            component={PickerList}
            title="Pickers"
            //rightTitle="Add"
            onRight={() => Actions.pickerCreate()}
          />

          {/*<Scene
            key="pickerCreate"
            component={PickerCreate}
            title="Add Picker"
          />

          <Scene
            key="pickerSummary"
            component={PickerSummary}
            title="Picker Details"
          />

          <Scene
            key="pickerEdit"
            component={PickerEdit}
            title="Edit Picker"
          />*/

          <Scene
            key="productList"
            component={ProductList}
            title="Products"
            rightTitle="Add"
            onRight={() => Actions.productCreate()}
          />

          {/*<Scene
            key="productCreate"
            component={ProductCreate}
            title="Add Product"
          />

          <Scene
            key="productEdit"
            component={ProductEdit}
            title="Products"
          />

          <Scene
            key="settingsForm"
            component={SettingsForm}
            title="Settings"
          />*/}

          <Scene
            key="selectProductList"
            component={SelectProductList}
            title="Products"
          />

          <Scene
            key="skipList"
            component={SkipList}
            title="Skips"
            rightTitle="Add"
            onRight={() => Actions.skipForm()}
          />

          <Scene
            key="skipForm"
            component={SkipForm}
            title="Add Skip"
          />

          <Scene
            key="transactionForm"
            component={TransactionForm}
            title="Transaction"
          />

          <Scene
            key="transactionDoneForm"
            component={TransactionDoneForm}
            title="Complete"
          />

          <Scene
            key="trader1"
            component={Trader1}
            title="Trader1"
          />

          <Scene
            key="trader2"
            component={Trader2}
            title="Trader2"
          />

          <Scene
            key="trader3"
            component={Trader3}
            title="Trader3"
          />

        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
