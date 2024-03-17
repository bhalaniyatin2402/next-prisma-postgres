"use client";
import { useEffect, useState } from "react";

import Checked from "./Checked";

export default function CategoryList({ page, myList, categoryList }: any) {
  const [list, setList] = useState([]);

  useEffect(() => {
    let arr: any = [];
    for (let i = page * 6; i < page * 6 + 6; i++) {
      arr.push(categoryList[i]);
    }
    setList(arr);
  }, [page]);

  return (
    <>
      {list.map((e: any, i) => (
        <Checked
          key={e?.id}
          id={e?.id}
          name={e?.name}
          isSaved={myList.includes(e?.id)}
        />
      ))}
    </>
  );
}
