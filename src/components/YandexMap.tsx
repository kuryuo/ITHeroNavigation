import { YMaps, Map, Placemark } from '@pbe/react-yandex-maps';

const YandexMap = () => {
  return (
    <YMaps query={{ apikey: '0fff3d1a-5f89-4bd2-9edd-e87b96ef3575' }}>
      <div className="w-full h-[500px]">
        <Map
          defaultState={{ center: [55.751574, 37.573856], zoom: 10 }}
          width="100%"
          height="100%"
        >
          <Placemark geometry={[55.751574, 37.573856]} />
        </Map>
      </div>
    </YMaps>
  );
};

export default YandexMap;
