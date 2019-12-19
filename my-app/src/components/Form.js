import React, {useState, useEffect} from 'react';
import {withFormik, Form, Field} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Forms = ({
    values,
    errors,
    touched,
    status
}) =>{
    const [users, setUsers] = useState([]);
    useEffect(() => {
        console.log(values);
        console.log('status has changed', status);
        status && setUsers(users => [...users, status]);
    }, [status]);
    console.log(users.role);
    return (
        <div className="user-form">
            <Form>
                <label htmlFor="name">Name:</label>
                <Field 
                id="name"
                type="text"
                name="name"
                placeholder="name"
                />
                {touched.name && errors.name && (
                    <p className="errors">{errors.name}</p>
                )}
                <label htmlFor="email">Email:</label>
                <Field 
                id="email"
                type="text"
                name="email"
                placeholder="email"
                />
                {touched.email && errors.email && (
                    <p className="errors">{errors.email}</p>
                )}
                <label htmlFor="password"> Password:</label>
                <Field 
                id="password"
                type="text"
                name="password"
                placeholder="password"
                />
                {touched.password && errors.password && (
                    <p className="errors">{errors.password}</p>
                )}
                <label htmlFor="terms" className="checkbox-container">
                    Terms of Service
                <Field
                id="terms"
                type="checkbox"
                name="terms"
                checked={values.terms} 
                />
                <span className="checkbox" />
                </label>
                <Field className="role" as="select" name="role">
                    <option disabled>
                        Choose a role:
                    </option>
                    <option value="Web Developer">Web Developer</option>
                    <option value="Senior Web Developer">Senior Web Developer</option>
                    <option value="Front End Developer">Front End Developer</option>
                    <option value="Full Stack Web Developer">Full Stack Web Developer</option>
                    <option value="Web User Interface Design">Web User Interface Design</option>
                </Field>
                <button type="submit">
                    Enter
                </button>
            </Form>
            {users.map(user => (
                <ul key ={user.id}>
                    <li>Name: {user.name}</li>
                    <li>Role: {user.role}</li>
                    <li>Email: {user.email}</li>
                    <li>Password: *******</li>
                </ul>
            ))}
        </div>
    )
    
}
const FormikForms = withFormik ({
    mapPropsToValues({
        name,
        email,
        password,
        terms,
        role
    }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            terms: terms || false,
            role: role || "Web Developer"
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required(
            "This is a new error"
        ),
        email: Yup.string().required()
    }),
    handleSubmit(
        values,
        { setStatus, resetForm}
     ) {
     console.log("submitting", values);
     axios
     .post("https://reqres.in/api/users", values)
     .then(res => {
         console.log("succes", res);
         setStatus(res.data);
         resetForm();
     })
     .catch(err => 
        console.log(err.response));
 }    
})(Forms);

export default FormikForms;