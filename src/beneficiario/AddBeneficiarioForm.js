import React from 'react';
import { connect } from 'react-redux';
import Grid from 'react-bootstrap/lib/Grid';
import Panel from 'react-bootstrap/lib/Panel';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import { withRouter } from 'react-router-dom';

class FuncionarioForm extends React.Component {

    super
    handleSubmit(event) {
        event.preventDefault();
    }
    render() {
        return (
            <Grid>
                <form>
                    <Panel>
                        <Panel.Heading>Cadastro de funcionários</Panel.Heading>
                        <Panel.Body>
                            <Row className="show-grid">
                                <Col lg={4} xs={12}>
                                    <label>Nome:</label>
                                    <input type="text" className="form-control" />
                                </Col>
                                <Col lg={4} xs={12}>
                                    <label>E-mail:</label>
                                    <input type="text" className="form-control" />
                                </Col>
                                <Col lg={4} xs={12}>
                                    <label>Data de nascimento:</label>
                                    <input type="text" className="form-control" />
                                </Col>
                            </Row>
                        </Panel.Body>
                        <Panel.Footer className="text-right">
                            <Button bsStyle="primary" type="submit">Cadastrar</Button>
                        </Panel.Footer>
                    </Panel>
                </form>
            </Grid>
        )
    }
}

function AddFuncionarioForm({ match, onAddAuthor }) {
    return <Grid>
        <FuncionarioForm />
    </Grid>;
}

function mapDispatchToProps(dispatch, props) {
    return {
        onAddAuthor: (author) => {
            dispatch({ type: 'ADD_AUTHOR', author });
            props.history.push('/');
        }
    };
}

export default withRouter(connect(() => { }, mapDispatchToProps)(AddFuncionarioForm));
