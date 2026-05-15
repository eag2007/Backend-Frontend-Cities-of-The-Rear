import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { City } from "../../Models/City";
import "./CitiesMap.css";
import CityMapCard from "../CityMapCard/CityMapCard";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const getCityIcon = (categories: number[]) => {
  let color = "#b22222";
  let symbol = "★";

  return L.divIcon({
    className: "custom-marker",
    html: `<div style="
      background-color: ${color};
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 3px solid white;
      box-shadow: 0 2px 5px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      font-weight: bold;
      color: white;
      cursor: pointer;
      transition: transform 0.2s;
    ">${symbol}</div>`,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
};

interface CitiesMapProps {
  cities: City[];
  center?: [number, number];
  zoom?: number;
  onCitySelect?: (city: City) => void;
}

function ChangeMapView({
  center,
  zoom,
}: {
  center: [number, number];
  zoom: number;
}) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

const CitiesMap = ({
  cities,
  center = [55.751244, 37.618423],
  zoom = 5,
  onCitySelect,
}: CitiesMapProps) => {
  const [openPopupId, setOpenPopupId] = useState<number | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const handleMarkerClick = (city: City) => {
    setOpenPopupId(city.id);
    if (onCitySelect) {
      onCitySelect(city);
    }
  };

  const handlePopupClose = () => {
    setOpenPopupId(null);
  };

  const handleCardClick = (city: City) => {
    if (onCitySelect) {
      onCitySelect(city);
    }
  };

  // useEffect(() => {
  //   console.log(cities);
  // }, []);

  return (
    <div className="cities-map-container">
      <MapContainer
        center={center}
        zoom={zoom}
        className="cities-map"
        style={{ height: "100%", width: "100%" }}
      >
        <ChangeMapView center={center} zoom={zoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={city.coordinates}
            icon={getCityIcon(city.categories)}
            eventHandlers={{
              click: () => handleMarkerClick(city),
            }}
          >
            <Popup
              className="city-popup"
              autoPan={false}
              closeOnClick={false}
              autoClose={false}
              eventHandlers={{
                remove: () => handlePopupClose(),
              }}
            >
              <div
                className="popup-card-wrapper"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCardClick(city);
                }}
              >
                <CityMapCard city={city} />
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default CitiesMap;
