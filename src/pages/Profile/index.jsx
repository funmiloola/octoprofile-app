import Chart from "./charts";
import Footer from "./footer";
import Profile from "./profile";
import Repo from "./repo";

export  default function  ProfileSection() {
    return (
        <section >
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
            
        </section>
  )
}