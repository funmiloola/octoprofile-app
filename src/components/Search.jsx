import { useState } from "react";
import { Octokit } from "@octokit/rest";
import { useNavigate } from "react-router-dom";
import { Logo } from "./Icon";
import { useSearchUsersQuery } from "../redux/services/octokit";
export default function Search() {
  const navigate = useNavigate();
    const [input, setInput] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false)
    const octokit = new Octokit({
    auth: import.meta.env.VITE_ACCESS_TOKEN, 
  });
    const handleKeyUp = async (event) => {
    if (event.key === "Enter" && input.trim() !== "") {
      setLoading(true);
      setError(null);

      try {
        const result = await octokit.request("GET /users/{username}", {
          username: input.trim(),
        });

        if (result.status === 200) {
          navigate(`/user/${input.trim()}`);
        } else {
          setError("User not found");
        }
      } catch (err) {
        if (err.status === 404) {
          setError("User not found");
        } else {
          setError("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className="bg-[#1a1e22] w-full h-screen">
      <div className="flex flex-col gap-10 items-center pt-36 font-inter px-6 md:px-0">
        <Logo />
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
        {loading && (
          <p className="text-2xl text-center text-white">
            Loading... Might take a few moments.
          </p>
        )}
        {error && (
                  <p className="text-red-500 text-center text-2xl">{error}</p>
        )}
      </div>
    </div>
  );
}
