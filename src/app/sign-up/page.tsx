"use client";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import Header from "@/components/Header";
import Input from "@/components/Input";
import { registrationSchema } from "@/types/formSchema";
import { useSignupMutation } from "@/lib/services/api";

export default function SignUp() {
  const router = useRouter();
  const [signUp, { isLoading }] = useSignupMutation();
  const [error, setError] = useState<string>("");
  
  const { handleChange, handleSubmit, values, errors, touched } =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: "",
      },
      validationSchema: registrationSchema,
      onSubmit: async (values) => {
        const res: any = await signUp(values);
        if (res.data) {
          setError("")
          router.push(`/verify/${values.email}`);
        }
        if(res.error) {
          setError(res.error.data.error)
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
            <h2 className="text-[32px] font-semibold text-center">
              Create your account
            </h2>
            <div className="inputs">
              <Input
                label="Name"
                type="text"
                name="name"
                placeholder="Enter your name"
                error={errors.name}
                onChange={handleChange}
                value={values.name}
                touched={touched.name}
              />
              <Input
                label="Email"
                type="email"
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
              {isLoading ? "Loading..." : "CREATE ACCOUNT"}
            </button>
            {error && (
              <p className="text-center text-xl text-red-900">{error}</p>
            )}
            <p className="font-normal my-5 text-center">
              Have an Account? {"  "}
              <Link href="/login" className="font-medium">
                LOGIN
              </Link>
            </p>
          </form>
        </div>
      </main>
    </>
  );
}
