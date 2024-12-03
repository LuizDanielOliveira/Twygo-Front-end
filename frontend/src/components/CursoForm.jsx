import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import './CursoForm.css';


const CursoForm = () => {
  const [curso, setCurso] = useState({
    nome: "",
    descricao: "",
    dataTermino: "",
    linkVideo: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/cursos", curso);
      alert("Curso cadastrado com sucesso!");
      setCurso({ nome: "", descricao: "", dataTermino: "", linkVideo: "" });
    } catch (error) {
      console.error("Erro ao cadastrar curso:", error);
    }
  };

  return (
    <div className="curso-form-container">
      <header className="curso-form-header">
        <h1>Cadastrar Novo Curso</h1>
        <Link to="/" className="curso-back-button">
          Voltar
        </Link>
      </header>
      <form onSubmit={handleSubmit} className="curso-form">
        <label>Nome do Curso</label>
        <input
          type="text"
          placeholder="Nome do Curso"
          value={curso.nome}
          onChange={(e) => setCurso({ ...curso, nome: e.target.value })}
          required
        />
        <label>Descrição</label>
        <textarea
          placeholder="Descrição do Curso"
          value={curso.descricao}
          onChange={(e) => setCurso({ ...curso, descricao: e.target.value })}
          required
        />
        <label>Data de Término</label>
        <input
          type="date"
          value={curso.dataTermino}
          onChange={(e) => setCurso({ ...curso, dataTermino: e.target.value })}
          required
        />
        <label>Link do Vídeo</label>
        <input
          type="url"
          placeholder="Link para o Vídeo"
          value={curso.linkVideo}
          onChange={(e) => setCurso({ ...curso, linkVideo: e.target.value })}
          required
        />
        <button type="submit" className="curso-form-submit-button">
          Salvar Curso
        </button>
      </form>
    </div>
  );
};

export default CursoForm;
