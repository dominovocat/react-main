import React, { useContext } from 'react';
import * as yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import './RegisterForm.css';
import { register } from '../../api/users';

const regiterSchema = yup.object().shape({
  name: yup.string().required('Required field'),
  email: yup.string().email().required('Required field'),
  password: yup
    .string()
    .required('Required field')
    .matches(/^[\w]*$/),
  confPassword: yup
    .string()
    .required('Required field')
    .oneOf([yup.ref('password')]),
});

function RegisterForm() {
  const initialValues = {
    name: '',
    email: '',
    password: '',
    confPassword: '',
  };

  const handleSubmit = (data, formikBag) => {
    // reset form
    formikBag.resetForm();

    // do smth
    console.log(data);
    // do post request
    register(data);
  };

  const value = useContext(Context);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      // validate={function() { return errorObj; }}
      validationSchema={regiterSchema}
    >
      {(settings) => {
        const { errors } = settings;

        return (
          <Form>
            <label className="inputWrapper">
              <Field
                className={errors.name ? 'error' : ''}
                name="name"
                placeholder="Name"
              />
              <ErrorMessage
                className="errorLabel"
                name="name"
                component="div"
              />
            </label>

            <label className="inputWrapper">
              <Field
                className={errors.email ? 'error' : ''}
                name="email"
                placeholder="Email"
              />
              <ErrorMessage
                className="errorLabel"
                name="email"
                component="div"
              />
            </label>

            <label className="inputWrapper">
              <Field
                className={errors.email ? 'error' : ''}
                type="password"
                name="password"
                placeholder="Password"
              />
              <ErrorMessage
                className="errorLabel"
                name="password"
                component="div"
              />
            </label>

            <label className="inputWrapper">
              <Field
                className={errors.email ? 'error' : ''}
                type="password"
                name="confPassword"
                placeholder="Confirm password"
              />
              <ErrorMessage
                className="errorLabel"
                name="confPassword"
                component="div"
              />
            </label>

            <button type="submit">Send</button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default RegisterForm;
