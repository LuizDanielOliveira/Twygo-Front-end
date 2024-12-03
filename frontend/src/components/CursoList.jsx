import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import api from "../services/api";
import "./CursoList.css";

const CursoList = () => {
  const [cursos, setCursos] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("recentes");
  const [selectedCurso, setSelectedCurso] = useState(null);
  const [totalDuration, setTotalDuration] = useState(0);
  const [optionsVisible, setOptionsVisible] = useState({});

  useEffect(() => {
    const fetchCursos = async () => {
      try {
        const response = await api.get("/cursos");
        setCursos(response.data);

        const totalDuration = response.data.reduce((total, curso) => {
          if (curso.duracao) {
            return total + curso.duracao;
          }
          return total;
        }, 0);

        setTotalDuration(totalDuration);
      } catch (error) {
        console.error("Erro ao buscar cursos:", error);
      }
    };
    fetchCursos();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/cursos/${id}`);
      setCursos(cursos.filter((curso) => curso.id !== id));
      alert("Curso excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir curso:", error);
    }
  };

  const toggleOptions = (id) => {
    setOptionsVisible((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const filteredCursos = cursos
    .filter((curso) =>
      curso.nome.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (filter === "recentes") {
        return new Date(b.dataTermino) - new Date(a.dataTermino);
      } else {
        return new Date(a.dataTermino) - new Date(b.dataTermino);
      }
    });

  return (
    <div className="curso-page">
      <div className="curso-list-container">
        <header className="curso-list-header">
          <h1>Lista de Cursos</h1>
          <div className="curso-filters">
            <input
              type="text"
              placeholder="Pesquisar curso..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="curso-search"
            />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="curso-filter"
            >
              <option value="recentes">Mais Recentes</option>
              <option value="antigos">Mais Antigos</option>
            </select>
          </div>
          <Link to="/cadastrar" className="curso-add-button">
            + Adicionar Curso
          </Link>
        </header>
        <div className="curso-list">
          {filteredCursos.map((curso) => (
            <div
              key={curso.id}
              className={`curso-card ${
                new Date(curso.dataTermino) < new Date() ? "curso-expired" : ""
              }`}
            >
              <div className="curso-card-header">
  
  <div className="curso-options">
    <button
      className="curso-options-button"
      onClick={() => toggleOptions(curso.id)}
    >
      ⋮
    </button>
    {optionsVisible[curso.id] && (
      <div className="curso-options-dropdown">
        <button
          onClick={() => handleDelete(curso.id)}
          className="curso-options-delete"
        >
          Excluir
        </button>
        <Link
          to={`/editar/${curso.id}`}
          className="curso-options-edit"
        >
          Editar
        </Link>
      </div>
    )}
  </div>
</div>
              <h2>{curso.nome}</h2>
              <p>{curso.descricao}</p>
              <p>
                <strong>Data de Término:</strong>{" "}
                {new Date(curso.dataTermino).toLocaleDateString()}
              </p>
              <ReactPlayer
                url={curso.linkVideo}
                controls={true}
                width="100%"
                height="200px"
                className="curso-video"
                onClick={() => setSelectedCurso(curso)}
              />
            </div>
          ))}
        </div>
        <footer className="curso-footer">
          <p>
            <strong>Total de Duração dos Vídeos:</strong>{" "}
            {Math.floor(totalDuration / 60)} minutos e {totalDuration % 60}{" "}
            segundos
          </p>
        </footer>
      </div>

      {selectedCurso && (
        <div className="curso-modal">
          <div className="curso-modal-content">
            <button
              className="curso-modal-close"
              onClick={() => setSelectedCurso(null)}
            >
              &times;
            </button>
            <div className="curso-modal-header">
              <h2>{selectedCurso.nome}</h2>
              <p>{selectedCurso.descricao}</p>
            </div>
            <div className="curso-modal-body">
              <ReactPlayer
                url={selectedCurso.linkVideo}
                controls={true}
                width="100%"
                height="400px"
              />
              <p>
                <strong>Data de Término:</strong>{" "}
                {new Date(selectedCurso.dataTermino).toLocaleDateString()}
              </p>
              <div className="curso-comments">
                <h3>Comentários</h3>
                <textarea
                  placeholder="Escreva seu comentário..."
                  rows="4"
                  className="curso-comment-input"
                ></textarea>
                <button className="curso-comment-submit">Enviar</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CursoList;
