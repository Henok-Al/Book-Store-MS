import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Books from "./components/Books";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import AddStudent from "./components/AddStudent";
import { useState } from "react";
import Logout from "./components/Logout";
import axios from "axios";
import { useEffect } from "react";
import AddBook from "./components/AddBook";
import DeleteBook from "./components/DeleteBook";
import EditBook from "./components/EditBook";

function App() {
  const [role, setRole] = useState("");

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get(`${import.meta.env.BASE_URL}/auth/verify`)
      .then((res) => {
        if (res.data.login) {
          setRole(res.data.role);
        } else {
          setRole("");
        }
        console.log(res);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <BrowserRouter>
      <Navbar role={role} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/books" element={<Books role={role} />}></Route>
        <Route path="/login" element={<Login setRoleVar={setRole} />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/addstudent" element={<AddStudent />}></Route>
        <Route path="/logout" element={<Logout setRole={setRole} />}></Route>
        <Route path="/addbook" element={<AddBook />}></Route>
        <Route path="/book/:id" element={<EditBook />}></Route>
        <Route path="/delete/:id" element={<DeleteBook />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
