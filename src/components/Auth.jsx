import { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "../features/counter/studentSlice";

//yup is a schema builder for forms
const registerSchema = yup.object().shape({
  name: yup.string().required("required"),
  rollno: yup.string().required("required"),
  classname: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

const initialValuesRegister = {
  name: "",
  email: "",
  password: "",
  rollno: "",
  class: "",
};

const initialValuesLogin = {
  email: "",
  password: "",
};

export const Auth = () => {
  const [pageType, setPageType] = useState("login");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";

  const register = async (values, onSubmitProps) => {
    // this allows us to send form info with image
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
      console.log(value, values[value])
    }

    const savedUserResponse = await fetch(
      "https://crud-project-kven.onrender.com/auth/register",
      {
        method: "POST",
        body: formData,
      }
    );
    const savedUser = await savedUserResponse.json();
    onSubmitProps.resetForm();

    if (savedUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const loggedInResponse = await fetch("https://crud-project-kven.onrender.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedIn = await loggedInResponse.json();
    onSubmitProps.resetForm();
    if (loggedIn) {
      dispatch(
        setLogin({
          user: loggedIn.user,
          token: loggedIn.token,
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    console.log("login called")
    if (isLogin) await login(values, onSubmitProps);
    if (isRegister) await register(values, onSubmitProps);
  };

  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
      validationSchema={isLogin ? loginSchema : registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <div>
            {isRegister && (
              <>
              <label htmlFor="name">Name <span>{errors.name && touched.name && errors.name}</span></label>
              <input type="text" id="name" name="name" placeholder="Enter name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name} />
                <label htmlFor="rollno">Roll No. <span>{errors.rollno && touched.rollno && errors.rollno}</span></label>
                <input type="rollno" id="rollno" name="rollno" placeholder="Enter Roll Number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.rollno}
                />
                <label htmlFor="classname">Class Name <span>{errors.classname && touched.classname && errors.classname}</span></label>
                <input type="text" id="classname" name="classname" placeholder="Enter Class Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.classname}
                />
              </>
            )}

            <label htmlFor="email">Email <span>{errors.email && touched.email && errors.email}</span></label>
            <input type="email" id="email" name="email" placeholder="Enter Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
            />
            <label htmlFor="password">Password<span>{errors.password && touched.password && errors.password}</span></label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
            />
          </div>

          {/* BUTTONS */}
          <div>
            <button
              type="submit"
            >
              {isLogin ? "LOGIN" : "REGISTER"}
            </button>
            <div
              onClick={() => {
                setPageType(isLogin ? "register" : "login");
                resetForm();
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up here."
                : "Already have an account? Login here."}
            </div>
          </div>
        </form>
      )}
    </Formik>
  );
};