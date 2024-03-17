"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setCredentials } from "@/lib/slices/authSlice";
import { useAppDispatch } from "@/lib/hooks";

import Header from "@/components/Header";
import VerifyCode from "@/components/VerifyCode";
import { useVerifyEmailMutation } from "@/lib/services/api";

export default function Verify({ params }: any) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const email = params.email.replace(/%40/, "@");
  const [verify, { isLoading }] = useVerifyEmailMutation();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string>("");

  if (!email) {
    return router.push("/login");
  }

  const handleVerifyEmail = async (e: any) => {
    e.preventDefault()
    const res: any = await verify({ email, code });
    if (res.data) {
      dispatch(
        setCredentials({
          isLoggedIn: true,
          id: res?.data.user?.id,
          name: res?.data?.user?.name,
          email: res?.data?.user?.email,
        })
      );
      return router.push("/");
    }
    if (res.error) {
      setError(res?.error?.data?.error);
    }
  }

  return (
    <>
      <Header />

      <main className="flex justify-center">
        <div className="container px-2 flex justify-center items-center min-h-[90vh] py-12">
          <form className="w-[576px] border-2 border-[#C1C1C1] p-14 rounded-[20px]">
            <h2 className="text-[32px] font-semibold text-center">
              Verify your email
            </h2>
            <p className="text-center font-normal text-[16px] mt-5">
              Enter the 8 digit code you have received on
            </p>
            <p className="text-center font-medium text-[16px] mb-5">
              swa***@gmail.com
            </p>
            <div className="my-10">
              <p>Code</p>
              <VerifyCode code={code} setCode={setCode} />
            </div>
            <button
              onClick={handleVerifyEmail}
              className="w-full rounded-md bg-black h-14 font-medium text-white tracking-wider my-5"
              disabled={code.length < 8}
            >
              {isLoading ? "Loading.." : "VERIFY"}
            </button>
            {error && (
              <p className="text-center text-xl text-red-900">{error}</p>
            )}
          </form>
        </div>
      </main>
    </>
  );
}
