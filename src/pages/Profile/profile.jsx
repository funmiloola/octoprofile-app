import { useSearchUsersQuery } from "../../redux/services/octokit";
import { useParams, Link } from "react-router-dom";
import { CalendarIcon, Location } from "../../components/Icon";
export default function Profile() {
  const { username } = useParams();
  const { data } = useSearchUsersQuery(username);
  console.log("data", data);
  
  return (
    <section className="bg-[#1a1e22] w-full ">
      <div className="flex flex-col items-center font-inter pt-14 ">
        <img
          src={data?.avatar_url}
          alt=""
          className="w-37.5 h-37.5 rounded-full border-8 border-[#0070f3]"
        />
        <h2 className="text-white text-2xl md:text-5xl font-medium pt-5">
          {data?.name}
        </h2>
        <Link to={`https://github.com/${username}`}>
          <h3 className="text-lg font-mono md:text-3xl text-[#0070f3] pt-3">
            @{data?.login}
          </h3>
        </Link>
        <div className="flex flex-col items-center md:flex-row gap-3 pt-5">
                  <div className="flex gap-2 items-center ">
                      {data?.location &&
                          <>
                      <Location />
            <p className="text-[#C8E1FF]">{data?.location}</p>    
                      </>
                      }
            
          </div>

          <div className="flex gap-2 items-center">
            <CalendarIcon />
            <p className="text-[#C8E1FF]">
              Joined{" "}
              {new Date(data?.created_at).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-2 pt-10 pb-38 md:pb-56">
          <div className="flex flex-col items-center gap-1 md:gap-4 border border-[#24292e] bg-[#24292e] rounded-md py-2 px-2 md:py-4 md:px-9">
            <p className="text-[#F6F8FA] text-lg md:text-3xl">
              {data?.public_repos}
            </p>
            <span className=" text-sm text-[#C8E1FFB3]">REPOSITORIES</span>
          </div>
          <div className="flex flex-col items-center  gap-1 md:gap-4 border border-[#24292e] bg-[#24292e] rounded-md py-2 px-2 md:py-4 md:px-9">
            <p className="text-[#F6F8FA] text-lg md:text-3xl">
              {data?.followers}
            </p>
            <span className="text-[#C8E1FFB3] text-sm ">FOLLOWERS</span>
          </div>
          <div className="flex flex-col items-center  gap-1 md:gap-4 border border-[#24292e] bg-[#24292e] rounded-md py-2 px-2 md:py-4 md:px-9">
            <p className="text-[#F6F8FA] text-lg md:text-3xl">
              {data?.following}
            </p>
            <span className="text-[#C8E1FFB3] text-sm">FOLLOWING</span>
          </div>
        </div>
      </div>
    </section>
  );
}
