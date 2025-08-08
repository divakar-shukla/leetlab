import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import AccountRegister from "./pages/Register";
import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Layout from "./layout/Layout";
import Problem from "./pages/problem";
import WorkSpace from "./pages/WorkSpace";
import { useAuthStore } from "./store/useAuthStore";
import { useNavigate } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import AddProblem from "./pages/AddProblem";
import { Edit } from "lucide-react";
import EditProblem from "./pages/EditProblem";

function App() {
  document.documentElement.classList.toggle(
    "dark",
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches),
  );

  const { authUser, getProfile } = useAuthStore();
  const navigate = useNavigate();

  const initProfile = async () => {};
  useEffect(() => {
    if (
      window.location.href !== "http://localhost:5173/login" &&
      window.location.href !== "http://localhost:5173/register"
    ) {
      (async () => {
        await getProfile();
      })();
    }
  }, [getProfile]);

  return (
    <div className="flex flex-col items-center justify-center">
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route
            path="/register"
            element={!authUser ? <AccountRegister /> : <Navigate to={"/"} />}
          />

          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to={"/"} />}
          />

          <Route
            path="problem"
            element={authUser ? <Problem /> : <Navigate to={"/login"} />}
          />
        </Route>
        <Route
          path="problem/:id"
          element={authUser ? <WorkSpace /> : <Navigate to={"/login"} />}
        />

        <Route path="/admin" element={<AdminLayout />}>
          <Route path="add-problem" element={<AddProblem />} />
          <Route path="edit-problem/:id" element={<EditProblem />} />
        </Route>
        {/* <Route path="/About" element={<About/>}/> */}
      </Routes>
    </div>
  );
}

export default App;
