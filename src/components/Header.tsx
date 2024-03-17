"use client";
import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";

export default function Header() {
  const { name } = useAppSelector((state) => state.auth);

  return (
    <>
      <div className="flex justify-center">
        <div className="container px-2">
          <div className="bg-white h-9 flex justify-end items-center">
            <ul className="flex gap-4">
              <li className="text-xs font-normal">Help</li>
              <li className="text-xs font-normal">Orders & Returns</li>
              <li className="text-xs font-normal">
                Hi, {name ? name : "John"}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="container px-2">
          <header className="flex h-16 bg-white justify-between items-center">
            <div className="text-[32px] font-bold">ECOMMERCE</div>
            <nav className="flex justify-center items-center gap-7 list-none">
              <li className="text-[16px] leading-[19.36px] font-semibold cursor-pointer">
                Categories
              </li>
              <li className="text-[16px] leading-[19.36px] font-semibold cursor-pointer">
                Sale
              </li>
              <li className="text-[16px] leading-[19.36px] font-semibold cursor-pointer">
                Clearance
              </li>
              <li className="text-[16px] leading-[19.36px] font-semibold cursor-pointer">
                New stock
              </li>
              <li className="text-[16px] leading-[19.36px] font-semibold cursor-pointer">
                Trending
              </li>
            </nav>
            <div className="flex gap-5">
              <Image
                src={"./images/icn_search.svg"}
                alt="search_icon"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <Image
                src={"./images/icn_cart.svg"}
                alt="cart_icon"
                width={32}
                height={32}
                className="h-8 w-8"
              />
            </div>
          </header>
        </div>
      </div>

      <div className="bg-[#F4F4F4] flex justify-center">
        <div className="container px-2">
          <div className="h-9 flex justify-center items-center gap-4">
            <Image
              src={"./images/icn_left_arrow.svg"}
              alt="cart_icon"
              width={16}
              height={16}
            />
            <p className="text-[14px] font-medium leading-[16.94px]">
              Get 10% off on business sign up
            </p>
            <Image
              src={"./images/icn_right_arrow.svg"}
              alt="cart_icon"
              width={16}
              height={16}
            />
          </div>
        </div>
      </div>
    </>
  );
}
