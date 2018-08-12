import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/lib/Table';
import Grid from 'react-bootstrap/lib/Grid';

function mapStateToProps(state) {
    return {
        authors: state.authors
    };
}


const AuthorQuiz = connect(mapStateToProps, null)(
    function (props) {
        debugger;
        const haFuncionarioCadastrado = props.authors.length > 0;
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
                                Object.keys(props.authors).map(function (chave, index) {
                                    debugger;

                                    return <tr key={index}>
                                        <td>{props.authors[chave].nome}</td>
                                        <td>{props.authors[chave].email}</td>
                                        <td>{props.authors[chave].dataaniversario}</td>
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
    });

export default AuthorQuiz;
