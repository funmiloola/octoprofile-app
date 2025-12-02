import Chart from "./charts";
import Footer from "./footer";
import Profile from "./profile";
import Repo from "./repo";
import { useSearchUsersQuery } from "../../redux/services/octokit";
import { useParams } from "react-router-dom";
import { Logo } from "../../components/Icon";
export default function ProfileSection() {
      const { username } = useParams();
      const { isLoading, isError,error } = useSearchUsersQuery(username);
      
     
      
    return (
    <>
        { isError && error?.status === 404 ? (
           <div className="bg-[#1a1e22] w-full h-screen font-inter">
                    <div className="flex flex-col gap-10 items-center pt-36 font-inter px-6 md:px-0">
                    <Logo />
                    <h2 className="text-5xl text-center text-white font-medium">OctoProfile</h2>
                    <p className="text-white text-lg">User not found!</p>
                    </div>
                    </div>  
        ) : (
                    <section >
                        {isLoading ? (
                            <div className="bg-[#1a1e22] w-full h-screen">
                                <p className="text-white text-center pt-25 ">Loading...This might take a few moments.</p>
                                </div>
                        )  : (
                          <div className="relative">
            <Profile />
            <div className="bg-[#f6f8fa]">
                 <div className=" absolute top-[15%] md:top-[20%] xl:top-[34%] left-1/2 -translate-x-1/2 px-4 ">
                    <Chart />
                    </div>
                    <Repo />
                     <Footer/>
                </div>
               
            </div>

                        )
                           
                        }
            
        </section>     
        )}
     </>   
  )
}