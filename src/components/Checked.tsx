"use client";
import Image from "next/image";

import { useAppSelector } from "@/lib/hooks";
import {
  useAddToMySavedListMutation,
  useRemoveFromMySavedListMutation,
} from "@/lib/services/api";

interface Props {
  name: string;
  id: string;
  isSaved: Boolean;
}

export default function Checked({ name, id, isSaved }: Props) {
  const { id: userId } = useAppSelector((state) => state.auth);
  const [addItem, { isLoading }] = useAddToMySavedListMutation();
  const [removeItem, { isLoading: loading }] =
    useRemoveFromMySavedListMutation();

  async function addItemToSavedList() {
    await addItem({ userId, categoryId: id });
  }

  async function removeItemFromSavedList() {
    await removeItem({ userId, categoryId: id });
  }

  return (
    <>
      <li className="flex mb-5 gap-4">
        <Image
          src={`./images/icn_${isSaved ? "" : "un_"}checked.svg`}
          alt="checked_icon"
          width={24}
          height={24}
          className={`cursor-pointer ${(isLoading || loading) && "opacity-50"}`}
          onClick={isSaved ? removeItemFromSavedList : addItemToSavedList}
        />
        <p>{name}</p>
      </li>
    </>
  );
}
