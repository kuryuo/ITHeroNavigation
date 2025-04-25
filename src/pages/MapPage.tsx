import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import PlaceCard from "@/components/PlaceCard";
import AddPlaceModal from "@/components/AddPlaceModal";
import { Button } from "@/components/ui/button";
import YandexMap from "@/components/YandexMap";

interface Place {
  id: number;
  name: string;
  address: string;
  category: string;
  coords: [number, number];
}

const dummyPlaces: Place[] = [
  {
    id: 1,
    name: "Кафе 'Лесная Поляна'",
    address: "ул. Центральная, 5",
    category: "Кафе",
    coords: [55.751574, 37.573856],
  },
  {
    id: 2,
    name: "Парк Победы",
    address: "пр-т Мира, 12",
    category: "Парк",
    coords: [55.751244, 37.618423],
  },
];

export default function MapPage() {
  const [places, setPlaces] = useState<Place[]>(dummyPlaces);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [coords, setCoords] = useState<[number, number]>([56.838011, 60.597465]);

  const handleAddPlace = (response: any) => {
    const placeData = response.result; 
  
    const coordsFromPlace: [number, number] = [
      placeData.location.latitude,
      placeData.location.longitude,
    ];
  
    const id = places.length + 1; 
    setPlaces([...places, { id, ...placeData, coords: coordsFromPlace }]);
  };
  

  const handleNavigate = (id: number) => {
    console.log("Навигация к месту", id);
  };

  const handleRemove = (id: number) => {
    setPlaces(places.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />

      <div className="flex flex-1 overflow-hidden">
        <div className="w-2/3 h-screen">
          <YandexMap coords={coords} onCoordsChange={setCoords} />
        </div>

        <div className="w-1/3 bg-muted overflow-y-auto p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Места</h2>
            <Button onClick={() => setIsAddModalOpen(true)}>Добавить</Button>
          </div>

          <div className="space-y-4">
            {places.map((place) => (
              <PlaceCard
                key={place.id}
                id={place.id}
                name={place.name}
                address={place.address}
                category={place.category}
                onNavigate={handleNavigate}
                onRemove={handleRemove}
              />
            ))}
          </div>
        </div>
      </div>

      <AddPlaceModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddPlace}
        coords={coords}
      />
    </div>
  );
}
