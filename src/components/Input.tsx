"use client";
import { ChangeEventHandler, useState } from "react";

interface Props {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  error?: string;
  toggle_show?: boolean;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value: string;
  touched: boolean | undefined;
}

export default function Input({
  label,
  name,
  type,
  placeholder,
  error,
  toggle_show,
  onChange,
  value,
  touched,
}: Props) {
  const [toggle, setToggle] = useState<string>("password");

  return (
    <>
      <div className="input relative mb-5">
        <label
          htmlFor={label}
          className="font-normal text-[16px] p-1 inline-block w-[100%] ps-0"
        >
          {label}
        </label>
        <input
          type={toggle_show ? toggle : type}
          id={label}
          name={name}
          className="h-12 rounded-md w-full border-2 border-[#C1C1C1] px-3"
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
        {toggle_show && (
          <span
            className="cursor-pointer absolute top-[50%] right-4 underline"
            onClick={() =>
              setToggle(toggle == "password" ? "text" : "password")
            }
          >
            show
          </span>
        )}
        {touched && error && (
          <p className="absolute text-red-700 font-semibold tracking-wider -bottom-5">
            {error}
          </p>
        )}
      </div>
    </>
  );
}
