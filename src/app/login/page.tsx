"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import { useState } from "react";
import { useAppDispatch } from "@/lib/hooks";

import Input from "@/components/Input";
import Header from "@/components/Header";
import { loginSchema } from "@/types/formSchema";
import { useLoginMutation } from "@/lib/services/api";
import { setCredentials } from "@/lib/slices/authSlice";

export default function Login() {
  const router = useRouter();
  const dispatch = useAppDispatch()
  const [login, { isLoading }] = useLoginMutation();
  const [error, setError] = useState<string>("");

  const { handleChange, handleSubmit, values, errors, touched } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const res: any = await login(values);
      if (res?.data) {
        dispatch(setCredentials({
          isLoggedIn: true,
          id: res?.data?.user?.id,
          email: res?.data?.user?.email,
          name: res?.data?.user?.name,
        }))
        return router.push("/");
      }
      if (res?.error) {
        setError(res?.error?.data?.error);
      }
    },
  });

  return (
    <>
      <Header />

      <main className="flex justify-center">
        <div className="container px-2 flex justify-center items-center min-h-[90vh] py-12">
          <form
            onSubmit={handleSubmit}
            className="w-[576px] border-2 border-[#C1C1C1] p-14 rounded-[20px]"
          >
            <h2 className="text-[32px] font-semibold text-center">Login</h2>
            <h3 className="text-2xl font-medium text-center mt-4 mb-1">
              Welcome back to ECOMMERCE
            </h3>
            <p className="text-[16px] font-normal text-center mb-4">
              The next gen business marketplace
            </p>
            <div className="inputs">
              <Input
                label="Email"
                type="text"
                name="email"
                placeholder="Enter your Email"
                error={errors.email}
                onChange={handleChange}
                value={values.email}
                touched={touched.email}
              />
              <Input
                label="Password"
                type="password"
                name="password"
                placeholder="Enter your Password"
                toggle_show={true}
                error={errors.password}
                onChange={handleChange}
                value={values.password}
                touched={touched.password}
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-black h-14 font-medium text-white tracking-wider my-5"
            >
              {isLoading ? "Loading.." : "LOGIN"}
            </button>
            {error && (
              <p className="text-center text-xl text-red-900">{error}</p>
            )}
            <hr className="mt-1 h-[1px] text-[#C1C1C1]" />
            <p className="font-normal my-4 text-center">
              Don’t have an Account? {"  "}
              <Link href="/sign-up" className="font-medium">
                SIGN UP
              </Link>
            </p>
          </form>
        </div>
      </main>
    </>
  );
}
