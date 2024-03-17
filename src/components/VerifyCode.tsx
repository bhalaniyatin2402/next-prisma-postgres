import OtpInput from "react-otp-input";

export default function VerifyCode({ code, setCode }: any) {
  return (
    <>
      <div className="flex justify-between items-center w-full">
        <OtpInput
          value={code}
          onChange={setCode}
          numInputs={8}
          renderSeparator={<span> </span>}
          renderInput={(props) => <input {...props} />}
          inputType="number"
          inputStyle="otp-input-style"
          containerStyle="otp-container-style"
        />
      </div>
    </>
  );
}
