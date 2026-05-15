import React from "react";
import { useNavigate } from "react-router";
import "./AddCityPageHeader.css";

type Props = {
  handleSave: () => void;
  saving: boolean;
};

const AddCityPageHeader = ({ handleSave, saving }: Props) => {
  const navigate = useNavigate();
  return (
    <div className="add-header">
      <div className="add-header-content">
        <button className="back-btn" onClick={() => navigate("/adminpanel")}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Назад
        </button>
        <h1>Добавление города</h1>
        <button className="save-btn" onClick={handleSave} disabled={saving}>
          {saving ? (
            <>
              <div className="btn-spinner"></div>
              Добавление...
            </>
          ) : (
            "Добавить город"
          )}
        </button>
      </div>
    </div>
  );
};

export default AddCityPageHeader;
