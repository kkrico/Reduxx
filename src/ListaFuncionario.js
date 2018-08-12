import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/lib/Table';
import Grid from 'react-bootstrap/lib/Grid';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';

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

function deleteAuthor(guid) {
    let url = "http://localhost:58985/api/v1/funcionarios/" + guid;

    return dispatch => {
        fetch(url, {
            method: "DELETE",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin", // include, same-origin, *omit
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
        })
            .then(response => {
                return response.json();
            }, response => {
                window.localStorage.setItem("API_ERROR", JSON.stringify(response));
            })
            .then(resultado => {
                dispatch(fetchProducts());
            })
    }


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
            authors: props.authors,
            selectedAuthor: {},
            show: false
        }
    }

    confirmaExclusao(guid) {
        this.props.dispatch(deleteAuthor(guid));
        this.setState({show : false});
    }

    componentDidMount() {
        this.props.dispatch(fetchProducts());
    }

    handleClickExcluir(author) {
        this.setState({ show: true, selectedAuthor: author });
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleClickEditar(evt) {
        debugger;
    }

    render() {
        this.handleClose = this.handleClose.bind(this);

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
                                        <td>{new Date(author.dataAniversario).toLocaleDateString()}</td>
                                        <td>
                                            <span onClick={this.handleClickEditar}>Editar</span>
                                            <span onClick={() => this.handleClickExcluir(author)}>Excluir</span>
                                        </td>
                                    </tr>
                                }, this)
                            }
                        </tbody>
                    </Table >
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Exclusão</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <h4>Confirma a exclusão de {this.state.selectedAuthor.nome} - {this.state.selectedAuthor.email}?</h4>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={() => this.confirmaExclusao(this.state.selectedAuthor.id)} bsStyle="primary">Confirmar</Button>
                            <Button onClick={this.handleClose}>Sair</Button>
                        </Modal.Footer>
                    </Modal>
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
