import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withFormik } from 'formik';
import Yup from 'yup';
import Panel from 'react-bootstrap/lib/Panel';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Alert from 'react-bootstrap/lib/Alert';
import Button from 'react-bootstrap/lib/Button';

function titleize(text) {
    var loweredText = text.toLowerCase();
    var words = loweredText.split(" ");
    for (var a = 0; a < words.length; a++) {
        var w = words[a];

        var firstLetter = w[0];
        w = firstLetter.toUpperCase() + w.slice(1);

        words[a] = w;
    }
    return words.join(" ");
}

function ErrosValidacao({ errors }) {
    return (
        Object.keys(errors).length > 0 && (
            <Alert bsStyle="danger">
                {
                    Object.keys(errors).map(function (chave, index) {
                        return <p key={index}>{errors[chave]}</p>
                    })
                }
            </Alert>
        )
    )
}

function FuncionarioInput({ nomeCampo, errors, touched, placeholder, onChange, onBlur, value, type, displayName = nomeCampo }) {
    const haErroNoCampo = errors[nomeCampo] && touched[nomeCampo];

    const estilo = {
        estiloForm: {
            width : 500,
            height: 200
        }};
    return (

        <div className={haErroNoCampo ? ("form-group has-error") : ("form-group")} style={estilo.estiloForm}>
            <label htmlFor={nomeCampo} className="control-label">
                {titleize(displayName)}
            </label>
            <input
                id={nomeCampo}
                placeholder={placeholder}
                type={type}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                className={
                    haErroNoCampo ? ('form-control error') : ('form-control')
                }
            />
        </div>
    )
}

class FuncionarioForm extends React.Component {
    render() {
        const {
            values,
            errors,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
        } = this.props;

        return (
            <div>
                <ErrosValidacao errors={errors} />
                <form onSubmit={handleSubmit}>
                    <Panel bsStyle="primary">
                        <Panel.Heading>Cadastro de funcionários</Panel.Heading>
                        <Panel.Body>
                            <Row className="show-grid">
                                <Col lg={4} xs={12}>
                                    <FuncionarioInput {...this.props} value={values["nome"]} type="text" nomeCampo="nome" placeholder="Seu Nome" onChange={handleChange} onBlur={handleBlur} />
                                </Col>
                                <Col lg={4} xs={12}>
                                    <FuncionarioInput {...this.props} value={values["email"]} type="text" nomeCampo="email" placeholder="Seu Email" onChange={handleChange} onBlur={handleBlur} />
                                </Col>
                                <Col lg={4} xs={12}>
                                    <FuncionarioInput {...this.props} value={values["dataaniversario"]} type="date" nomeCampo="dataaniversario" placeholder="Seu Email" onChange={handleChange} onBlur={handleBlur} displayName="Data de Aniversário" />
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



const FuncionarioFormValidavel = withFormik({
    mapPropsToValues: (props) => {

        const isEdicao = props.history.location.pathname.includes("edit");

        if (isEdicao) {
            if (props.selectedAuthor === undefined || props.match.params.id !== props.selectedAuthor.id) {
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

            if (props.selectedAuthor === undefined) {
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
    handleSubmit: async (values, { setSubmitting, ...handleSubmit }) => {
        let url = "http://localhost:58985/api/v1/funcionarios";
        fetch(url, {
            method: values.isEdicao ? "PUT" : "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify(values), // body data type must match "Content-Type" header
        })
            .then(response => {
                if (response !== undefined)
                    return response.json();
                else
                    throw new Error("API ERROR. Response: " + JSON.stringify(response));

            }, response => {
                throw new Error("API ERROR. Response: " + JSON.stringify(response));
            })
            .then(resultado => {
                if (resultado.success) {
                    let payload = {
                        author: resultado.data,
                        message: "Funcionário " + resultado.data.nome + " " + (values.isEdicao ? "alterado" : "inserido") + " com sucesso"
                    };
                    handleSubmit.props.dispatch({ type: "ADD_AUTHOR", payload });
                    handleSubmit.props.history.push("/");
                } else {
                    handleSubmit.setErrors(
                        Object.assign({}, resultado.errors)
                    )
                    setSubmitting(false);
                }
            })
            .catch(reason => {
                window.localStorage.setItem("API_ERROR", JSON.stringify(reason));
                handleSubmit.setErrors({
                    response: "Erro ao conectar na API. Favor, atualize a página ou tente novamente mais tarde"
                });
            })
    },
    validateOnBlur: false,
    validateOnChange: false,
    enableReinitialize: true,
    displayName: 'Funcionário Form', // helps with React DevTools
})(FuncionarioForm);


const mapStateToProps = state => {
    return {
        selectedAuthor: state.selectedAuthor
    }
}

export default withRouter(connect(mapStateToProps, null)(FuncionarioFormValidavel));