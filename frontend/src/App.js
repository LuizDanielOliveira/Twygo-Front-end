import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import CursoList from "./components/CursoList";
import CursoForm from "./components/CursoForm";
import CursoEdit from "./components/CursoEdit";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CursoList />} />
        <Route path="/cadastrar" element={<CursoForm />} />
        <Route path="/editar/:id" element={<CursoEdit />} />
      </Routes>
    </Router>
  );
};

export default App;
