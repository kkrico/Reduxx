import React from 'react';
import { connect } from 'react-redux';
import Grid from 'react-bootstrap/lib/Grid';
import Panel from 'react-bootstrap/lib/Panel';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import { withRouter } from 'react-router-dom';
import { render } from 'react-dom';
import { withFormik } from 'formik';
import Yup from 'yup';

class FuncionarioInnerForm extends React.Component {

    handleSubmit(event) {
        event.preventDefault();
    }
    render() {
        const {
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
        } = this.props;

        return (
            <Grid>
                <form onSubmit={handleSubmit}>
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
                                    <input
                                        id="email"
                                        placeholder="Seu email"
                                        type="text"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={errors.email && touched.email ? 'text-input error' : 'text-input'}
                                    />
                                </Col>
                                <Col lg={4} xs={12}>
                                    <label>Data de nascimento:</label>
                                    <input type="text" className="form-control" />
                                </Col>
                            </Row>
                        </Panel.Body>
                        <Panel.Footer className="text-right">
                            <button type="submit" disabled={isSubmitting}>
                                Submit
                            </button>
                        </Panel.Footer>
                    </Panel>
                </form>
            </Grid>
        )
    }
}

const FuncionarioForm = withFormik({
    mapPropsToValues: () => ({ email: '' }),
    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required!'),
    }),
    handleSubmit: (values, { setSubmitting }) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 1000);
    },
    displayName: 'BasicForm', // helps with React DevTools
})(FuncionarioInnerForm)

const AddFuncionarioForm = function ({ match, onAddAuthor }) {
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
