import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { BrowserRouter, Route } from 'react-router-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import AuthorQuiz from './AuthorQuiz';
import AddAuthorForm from './AddAuthorForm';
import registerServiceWorker from './registerServiceWorker';
import { shuffle, sample } from 'underscore';
import ListaFuncionario from './ListaFuncionario';

const authors = [];

let store = Redux.createStore(
    reducer,
    Redux.applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function reducer(state = {
    authors
}, action) {
    debugger;
    switch (action.type) {
        case 'ADD_AUTHOR':
            alert("Adicionado func" + JSON.stringify(action));
            return Object.assign({}, state, {
                authors: state.authors.concat([action.author])
            });
        default: return state;
    }
}


ReactDOM.render(
    <BrowserRouter>
        <ReactRedux.Provider store={store}>
            <React.Fragment>
                <Route exact path="/" component={ListaFuncionario} />
                <Route path="/add" component={AddAuthorForm} />
            </React.Fragment>
        </ReactRedux.Provider>
    </BrowserRouter>, document.getElementById('root'));