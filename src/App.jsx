import "./App.css";
import Auth from "./Components/AuthPage/Auth";
import { Route, Routes } from "react-router";
import Expense from "./Components/Expense/Expense";
import ForgotPassword from "./Components/AuthPage/Forgotpassword";
import Password from "./Components/AuthPage/Password";
import ReportGeneration from "./Components/Body/ReportGeneration";
import Errorpage from "./Components/ErrorPage/Errorpage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Auth />} />
      <Route path="/expenses" element={<Expense />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/resetpassword/:userId" element={<Password />} />
      <Route path="/reportgeneration" element={<ReportGeneration />} />
      <Route path="*" element={<Errorpage />} />
    </Routes>
  );
}

export default App;
