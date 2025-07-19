import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import BatchSMSCheck from './pages/BatchSMSCheck';
import Navbar from './components/Navbar';
import BatchEmailCheck from './pages/BatchEmailCheck';
import Layout from './components/Layout';
import About from './pages/About';
import CallFraudChecker from './pages/CallFraudChecker';
import FAQ from './pages/FAQ';
import SpamHamPieChart from './pages/SMSstats';
import Signup from './pages/Signup';
import Login from './pages/Login';
import VideoPlayer from "./pages/VideoPage";
function App() {
  return (
    <>
      <Navbar />
       <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/sms-check" element={<BatchSMSCheck />} />
        <Route path="/email-check" element = {<BatchEmailCheck/>}/>
        <Route path="/call-check" element = {<CallFraudChecker/>}/>
        <Route path="/sms-chart" element = {<SpamHamPieChart/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/video" element={<VideoPlayer />} />
      </Routes>
      </Layout>
    </>
  );
}

export default App;
