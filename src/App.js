import React, {Component} from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import reducers from './reducers';
import Router from './Router';

class App extends Component {
  componentWillMount() {
    const config = {
      apiKey: "AIzaSyDnAIEY9iB-QiYreNCuwSNmc7qBiuaafnQ",
      authDomain: "freecycle-7a845.firebaseapp.com",
      databaseURL: "https://freecycle-7a845.firebaseio.com",
      projectId: "freecycle-7a845",
      storageBucket: "freecycle-7a845.appspot.com",
      messagingSenderId: "25037595485"
    };

    firebase.initializeApp(config);
  }

  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

export default App;
