import React from 'react';
import Alert from 'react-bootstrap/lib/Alert';

function FuncionarioMessage({ messages }) {

    var deveMostrarMensagem = messages && messages.length > 0;
    return (
        (deveMostrarMensagem ? <Alert bsStyle="info">
            {
                messages.map(function (mensagem, index) {
                    return <p key={index}>{mensagem}</p>
                })
            }
        </Alert> : null)
    )
}

export default FuncionarioMessage;