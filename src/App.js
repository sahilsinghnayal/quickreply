import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Addreply from "./Components/Addreplycomp/Addreply";
import ViewReply from "./Components/ViewReplyComp/ViewReply";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Addreply />} />
          <Route path="/viewreply" element={<ViewReply />} />
         
        </Routes>
      </Router>
    </div>
  );
}

export default App;
