import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import HomeForm from "./components/HomeForm";
import PickerList from "./components/PickerList";
import TraderProductList from "./components/TraderProductList";
import SelectProductList from "./components/SelectProductList";
import TransactionForm from "./components/TransactionForm";
import TransactionDoneForm from "./components/TransactionDoneForm";
import ConfirmationForm from "./components/ConfirmationForm";
import TraderConfirmationForm from "./components/TraderConfirmationForm";
import SiteList from './components/SiteList';
import OrderForm from './components/OrderForm';

const RouterComponent = () => {

  /*const renderBackButton = () => {
    return (
        <TouchableOpacity
            onPress={() => {}}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image
                    source={require('../assets/images/icons/arrow-left-@x3.png')}
                    resizeMode={'contain'}/>
                <Text>Back</Text>
            </View>
        </TouchableOpacity>
    );
};*/

  return (
    <Router>
      <Scene key="root" hideNavBar >
        {/*<Scene key="auth">
          <Scene
            key="login"
            component={LoginForm}
            title="Please Login"
            initial
          />
  </Scene>*/}

        <Scene key="main">
          <Scene
            key="homeForm"
            component={HomeForm}
            title="EOS ZA"
            initial
            left={() => (null)}
          />

          <Scene
            key="pickerList"
            component={PickerList}
            title="Pickers"
            //rightTitle="Add"
            onRight={() => Actions.pickerCreate()}
          />

          <Scene
            key="traderProductList"
            component={TraderProductList}
            title="Products"
            //rightTitle="Add"
            //onRight={() => Actions.productCreate()}
          />

          <Scene
            key="selectProductList"
            component={SelectProductList}
            title="Products"
          />

          <Scene
            key="siteList"
            component={SiteList}
            title="Sites"
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
            key="confirmationForm"
            component={ConfirmationForm}
            title="Confirmed"
            left={() => (null)}
          />

           <Scene 
            key="traderConfirmationForm"
            component={TraderConfirmationForm}
            title="Confirmed"
            left={() => (null)}
          />

          <Scene 
            key="orderForm"
            component={OrderForm}
            title="Order"
          />

          {/*<Scene
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
          />*/}

        </Scene>
      </Scene>
    </Router>
  );
};

export default RouterComponent;
