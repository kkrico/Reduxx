import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/lib/Table';
import Modal from 'react-bootstrap/lib/Modal';
import Button from 'react-bootstrap/lib/Button';
import FuncionarioMessage from './FuncionarioMessage';

export const FETCH_FUNCIONARIO_BEGIN = 'FETCH_FUNCIONARIO_BEGIN';
export const FETCH_FUNCIONARIO_SUCCESS = 'FETCH_FUNCIONARIO_SUCCESS';
export const FETCH_FUNCIONARIOS_SUCCESS = 'FETCH_FUNCIONARIO_SUCCESS';
export const ADD_FUNCIONARIO = 'ADD_FUNCIONARIO';

export const fetchFuncionarioBegin = () => ({
    type: FETCH_FUNCIONARIO_BEGIN
});

export const fetch_Funcionarios_Success = funcionarios => ({
    type: FETCH_FUNCIONARIOS_SUCCESS,
    payload: { funcionarios }
});

export const fetch_Funcionario_Success = funcionario => ({
    type: FETCH_FUNCIONARIO_SUCCESS,
    payload: { funcionario }
});


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
        messages: state.messages,
        authors: state.authors
    };
}

function deleteAuthor({ id, nome }) {
    let url = "http://localhost:58985/api/v1/funcionarios/" + id;

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
                dispatch({ type: "REMOVED_AUTHOR", payload: nome + " removido com sucesso" })
                dispatch(fetchProducts());
            })
    }
}


function FuncionarioModalExclusao({ show, selectedAuthor, onDismiss, onExclusao }) {

    return (<Modal show={show} onHide={onDismiss}>
        <Modal.Header closeButton>
            <Modal.Title>Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <h4>Confirma a exclusão de {selectedAuthor.nome} - {selectedAuthor.email}?</h4>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={() => onExclusao(selectedAuthor)} bsStyle="primary">Confirmar</Button>
            <Button onClick={onDismiss}>Sair</Button>
        </Modal.Footer>
    </Modal>);
}
function fetchProducts() {
    return dispatch => {
        dispatch(fetchProductsBegin());
        return fetch("http://localhost:58985/api/v1/funcionarios")
            .then(res => res.json(), response => {
                throw new Error("API ERROR. Response: " + JSON.stringify(response));
            })
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

    confirmaExclusao({ id, nome }) {
        debugger;
        this.props.dispatch(deleteAuthor({ id, nome }));
        this.setState({ show: false });
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

    render() {
        this.handleClose = this.handleClose.bind(this);
        this.confirmaExclusao = this.confirmaExclusao.bind(this);
        const haFuncionarioCadastrado = this.props.authors.length > 0;
        if (haFuncionarioCadastrado)
            return (
                <div>
                    <FuncionarioMessage messages={this.props.messages} />
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
                                this.props.authors.sort((a, b) => {
                                    if (a.nome < b.nome) return -1;
                                    if (a.nome > b.nome) return 1;
                                    return 0;
                                }).map(function (author, chave) {
                                    return <tr key={chave}>
                                        <td>{author.nome}</td>
                                        <td>{author.email}</td>
                                        <td>{new Date(author.dataAniversario).toLocaleDateString()}</td>
                                        <td>
                                            <Link to={"/edit/" + author.id}>
                                                <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                            </Link>
                                        </td>
                                        <td>
                                            <a href="" title="Detalhar">
                                                <i className="fa fa-list-alt" aria-hidden="true"></i>
                                            </a>
                                        </td>
                                        <td>
                                            <button className="btn btn-link" href="#" title="Excluir" onClick={() => this.handleClickExcluir(author)} >
                                                <i className="fa fa-trash-o" aria-hidden="true"></i>
                                            </button>
                                        </td>
                                        <td>
                                        </td>
                                    </tr>
                                }, this)
                            }
                        </tbody>
                    </Table >
                    <FuncionarioModalExclusao {...this.state} onDismiss={this.handleClose} onExclusao={this.confirmaExclusao} />
                    <Link to="/add">Adicionar funcionario</Link>
                </div >
            );

        else
            return (
                <div>
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
                </div >
            );
    }
}

export default connect(mapStateToProps, null)(FuncionarioList);
