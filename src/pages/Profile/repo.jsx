import { Link, useParams } from "react-router-dom";
import { useGetReposQuery } from "../../redux/services/octokit";
import { useState } from "react";
import { Fork, Icondown, Iconup, RepoIcon,Star } from "../../components/Icon";
import FlipMove from "react-flip-move";
export default function Repo() {
    const { username } = useParams();
    const { data } = useGetReposQuery(username);
    const [filterType, setFilterType] = useState("star");
    const [isOpen, setIsOpen] = useState(false)
    const filteredRepo = () => {
        switch (filterType) {
            case "star":
                return data?.filter((repo) => repo.stargazers_count >= 0).slice(2, 8);
            case "fork":
                return data?.filter((repo) => repo.forks_count >= 0).slice(3, 9);
            case "size":
                return data
                    ?.filter((repo) => repo.size >= 1000)
                    .sort((a, b) => b.size - a.size)
                    .slice(0, 6);
            default:
                return data;
        }
    };

    const options = ["star", "fork", "size"];

    return (
        <div className="pt-[1300px] md:pt-[1440px] xl:pt-[480px] font-inter px-6 md:px-[86px]">
            
            <div className="flex items-center gap-4">
                <h2 className="text-lg md:text-3xl text-[#24292e] flex items-end gap-4">
                    <span className="underline decoration-dashed decoration-2 decoration-[#dbdbdb] underline-offset-12 font-medium">
                        Top Repos
                    </span>
                    <span className="text-lg text-gray-400">by</span>
                </h2>

               
                <div className="relative">
                    <button
                        className="flex items-center gap-6 justify-between bg-blue-100 text-blue-500 py-2 px-2 rounded-md  focus:outline-none"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {filterType}
                        <span className="ml-2">{isOpen ? <Iconup /> : <Icondown />}</span>
                    </button>

                    {isOpen && (
                        <ul className="absolute z-10  w-full bg-blue-100 border border-gray-200 rounded-md shadow-lg">
                            {options.map((opt) => (
                                <li
                                    key={opt}
                                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer text-blue-500"
                                    onClick={() => {
                                        setFilterType(opt);
                                        setIsOpen(false);
                                    }}
                                >
                                    {opt}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* Repo Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 pt-14">
                {filteredRepo()?.map((repo) => (
                    <FlipMove key={repo.id}>
                        <Link to={`https://github.com/${username}/${repo.name}`} target="_blank">
                            <div className="bg-white rounded-md p-8 min-h-[225px] shadow-md">
                                <div className="flex gap-2 items-center">
                                    <RepoIcon />
                                    <h2 className="font-medium text-xl text-[#24292E]">{repo.name}</h2>
                                </div>

                                <h3 className="text-sm pt-4 text-[#6a737d]">{repo.description}</h3>

                                <div className="flex justify-between pt-4">
                                    <div className="flex gap-3 items-center">
                                        <div className="flex items-center gap-2">
                                            <span
                                                className={`w-3 h-3 rounded-full ${repo.language === "CSS"
                                                        ? "bg-[#8877a3]"
                                                        : repo.language === "HTML"
                                                            ? "bg-[#eb8167]"
                                                            : repo.language === "JavaScript"
                                                                ? "bg-[#f5e98b]"
                                                                : repo.language === "TypeScript"
                                                                    ? "bg-[#6a9dac]"
                                                                    : "bg-blue-500"
                                                    }`}
                                            ></span>
                                            <p className="text-[#6a737d] text-sm">{repo.language}</p>
                                        </div>
                                        <p className="flex gap-1 items-center">
                                            <Star />
                                            <span className="text-[#6a737d] text-sm"> {repo.stargazers_count}</span>
                                        </p>
                                        <p className="flex gap-1 items-center">
                                            <Fork />
                                            <span className="text-[#6a737d] text-sm">{repo.forks_count}</span>
                                        </p>
                                    </div>
                                    <div className="text-[#6a737d] text-sm">{repo.size.toLocaleString()} KB</div>
                                </div>
                            </div>
                        </Link>
                    </FlipMove>
                ))}
            </div>
        </div>
    )
}