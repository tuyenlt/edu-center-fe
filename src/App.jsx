import Signin from "./pages/SignIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthContextProvider from "@/providers/authProvider"
import PrivateRoute from "./routes/PrivateRoute";
import Home from "./pages/Home";
import NotFoundRedirect from "./routes/NotFoundRedirect";

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route path="/login" element={<Signin />} />
          {/* Protect dashboard: only accessible if logged in */}
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="*" element={<NotFoundRedirect />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
