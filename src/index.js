import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import AddFuncionarioForm from './funcionario/AddFuncionarioForm';
import { render } from 'react-dom';
import { withFormik } from 'formik';
import Yup from 'yup';

function reducer(
    state = {},
    action) {
    switch (action.type) {
        default: return state;
    }
}


let store = Redux.createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);


const MyInnerForm = props => {
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
    } = props;
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email" style={{ display: 'block' }}>
                Email
        </label>
            <input
                id="email"
                placeholder="Enter your email"
                type="text"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={errors.email && touched.email ? 'text-input error' : 'text-input'}
            />
            {errors.email &&
                touched.email && <div className="input-feedback">{errors.email}</div>}

            <button
                type="button"
                className="outline"
                onClick={handleReset}
                disabled={!dirty || isSubmitting}
            >
                Reset
        </button>
            <button type="submit" disabled={isSubmitting}>
                Submit
        </button>
        </form>
    );
};

const EnhancedForm = withFormik({
    mapPropsToValues: () => ({ email: '' }),
    validationSchema: Yup.object().shape({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required!'),
    }),
    handleSubmit: (values, { setSubmitting }) => {
        debugger;
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 1000);
    },
    displayName: 'BasicForm', // helps with React DevTools
})(MyInnerForm);

const App = () => (
    <div className="app">
        <h1>
            Basic{' '}
            <a href="https://github.com/jaredpalmer/formik" target="_blank" rel="noopener">
                Formik
        </a>{' '}
            Demo
      </h1>

        <EnhancedForm />
    </div>
);

ReactDOM.render(<BrowserRouter>
    <ReactRedux.Provider store={store}>
        <React.Fragment>
            <Route exact path="/" component={AddFuncionarioForm} />
        </React.Fragment>
    </ReactRedux.Provider>
</BrowserRouter>, document.getElementById('root'));
registerServiceWorker();
