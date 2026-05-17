import "./Statistics.css";
import "../../../style.css";
import { useEffect, useState } from "react";
import { getAllCitiesApi } from "../../../Services/CityService";
import { City } from "../../../Models/City";
import { ClipLoader } from "react-spinners";

type Props = {};

const Statistics = (props: Props) => {
  const [loading, setLoading] = useState(true);

  const [cities, setCities] = useState<City[]>([
    {
      id: 1,
      names: [""],
      imageUrl: "",
      shortDesc: "",
      longDesc: "",
      contribution: "",
      categories: [1],
      coordinates: [1, 1],
    },
  ]);

  const getCities = async () => {
    await getAllCitiesApi()
      .then((res) => {
        if (res?.data) {
          setCities(res.data);
        }
      })
      .catch((e) => {
        console.log("No city found");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getCities();
  }, []);

  return (
    <div>
      <section className="statistics">
        <div className="stats-container">
          <h2>Статистика</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number" id="citiesCount">
                {loading ? (
                  <>
                    <ClipLoader />
                  </>
                ) : (
                  cities.length
                )}
              </div>
              <div className="stat-label">Городов в базе</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">1941-1945</div>
              <div className="stat-label">Годы войны</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">70</div>
              <div className="stat-label">Города трудовой доблести</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Statistics;
