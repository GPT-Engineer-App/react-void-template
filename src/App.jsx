import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import About from "./pages/About.jsx";
import Events from "./pages/Events.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
      <Route path="/events" element={<Events />} />
      </Routes>
    </Router>
  );
}

export default App;