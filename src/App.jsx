import Search from "./components/Search";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfileSection from "./pages/Profile";
function App() {
    return (
      <div >
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Search />}/>
        <Route path="/user/:username" element={<ProfileSection/>} />
      </Routes>
            </BrowserRouter>
             </div>
  );
}

export default App;
