import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withFormik } from 'formik';
import Yup from 'yup';
import Grid from 'react-bootstrap/lib/Grid';
import Panel from 'react-bootstrap/lib/Panel';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Alert from 'react-bootstrap/lib/Alert';
import Button from 'react-bootstrap/lib/Button';

// Our inner form component. Will be wrapped with Formik({..})
class FuncionarioInnerForm extends React.Component {
    guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
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
                {
                    Object.keys(errors).length > 0 && (
                        <Alert bsStyle="danger">
                            {
                                Object.keys(errors).map(function (chave, index) {
                                    return <p key={index}>{errors[chave]}</p>
                                })
                            }
                        </Alert>
                    )}
                <form onSubmit={handleSubmit}>
                    <Panel>
                        <Panel.Heading>Cadastro de funcionários</Panel.Heading>
                        <Panel.Body>
                            <Row className="show-grid">
                                <Col lg={4} xs={12}>
                                    <div className={errors.nome && touched.nome ? ("form-group has-error") : ("form-group")}>
                                        <label htmlFor="nome" className="control-label">
                                            Nome
                                    </label>
                                        <input
                                            id="nome"
                                            placeholder="Seu nome"
                                            type="text"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.nome}
                                            className={
                                                errors.nome && touched.nome ? ('form-control text-input error') : ('form-control text-input')
                                            }
                                        />
                                    </div>
                                </Col>
                                <Col lg={4} xs={12}>
                                    <div className={errors.email && touched.email ? ("form-group has-error") : ("form-group")}>
                                        <label htmlFor="email" className="control-label">
                                            Email
                                    </label>
                                        <input
                                            id="email"
                                            placeholder="Seu email"
                                            type="text"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.email}
                                            className={
                                                errors.email && touched.email ? ('form-control text-input error') : ('form-control text-input')
                                            }
                                        />
                                    </div>
                                </Col>
                                <Col lg={4} xs={12}>
                                    <div className={errors.datanascimento && touched.datanascimento ? ("form-group has-error") : ("form-group")}>
                                        <label htmlFor="datanascimento" className="control-label">
                                            Data
                                    </label>
                                        <input
                                            id="datanascimento"
                                            type="date"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.datanascimento}
                                            className={
                                                errors.datanascimento && touched.datanascimento ? ('form-control text-input error') : ('form-control text-input')
                                            }
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Panel.Body>
                        <Panel.Footer>
                            <Button type="submit" disabled={isSubmitting}>
                                Enviar
                            </Button>
                        </Panel.Footer>
                    </Panel>
                </form>
            </Grid>
        )
    }
}



const EnhancedForm = withFormik({
    mapPropsToValues: () => ({ email: '', datanascimento: '', nome: '' }),
    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email('O email é inválido')
            .required('O campo email é obrigatório!'),
        nome: Yup.string()
            .required("O campo Nome é obrigatório"),
        datanascimento: Yup.date()
            .required("A data de nascimento é obrigatório")
    }),
    handleSubmit: (values, { setSubmitting, ...handleSubmit }) => {
        debugger;
        let url = "https://jsonplaceholder.typicode.com/posts";

        handleSubmit.setError({
            email : "Erro do submit"
        })
        fetch(url, {
            method: "POST",
            mode: "cors",
            cache: "no-cache",
            credentials: "same-origin", // include, same-origin, *omit
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            redirect: "follow", // manual, *follow, error
            referrer: "no-referrer", // no-referrer, *client
            body: JSON.stringify(values), // body data type must match "Content-Type" header
        })
            .then(response => {
                return response.json();
            })
            .then(resultado => {
                debugger;
                handleSubmit.props.dispatch({ type: "ADD_AUTHOR", resultado });
                handleSubmit.props.history.push("/")
            })
    },
    validateOnBlur: false,
    validateOnChange: false,
    displayName: 'Funcionario Form', // helps with React DevTools
})(FuncionarioInnerForm);

export default withRouter(connect(() => { }, null)(EnhancedForm));
