"use client";
import InputErrorMessage from "@/components/InputErrorMessage";
import { RootState } from "@/redux/store";
import { Formik } from "formik";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { login } from "../../../redux/features/auth/authSlice";

const initialValues = {
  username: "",
  email: "",
  password: "",
};
const LoginForm = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const [isLoading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      setLoading(false);
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [isLoggedIn, router]);

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters"),
  });

  const handleSubmit = (values: {
    username: string;
    email: string;
    password: string;
  }) => {
    dispatch(login(values));
  };

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        const parsedData = JSON.parse(userData);
        dispatch(login(parsedData));
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <p>loading....</p>
      ) : (
        <Formik
          onSubmit={handleSubmit}
          initialValues={initialValues}
          validationSchema={validationSchema}
        >
          {(props) => (
            <div className="relative flex min-h-screen text-gray-800 antialiased flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
              <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
              </h2>
              <form
                onSubmit={props.handleSubmit}
                className="relative py-3 sm:w-96 mx-auto text-left space-y-2"
              >
                <div>
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.username}
                    name="username"
                    className="block w-full rounded-md border border-gray-300 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 px-2"
                    placeholder="Username"
                  />
                  {props.errors.username && (
                    <InputErrorMessage message={props.errors.username} />
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <input
                    type="email"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.email}
                    name="email"
                    className="block w-full rounded-md border border-gray-300 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 px-2"
                    placeholder="Email"
                  />
                  {props.errors.email && (
                    <InputErrorMessage message={props.errors.email} />
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    value={props.values.password}
                    name="password"
                    className="block w-full rounded-md border border-gray-300 py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 sm:text-sm sm:leading-6 px-2"
                    placeholder="Password"
                  />
                  {props.errors.password && (
                    <InputErrorMessage message={props.errors.password} />
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-700 "
                >
                  Submit
                </button>
              </form>
            </div>
          )}
        </Formik>
      )}
    </>
  );
};

export default LoginForm;
