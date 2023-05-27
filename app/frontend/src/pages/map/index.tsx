'use client'
import { useEffect, useState } from 'react';

interface MapState {
  center: [number, number];
  zoom: number;
}

const Ymaps: React.FC = () => {
  const [isServer, setIsServer] = useState(false);
  const [Map, setMap] = useState<any>(null);
  const [Placemark, setPlacemark] = useState<any>(null);
  const [YMaps, setYMaps] = useState<any>(null);

  const mapState: MapState = {
    center: [55.76, 37.64], // Москва
    zoom: 10,
  };

  useEffect(() => {
    setIsServer(true);
    import('react-yandex-maps').then(({ YMaps, Map, Placemark }) => {
      setYMaps(() => YMaps);
      setMap(() => Map);
      setPlacemark(() => Placemark);
    });
  }, []);

  if (!isServer || !YMaps || !Map || !Placemark) return null;

  return (
    <YMaps>
      <Map state={mapState} apiKey="79641722-6071-445a-88c9-225ef0e8bd9b" className="w-80 h-80">
        <Placemark geometry={mapState.center} />
      </Map>
    </YMaps>
  );
};

export default Ymaps;
