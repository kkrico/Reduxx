import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';
import * as ReactRedux from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import FuncionarioList from './funcionario/FuncionarioList';
import AddFuncionarioForm from './funcionario/AddFuncionarioForm';


function reducer(
    state = {},
    action) {
    switch (action.type) {
        default: return state;
    }
}

let store = Redux.createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(<BrowserRouter store={store}>
    <ReactRedux.Provider>
        <React.Fragment>
            <Route exact path="/" component={FuncionarioList} />
            <Route exact path="/novo" component={AddFuncionarioForm} />
        </React.Fragment>
    </ReactRedux.Provider>
</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
