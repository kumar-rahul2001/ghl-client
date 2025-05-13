import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SetCredentials from "./pages/SetCredentials";
import Authorize from "./pages/Authorize";
import NotFound from "./pages/NotFound";
import LoadIframe from "./pages/LoadIframe";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/authorize" element={<Authorize />} />
        <Route path="/set-credentials" element={<SetCredentials />} />
        <Route path="/authorize" element={<Authorize />} />
        <Route path="/load-iframe" element={<LoadIframe />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
