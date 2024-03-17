"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAppSelector } from "@/lib/hooks";

import Header from "@/components/Header";
import Pagination from "@/components/Pagination";
import CategoryList from "@/components/CategoryList";
import {
  useGetCategoryListQuery,
  useGetLoggedInUserDetailsQuery,
} from "@/lib/services/api";

export default function Home() {
  const router = useRouter();
  const { isLoggedIn, id } = useAppSelector((state) => state.auth);
  const [page, setPage] = useState<number>(0);
  const { isLoading, data, error } = useGetLoggedInUserDetailsQuery({ id });
  const {
    isLoading: loading,
    data: list,
    error: err,
  } = useGetCategoryListQuery(null);

  if (isLoading || loading) {
    return <h1 className="text-center text-4xl my-6">Loading...</h1>
  }

  if (error || err) {
    return router.push("/login");
  }

  if (!isLoggedIn) {
    return router.push("/login");
  }

  return (
    <main className="">
      <Header />

      <main className="flex justify-center">
        <div className="container px-2 flex justify-center items-center min-h-[90vh] py-12">
          <form className="w-[576px] border-2 border-[#C1C1C1] p-14 rounded-[20px]">
            <h2 className="text-[32px] font-semibold text-center">
              Please mark your interests!
            </h2>
            <p className="text-[16px] font-normal text-center my-5">
              We will keep you notified.
            </p>
            <div>
              <h3 className="text-xl font-medium">My saved interests!</h3>
              <ul className="my-6">
                <CategoryList
                  page={page}
                  myList={data?.user?.categories}
                  categoryList={list?.data}
                />
              </ul>
            </div>
            <Pagination page={page} setPage={setPage} dataLength={list?.data?.length} />
          </form>
        </div>
      </main>
    </main>
  );
}
