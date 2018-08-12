import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/lib/Table';
import Grid from 'react-bootstrap/lib/Grid';

export const FETCH_PRODUCTS_BEGIN = 'FETCH_PRODUCTS_BEGIN';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';

export const fetchProductsBegin = () => ({
    type: FETCH_PRODUCTS_BEGIN
});

export const fetchProductsSuccess = products => ({
    type: FETCH_PRODUCTS_SUCCESS,
    payload: { products }
});

export const fetchProductsError = error => ({
    type: FETCH_PRODUCTS_FAILURE,
    payload: { error }
});

function mapStateToProps(state) {
    return {
        authors: state.authors
    };
}

function fetchProducts() {

    return dispatch => {
        dispatch(fetchProductsBegin());
        return fetch("http://localhost:58985/api/v1/funcionarios")
            .then(res => res.json())
            .then(json => {
                dispatch(fetchProductsSuccess(json.data));
                return json.data;
            })
            .catch(error => dispatch(fetchProductsError(error)));
    };
}

class FuncionarioList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            authors: props.authors
        }
    }
    componentDidMount() {
        this.props.dispatch(fetchProducts());
    }

    render() {
        const haFuncionarioCadastrado = this.props.authors.length > 0;
        if (haFuncionarioCadastrado)
            return (
                <Grid>
                    <h1>Funcionários</h1>
                    <Table>
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Data de Nascimento</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.props.authors.map(function (author, chave) {
                                    return <tr key={chave}>
                                        <td>{author.nome}</td>
                                        <td>{author.email}</td>
                                        <td>{author.dataAniversario}</td>
                                    </tr>
                                })
                            }
                        </tbody>
                    </Table >
                    <Link to="/add">Adicionar funcionario</Link>
                </Grid >
            );

        else
            return (
                <Grid>
                    <h1>Funcionários</h1>
                    <Table striped bordered condensed hover >
                        <thead>
                            <tr>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Data de Nascimento</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={3}>Nenhum registro encontrado</td>
                            </tr>
                        </tbody>
                    </Table >
                    <Link to="/add">Adicionar funcionario</Link>
                </Grid >
            );
    }
}

export default connect(mapStateToProps, null)(FuncionarioList);
