import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import AddBeneficiarioForm from './beneficiario/AddBeneficiarioForm';

function reducer(
    state = { },
    action) {
    switch (action.type) {
        default: return state;
    }
}


let store = Redux.createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(<BrowserRouter>
    <ReactRedux.Provider store={store}>
        <React.Fragment>
            <Route exact path="/" component={AddBeneficiarioForm} />
        </React.Fragment>
    </ReactRedux.Provider>
</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
