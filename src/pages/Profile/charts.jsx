import { useParams } from "react-router-dom"
import { useGetReposQuery } from "../../redux/services/octokit"
import { Pie,Bar,Doughnut } from "react-chartjs-2"

import {  Chart as ChartJS, CategoryScale, LinearScale, BarElement,ArcElement,Tooltip,Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

export default function Chart() {
    const { username } = useParams()
    const { data: dataRepos } = useGetReposQuery(username)
    console.log("data", dataRepos)
    const languages = dataRepos?.map((repo) => repo.language) || []
    const starred = dataRepos?.map(repo => ({
        name: repo.name,
        stars: repo.stargazers_count
    })) || [];
    const starredLang = (dataRepos || []).reduce((acc, repo) => {
        const lang = repo.language || "Unknown";
        acc[lang] = (acc[lang] || 0) + repo.stargazers_count;
        return acc;
    }, {});

    console.log("lang", starredLang)
    console.log("languages", languages)
    console.log("star", starred)
    const languageCount = languages.reduce((acc, lang) => {
        const key = lang === null ? "Others" : lang;
        acc[key] = (acc[key] || 0) + 1
        return acc;
        
    }, {})
    const maxStarred = starred.slice().sort((a, b) => b.stars - a.stars).slice(0, 5)
    const labels = Object.keys(languageCount)
    const values = Object.values(languageCount)
    const barLabels = maxStarred.map(repo => repo.name);
    const barValues = maxStarred.map(repo => repo.stars);
    const pieLabels = Object.keys(starredLang).filter(key => starredLang[key] > 0)
    const pieValues = Object.values(starredLang).filter(v => v > 0)
    const LANGUAGE_COLORS = {
        JavaScript: "#f5e98b",
        TypeScript: "#6a9dac",
        Vue: "#41B883",
        React: "#61DAFB",
        HTML: "#eb8167",
        CSS:"#8877a3",
        Others: "#dbdbdb"
    };
    const backgroundColor1 = labels.map((lang) => LANGUAGE_COLORS[lang] || LANGUAGE_COLORS["Others"])
    const backgroundColor2 = pieLabels.map((lang) => LANGUAGE_COLORS[lang] || LANGUAGE_COLORS["Others"] )

const pieData = {
  labels,
  datasets: [
    {
      data: values,
      backgroundColor: backgroundColor1,
    },
  ],
};

const pieOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      position: "right",
      align: "start",
      labels: {
        boxWidth: 50,
        boxHeight: 18,
        font: {
          family: "Inter, sans-serif",
          size: 14,
          weight: "400",
        },
      },
    },
    tooltip: {
      enabled: true,
      bodyFont: { family: "Inter, sans-serif" },
      titleFont: { family: "Inter, sans-serif" },
    },
  },
};

const barData = {
  labels: barLabels,
  datasets: [
    {
      label: "",
      data: barValues,
      backgroundColor: ["#ff91a9", "#72bef1", ""],
      barPercentage: 0.7,
      categoryPercentage: 1.0,
    },
  ],
};

const barOptions = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: { top: 0, bottom: 20 },
  },
  plugins: {
    legend: { display: false },
    tooltip: {
      enabled: true,
      bodyFont: { family: "Inter, sans-serif" },
      titleFont: { family: "Inter, sans-serif" },
    },
  },
  scales: {
    x: {
      ticks: {
        minRotation: 60,
        maxRotation: 60,
        font: { family: "Inter, sans-serif", size: 12, weight: "400" },
      },
      grid: { display: true },
    },
    y: {
      beginAtZero: true,
      ticks: { font: { family: "Inter, sans-serif", size: 12, weight: "400" } },
      grid: { color: "rgba(0,0,0,0.1)" },
    },
  },
};

const doughnutData = {
  labels: pieLabels,
  datasets: [
    {
      data: pieValues,
      backgroundColor: backgroundColor2,
    },
  ],
};

const doughnutOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: "right",
      align: "start",
      labels: {
        boxWidth: 50,
        boxHeight: 18,
        font: { family: "Inter, sans-serif", size: 14, weight: "400" },
      },
    },
    tooltip: {
      enabled: true,
      bodyFont: { family: "Inter, sans-serif" },
      titleFont: { family: "Inter, sans-serif" },
    },
  },
};

    return (
       
        <div className="flex flex-col xl:flex-row justify-items-center gap-10 font-inter">
            <div className="border border-white shadow-sm bg-white  p-4 md:p-10 rounded-sm">
                <div className="w-[300px] md:w-[330px]">
                    <h2 className="text-3xl  text-[#24292e] font-medium underline decoration-dashed decoration-2 decoration-[#dbdbdb] underline-offset-12 pb-8">Top Languages</h2>
      <Pie data={pieData} options={pieOptions}/>
                </div> 
            </div>
            <div className="border border-white bg-white shadow-sm p-4 md:p-10 rounded-sm">
                <div className="w-[300px] md:w-[330px] h-[360px] md:h-[330px]">
                    <h2 className="text-3xl  text-[#24292e] font-medium underline decoration-dashed decoration-2 decoration-[#dbdbdb] underline-offset-12 pb-8">Most Starred</h2>
                <Bar data={ barData} options={barOptions} />
                </div>  
            </div>
            
            <div className="border border-white bg-white shadow-sm  p-4 md:p-10 rounded-sm">
                <div className="w-[300px] md:w-[330px]">
                    <h2 className="text-3xl text-[#24292e] font-medium underline decoration-dashed decoration-2 decoration-[#dbdbdb] underline-offset-12 pb-10">Stars Per Language</h2>
                    {pieValues?.length > 0 ? (
           <Doughnut data={doughnutData} options={doughnutOptions}/>
                    ) : (
                            <p className="text-[#586069]">Nothing to see here!</p>
                    )}
                
                </div>
                </div>
            </div>
            
  );
 }