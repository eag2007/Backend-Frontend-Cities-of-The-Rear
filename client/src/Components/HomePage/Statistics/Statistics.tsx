import "./Statistics.css";
import "../../../style.css";

type Props = {};

const Statistics = (props: Props) => {
  return (
    <div>
      <section className="statistics">
        <div className="stats-container">
          <h2>Статистика</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number" id="citiesCount">
                0
              </div>
              <div className="stat-label">Городов в базе</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">1941-1945</div>
              <div className="stat-label">Годы войны</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">63</div>
              <div className="stat-label">Города трудовой доблести</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Statistics;
