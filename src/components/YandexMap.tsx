import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

interface YandexMapProps {
  coords: [number, number];
  onCoordsChange: (coords: [number, number]) => void;
}

const YandexMap = ({ coords, onCoordsChange }: YandexMapProps) => {
  const handleMapClick = (e: any) => {
    const newCoords = e.get('coords');
    console.log('Клик по карте, новые координаты:', newCoords);
    onCoordsChange(newCoords);
  };

  return (
    <YMaps query={{ apikey: '0fff3d1a-5f89-4bd2-9edd-e87b96ef3575' }}>
      <div className="w-full h-[500px]">
        <Map
          defaultState={{ center: coords, zoom: 10 }}
          width="100%"
          height="100%"
          onClick={handleMapClick}
        >
          <Placemark
            geometry={coords}
            options={{ draggable: true }}
          />
        </Map>
      </div>
    </YMaps>
  );
};

export default YandexMap;
