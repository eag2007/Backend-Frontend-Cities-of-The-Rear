import "./CityPage.css";
import "../../style.css";

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { City } from "../../Models/City";
import { Category } from "../../Models/Category";
import {
  Book,
  ChartColumn,
  Cog,
  NotebookText,
  Star,
  Tag,
  Trophy,
} from "lucide-react";
import { getCityByIdApi } from "../../Services/CityService";

const CityPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [city, setCity] = useState<City | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getCity();
    }
  }, [id]);

  const getCity = async () => {
    try {
      setLoading(true);
      const res = await getCityByIdApi(Number(id));
      if (res?.data) {
        setCity(res.data);
      }
    } catch (e) {
      console.log("No city found");
    } finally {
      setLoading(false);
    }
  };

  const categoryConfig: Record<string, { name: string }> = {
    Weapon: { name: "Оружие" },
    Technic: { name: "Техника" },
    Food: { name: "Продовольствие" },
    Uniform: { name: "Обмундирование" },
  };

  if (loading) {
    return (
      <div className="city-page-loading">
        <div className="loading-spinner"></div>
        <p>Загрузка...</p>
      </div>
    );
  }

  if (!city) {
    return (
      <div className="city-page-not-found">
        <div className="not-found-content">
          <i className="city-page-icon">🏙️</i>
          <h2>Город не найден</h2>
          <p>Запрошенный город отсутствует в базе данных</p>
          <Link to="/search" className="city-page-back-btn">
            Вернуться к поиску
          </Link>
        </div>
      </div>
    );
  }

  const fullDescription = city.longDesc || city.shortDesc;
  // Простая проверка на наличие HTML-тегов (начинается с < или содержит >)
  const hasHtmlContent = /<[^>]+>/i.test(fullDescription);

  return (
    <div className="city-page-page">
      <div className="city-page-hero">
        <div
          className="city-page-hero-image"
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.3)), url(${
              city.imageUrl ||
              "https://via.placeholder.com/1200x500?text=Фото+города"
            })`,
          }}
        >
          <div className="city-page-hero-overlay">
            <div className="city-page-badge">
              <span className="city-page-badge-icon">
                <Star color="#fff705" fill="#fff705" />
              </span>
              <span>Город трудовой доблести</span>
            </div>
            <h1 className="city-page-title">{city.names[0]}</h1>
          </div>
        </div>
      </div>

      <div className="city-page-content">
        <div className="city-page-grid">
          <div className="city-page-main">
            <section className="city-page-section">
              <h2 className="city-page-section-title">
                <span className="city-page-section-icon">
                  <Trophy />
                </span>
                Основной вклад в Победу
              </h2>
              <div className="city-page-contribution-card">
                <span className="city-page-contribution-icon">
                  <Cog />
                </span>
                <p className="city-page-contribution-text">
                  {city.contribution}
                </p>
              </div>
            </section>

            <section className="city-page-section">
              <h2 className="city-page-section-title">
                <span className="city-page-section-icon">
                  <NotebookText />
                </span>
                Краткое описание
              </h2>
              <div className="city-page-short-description">
                <p>{city.shortDesc}</p>
              </div>
            </section>

            <section className="city-page-section">
              <h2 className="city-page-section-title">
                <span className="city-page-section-icon">
                  <Book />
                </span>
                Подробная история
              </h2>
              <div className="city-page-full-description">
                {hasHtmlContent ? (
                  <div
                    className="city-page-quill-content"
                    dangerouslySetInnerHTML={{ __html: fullDescription }}
                  />
                ) : (
                  <p>{fullDescription}</p>
                )}
              </div>
            </section>
          </div>

          <div className="city-page-sidebar">
            {/* Категории */}
            <div className="city-page-sidebar-card">
              <h3 className="city-page-sidebar-title">
                <span className="city-page-sidebar-icon">
                  <Tag />
                </span>
                Категории
              </h3>
              <div className="city-page-categories-list">
                {city.categories.map((cat) => (
                  <span key={cat} className="city-page-category-tag">
                    <span>
                      {categoryConfig[Category[cat]]?.name || Category[cat]}
                    </span>
                  </span>
                ))}
              </div>
            </div>

            <div className="city-page-sidebar-card">
              <h3 className="city-page-sidebar-title">
                <span className="city-page-sidebar-icon">
                  <ChartColumn />
                </span>
                Статистика
              </h3>
              <div className="city-page-stats-list">
                <div className="city-page-stat-row">
                  <span className="city-page-stat-label">Статус:</span>
                  <span className="city-page-stat-value honor-badge">
                    Город трудовой доблести
                  </span>
                </div>
                <div className="city-page-stat-row">
                  <span className="city-page-stat-label">Вклад:</span>
                  <span className="city-page-stat-value">
                    {city.contribution.split(",").length} направлений
                  </span>
                </div>
                <div className="city-page-stat-row">
                  <span className="city-page-stat-label">Категории:</span>
                  <span className="city-page-stat-value">
                    {city.categories.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityPage;
