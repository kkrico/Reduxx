import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import { BrowserRouter, Route } from 'react-router-dom';
import * as ReactRedux from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import FuncionarioList from './funcionario/FuncionarioList';
import AddFuncionarioForm from './funcionario/AddFuncionarioForm';

const authors = [
    {
        "id": "b6136c52-bd2d-4395-8aaf-026ca34fbd6e",
        "nome": "Michael Douglas",
        "email": "michael.araujo@cassi.com.br",
        "dataAniversario": "1994-07-26T08:22:00"
    },
    {
        "id": "6631d854-d4cf-4cd9-9da7-239de5e0d13a",
        "nome": "Adryan Leão",
        "email": "adryan.silva@cassi.com",
        "dataAniversario": "1994-07-26T08:22:00"
    },
    {
        "id": "7b4d4e21-39d2-4d0f-9bef-4360e8caa411",
        "nome": "Daniel Alves",
        "email": "dandiel.alves@cassi.com.br",
        "dataAniversario": "0212-07-26T08:22:00"
    },
    {
        "id": "0da14ead-0ae7-4062-b499-45436701da2e",
        "nome": "Osvaldo de Melo",
        "email": "osvaldo.melo@cassi.com.br",
        "dataAniversario": "1994-07-26T08:22:00"
    },
    {
        "id": "9771b151-d589-4172-95d7-718bc83f7d8f",
        "nome": "Adryan",
        "email": "adryan.silva@cassi.com.br",
        "dataAniversario": "1994-07-26T07:22:00"
    },
    {
        "id": "e309ca26-842d-4466-bc91-90b823f04d32",
        "nome": "Daniel Ferreira Ramos",
        "email": "mail@mail.com.br",
        "dataAniversario": "1992-05-07T00:00:00"
    },
    {
        "id": "364e7295-7dd4-434b-8ab3-9278397c16bc",
        "nome": "Teste",
        "email": "adrllyan@aa.com.br",
        "dataAniversario": "1994-03-19T07:22:00"
    },
    {
        "id": "8972b66f-2b4a-4df4-b17c-959d7499ff2e",
        "nome": "Daniel Alves",
        "email": "daniel.alves@cassi.com.br",
        "dataAniversario": "1994-07-26T08:22:00"
    },
    {
        "id": "d117e57d-d8f1-43b0-b55a-ddd92e90b570",
        "nome": "Teste",
        "email": "adryan@aa.com.br",
        "dataAniversario": "1994-03-19T07:22:00"
    },
    {
        "id": "0efd5e59-3507-4bcc-b7e0-f9b5f231929e",
        "nome": "Daniel Ramos",
        "email": "ramos.danielferreira@gmail.com",
        "dataAniversario": "1992-07-05T00:00:00"
    }
];

function reducer(
    state = { authors },
    action) {
    debugger;
    switch (action.type) {
        case 'ANSWER_SELECTED':
            const isCorrect = state.turnData.author.books.some((book) => book === action.answer);
            return Object.assign(
                {},
                state, {
                    highlight: isCorrect ? 'correct' : 'wrong'
                });
        case 'CONTINUE':
            return Object.assign({}, state, {
                highlight: '',
            });
        case 'ADD_AUTHOR':
            return Object.assign({}, state, {
                authors: state.authors.concat([action.author])
            });
        default: return state;
    }
}

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
