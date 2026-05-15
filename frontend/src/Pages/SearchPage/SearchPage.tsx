import "./SearchPage.css";
import "../../style.css";
import CitiesGrid from "../../Components/SearchPage/CitiesGrid/CitiesGrid";
import { City } from "../../Models/City";
import { useEffect, useState } from "react";
import { getAllCitiesApi, getCityByIdApi } from "../../Services/CityService";
import { Search } from "lucide-react";

type Props = {};

let data: City[] = [
  {
    id: 1,
    name: "Челябинск",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo6O3sR0464ER0b4JrsZgBmiYniWfsQJZ2hQ&s",
    shortDesc:
      "В годы войны Челябинск называли 'Танкоградом'. Производство танков КВ и ИС, а также дизель-моторов. Каждый второй танк Т-34 имел двигатель, сделанный в Челябинске.",
    longDesc: "gbrt",
    contribution: "Танки, двигатели, боеприпасы",
    categories: [1, 2],
    coordinates: [1, 1],
  },
];

const categoriesMap: { [key: string]: number[] } = {
  all: [],
  weapon: [1],
  uniform: [2],
  technic: [3],
  food: [4],
};

const SearchPage = (props: Props) => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [cities, setCities] = useState<City[]>([
    {
      id: 1,
      name: "",
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
      });
  };

  useEffect(() => {
    setCities(data);
    // getCities();
  }, []);

  const filteredData = cities.filter((city) => {
    if (activeCategory !== "all") {
      console.log("Here");
      const catIds = categoriesMap[activeCategory];
      if (!city.categories.some((c) => catIds.includes(c))) return false;
    }
    if (
      searchTerm &&
      !city.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
      return false;

    return true;
  });

  return (
    <div>
      <main>
        <div className="container">
          <div className="filters-panel">
            <div className="search-box">
              <input
                type="text"
                placeholder={"Поиск города..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="category-filters" id="categoryFilters">
              {["all", "weapon", "technic", "food", "uniform"].map((cat) => (
                <button
                  key={cat}
                  className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat === "all"
                    ? "Все"
                    : cat === "weapon"
                      ? "Оружие"
                      : cat === "technic"
                        ? "Техника"
                        : cat === "food"
                          ? "Продовольствие"
                          : "Обмундирование"}
                </button>
              ))}
            </div>
          </div>

          <div id="citiesContainer" className="cities-grid">
            <CitiesGrid data={filteredData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchPage;
