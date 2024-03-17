"use client";

import { useEffect, useState } from "react";

export default function Pagination({ page, setPage, dataLength }: any) {
  const [pagination, setPagination] = useState([0, 1, 2, 3, 4, 5, 6]);
  const [maxPage, setMaxPage] = useState(Math.round(dataLength / 6) - 1);

  useEffect(() => {}, [page]);

  // handle the next set of page on click of >> arrows
  function handleNextSet() {
    if (pagination[6] > maxPage) return;
    let init = pagination[6] + 7 >= maxPage ? maxPage - 7 : pagination[6] + 1;
    let arr = [];
    for (let i = init; i < init + 7; i++) {
      arr.push(i);
    }
    setPagination(arr);
    if (!arr.includes(page)) {
      setPage(arr[0]);
    }
  }

  // // handle the previous set of page on click of >> arrows
  function handlePreviousSet() {
    if (pagination[0] === 0) return;
    let init = pagination[0] - 7 > 0 ? pagination[0] - 7 : 0;
    let arr = [];
    for (let i = init; i < init + 7; i++) {
      arr.push(i);
    }
    setPagination(arr);
    if (!arr.includes(page)) {
      setPage(arr[6]);
    }
  }

  // handle next page
  function handleNext() {
    if (page > maxPage) return;
    if (page >= pagination[6]) {
      handleNextSet();
    } else {
      setPage(page + 1);
    }
  }

  // handle previous page
  function handlePrevious() {
    if (page == 0) return;
    if (page <= pagination[0]) {
      handlePreviousSet();
    } else {
      setPage(page - 1);
    }
  }

  return (
    <>
      <div className="flex gap-5 text-xl">
        <span onClick={handlePreviousSet} className={`cursor-pointer`}>
          &lt;&lt;
        </span>
        <span onClick={handlePrevious} className={`cursor-pointer`}>
          &lt;
        </span>
        <span className="flex gap-2">
          {pagination.map((e, i) => (
            <span
              key={i}
              className={`${
                e == page && "font-bold text-[22px]"
              } cursor-pointer`}
              onClick={() => setPage(e)}
            >
              {e + 1}
            </span>
          ))}
        </span>
        <span onClick={handleNext} className={`cursor-pointer`}>
          &gt;
        </span>
        <span onClick={handleNextSet} className={`cursor-pointer`}>
          &gt;&gt;
        </span>
      </div>
    </>
  );
}
