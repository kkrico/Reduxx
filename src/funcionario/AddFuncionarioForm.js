import React from 'react';
import { withFormik } from 'formik';
import { withRouter } from 'react-router-dom';
import { Panel, Row, Col, Button, Grid, Alert } from 'react-bootstrap/lib';

const FuncionarioForm = props => {
    const {
        values,
        touched,
        errors,
        handleChange,
        handleBlur,
        isSubmitting,
        handleSubmit,
        history,
    } = props;

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
                                <div className={errors.data && touched.data ? ("form-group has-error") : ("form-group")}>
                                    <label htmlFor="data" className="control-label">
                                        Data
                                    </label>
                                    <input
                                        id="data"
                                        type="date"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.data}
                                        className={
                                            errors.data && touched.data ? ('form-control text-input error') : ('form-control text-input')
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
        </Grid >
    );
};


const AddFuncionarioForm = withFormik({
    mapPropsToValues: () => ({ email: '', nome: '', data: '' }),
    validateOnBlur: false,
    validateOnChange: false,
    validate: values => {
        let errors = {};
        if (!values.email) {
            errors.email = "O E-mail é obrigatório";
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = "O E-mail é inválido";
        }

        if (!values.nome) {
            errors.nome = "O Name é obrigatório";
        }

        if (!values.data) {
            errors.data = "A data de aniversário é obrigatória";
        }

        return errors;
    },

    handleSubmit: (values, props) => {

        const { setSubmitting } = props;
        debugger;

        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 1000);

        let url = "https://jsonplaceholder.typicode.com/posts";
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
        }).then(response => {
            props.props.history.push("/");
        })
    },

    displayName: 'Funcionario Form', // helps with React DevTools
})(FuncionarioForm);

export default withRouter(AddFuncionarioForm);