import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {Logo } from "./Icon";
export default function Search() {
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const handleKeyUp = (event) => {
    if (event.key === "Enter" && input.trim() !== "") {
      navigate(`/user/${input.trim()}`);
    }
  };
    return (
      <div className="bg-[#1a1e22] w-full h-screen">
    <div className="flex flex-col gap-10 items-center pt-36 font-inter px-6 md:px-0">
      <Logo/>
      <h2 className="text-5xl text-center text-white font-medium">
        Find Your OctoProfile
      </h2>
      <input
        type="text"
        className="bg-[#26303c] w-full  md:w-1/3  p-4 text-center outline-none text-[#79b8ff] text-[32px] rounded-[4px] "
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyUp={handleKeyUp}
      />
            </div>
            </div>
  );
}
