import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import AddAuthorForm from './AddAuthorForm';
import ListaFuncionario from './ListaFuncionario';
import thunk from 'redux-thunk'
import './AdminLTE.css';
import './skin-blue.css';
import './main.css';

const authors = [];

let store = Redux.createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    Redux.applyMiddleware(thunk)
);

function reducer(state = {
    authors,
}, action) {
    switch (action.type) {
        case 'ADD_AUTHOR':
            return Object.assign({}, state, {
                authors: state.authors.concat([action.data])
            });
        case "FETCH_SINGLE_AUTOR":
            return Object.assign({}, state, {
                selectedAuthor: Object.assign({}, action.payload)
            });
        case "FETCH_PRODUCTS_SUCCESS":
            return {
                ...state,
                authors: action.payload.products
            };
        default: return state;
    }
}


ReactDOM.render(
    <BrowserRouter>
        <ReactRedux.Provider store={store}>
            <React.Fragment>
                <Route exact path="/" component={ListaFuncionario} />
                <Route path="/add" component={AddAuthorForm} />
                <Route path="/edit/:id" component={AddAuthorForm} />
            </React.Fragment>
        </ReactRedux.Provider>
    </BrowserRouter>, document.getElementById('root'));