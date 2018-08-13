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

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

// Our inner form component. Will be wrapped with Formik({..})
class FuncionarioInnerForm extends React.Component {
    render() {
        const {
            values,
            touched,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
        } = this.props;

        return (
            <div>
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
                    <Panel bsStyle="primary">
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
                                    <div className={errors.dataaniversario && touched.dataaniversario ? ("form-group has-error") : ("form-group")}>
                                        <label htmlFor="dataaniversario" className="control-label">
                                            Data
                                    </label>
                                        <input
                                            id="dataaniversario"
                                            type="date"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.dataaniversario}
                                            className={
                                                errors.dataaniversario && touched.dataaniversario ? ('form-control text-input error') : ('form-control text-input')
                                            }
                                        />
                                    </div>
                                </Col>
                            </Row>
                        </Panel.Body>
                        <Panel.Footer>
                            <Button type="submit" disabled={isSubmitting} bsStyle="primary">
                                {values.isEdicao ? "Atualizar" : "Registrar"}
                            </Button>
                        </Panel.Footer>
                    </Panel>
                </form>
            </div>
        )
    }
}



const EnhancedForm = withFormik({
    mapPropsToValues: (props, b) => {
        const isEdicao = props.history.location.pathname.includes("edit");
        if (isEdicao) {

            if (props.selectedAuthor == undefined || props.match.params.id != props.selectedAuthor.id) {
                let url = "http://localhost:58985/api/v1/funcionarios/" + props.match.params.id;
                fetch(url)
                    .then(response => {
                        return response.json();
                    }, response => {
                        window.localStorage.setItem("API_ERROR", JSON.stringify(response));
                    })
                    .then(resultado => {
                        let payload = resultado.data;
                        props.dispatch({ type: "FETCH_SINGLE_AUTOR", payload });
                    })
            }

            if (props.selectedAuthor == undefined) {
                return ({ email: '', dataaniversario: '', nome: '', isEdicao });
            } else {
                return ({ email: props.selectedAuthor.email, dataaniversario: props.selectedAuthor.dataAniversario.substring(0, 10), nome: props.selectedAuthor.nome, isEdicao, id: props.selectedAuthor.id });
            }
        }
        else
            return ({ email: '', dataaniversario: '', nome: '', isEdicao });

    },
    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email('O email é inválido')
            .required('O campo email é obrigatório!'),
        nome: Yup.string()
            .required("O campo Nome é obrigatório"),
        dataaniversario: Yup.date()
            .required("A data de aniversário é obrigatória")
    }),

    enableReinitialize: true,
    handleSubmit: (values, { setSubmitting, ...handleSubmit }) => {
        let url = "http://localhost:58985/api/v1/funcionarios";
        fetch(url, {
            method: values.isEdicao ? "PUT" : "POST",
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
            }, response => {
                window.localStorage.setItem("API_ERROR", JSON.stringify(response));
                handleSubmit.setErrors({
                    response: "Error ao conectar na API. Favor tentar novamente mais tarde"
                })
            })
            .then(resultado => {

                if (resultado.success) {
                    let data = resultado.data;
                    handleSubmit.props.dispatch({ type: "ADD_AUTHOR", data });
                    handleSubmit.props.history.push("/")
                } else {
                    handleSubmit.setErrors(
                        Object.assign({}, resultado.errors)
                    )
                }
                setSubmitting(false);
            })
    },
    validateOnBlur: false,
    validateOnChange: false,
    displayName: 'Funcionario Form', // helps with React DevTools
})(FuncionarioInnerForm);


const mapStateToProps = state => {
    return {
        selectedAuthor: state.selectedAuthor
    }
}


export default withRouter(connect(mapStateToProps, null)(EnhancedForm));