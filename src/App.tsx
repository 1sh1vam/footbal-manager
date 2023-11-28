import Formation from "./containers/Formation";
import Roster from "./containers/Roster";
import Sidebar from "./containers/Sidebar";
import RosterContextProvider from "./context/roster";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <RosterContextProvider>
      <Router>
        <div className="h-full w-full flex flex-row app-bg">
          <Sidebar />
          <div className="flex-1 h-full p-10">
            <Routes>
              <Route path="/" element={<Roster />} />
              <Route path="/formation" element={<Formation />} />
            </Routes>
          </div>
        </div>
      </Router>
    </RosterContextProvider>
  );
}

export default App;
