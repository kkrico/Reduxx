import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import FuncionarioForm from './FuncionarioForm';
import FuncionarioList from './FuncionarioList';
import thunk from 'redux-thunk'
import './AdminLTE.css';
import './skin-blue.css';
import './main.css';

const authors = [];
const messages = [];

let store = Redux.createStore(
    funcionarioReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    Redux.applyMiddleware(thunk)
);

function funcionarioReducer(state = {
    authors, messages
}, action) {

    switch (action.type) {
        case "REMOVED_AUTHOR":
        return Object.assign({}, state, {
            messages: [action.payload],
            //authors: state.authors.concat([action.payload.author])
    });
        case 'ADD_AUTHOR':
            return Object.assign({}, state, {
                    messages: [action.payload.message],
                    //authors: state.authors.concat([action.payload.author])
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
                <Route exact path="/" component={FuncionarioList} />
                <Route path="/add" component={FuncionarioForm} />
                <Route path="/edit/:id" component={FuncionarioForm} />
            </React.Fragment>
        </ReactRedux.Provider>
    </BrowserRouter>, document.getElementById('root'));