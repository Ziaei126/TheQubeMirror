"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

const ForgotPassword = () => {
  const callbackUrl = useSearchParams().get("callbackUrl");
  const [emailVerified, setEmailVerified] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: emailVerified
        ? Yup.string()
            .min(8, "Password must be at least 8 characters long")
            .matches(/[a-z]/, "Password must contain at least one lowercase letter")
            .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
            .matches(/\d/, "Password must contain at least one number")
            .matches(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character")
            .required("Password is required")
        : null,
      confirmPassword: emailVerified
        ? Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm password is required")
        : null,
    }),
    onSubmit: async (values) => {
      try {
        if (!emailVerified) {
          // Check if email exists in the database
          const response = await fetch("/api/check-email", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: values.email }),
          });
    
          if (response.ok) {
            const data = await response.json();
            if (data.email) {
              setEmailVerified(true); // Email is verified, show password fields
              alert("Email verified! Please proceed to set your password.");
            } else {
              alert("Unexpected response from server. Please try again.");
            }
          } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.error || "Email not found. "} Please try again or consider signing up.`);
            console.log("Error response:", errorData.details);
          }
        } else {
          // Submit the new password
          const resetResponse = await fetch("/api/reset-password", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: values.email,
              password: values.password,
            }),
          });
    
          if (resetResponse.ok) {
            alert("Password reset successfully! Redirecting...");
            signIn("email", {
              email: values.email,
              callbackUrl: callbackUrl || "/",
            });
          } else {
            const resetErrorData = await resetResponse.json();
            alert(`Error resetting password: ${resetErrorData.error || "Unexpected error occurred. Please try again."}`);
            console.error("Password reset error:", resetErrorData.details);
          }
        }
      } catch (error) {
        console.error("Unexpected error:", error);
        alert(`Unexpected error: ${error.message || "Please try again later."}`);
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <h1 className="text-3xl font-bold mb-6">Forgot Password</h1>
      <form
        onSubmit={formik.handleSubmit}
        className="max-w-sm mx-auto bg-slate-50 p-6 shadow-lg rounded-md"
      >
        <label
          className="block text-gray-700 text-sm font-bold mb-1"
          htmlFor="email"
        >
          Email:
        </label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            formik.touched.email && formik.errors.email ? "border-red-500" : ""
          }`}
          placeholder="Email"
          disabled={emailVerified}
        />
        {formik.touched.email && formik.errors.email ? (
          <p className="text-red-500 text-xs italic mt-2">{formik.errors.email}</p>
        ) : null}

        {emailVerified && (
          <>
            <label
              className="block text-gray-700 text-sm font-bold mb-1 mt-4"
              htmlFor="password"
            >
              New Password:
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : ""
              }`}
              placeholder="********"
            />
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-500 text-xs italic mt-2">
                {formik.errors.password}
              </p>
            ) : null}

            <label
              className="block text-gray-700 text-sm font-bold mb-1 mt-4"
              htmlFor="confirmPassword"
            >
              Confirm New Password:
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                formik.touched.confirmPassword &&
                formik.errors.confirmPassword
                  ? "border-red-500"
                  : ""
              }`}
              placeholder="********"
            />
            {formik.touched.confirmPassword &&
            formik.errors.confirmPassword ? (
              <p className="text-red-500 text-xs italic mt-2">
                {formik.errors.confirmPassword}
              </p>
            ) : null}
          </>
        )}

        <button
          type="submit"
          className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-6"
        >
          {emailVerified ? "Reset Password" : "Verify Email"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;