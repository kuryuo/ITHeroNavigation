import { useState, useEffect } from "react";
import AppHeader from "@/components/AppHeader";
import PlaceCard from "@/components/PlaceCard";
import AddPlaceModal from "@/components/AddPlaceModal";
import { Button } from "@/components/ui/button";
import YandexMap from "@/components/YandexMap";
import { placeService } from "@/services/placeService"; 
import { useAuthStore } from "@/store/useAuthStore";

interface Place {
  id: number;
  name: string;
  address: string;
  category: string;
  description: string;
  coords: [number, number];
}

export default function MapPage() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [coords, setCoords] = useState<[number, number]>([56.838011, 60.597465]);
  const { token } = useAuthStore();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        if (!token) {
          console.warn("⚠️ Нет токена для загрузки мест.");
          return;
        }

        const response = await placeService.searchPlaces(
          {
            location: {
              latitude: coords[0],
              longitude: coords[1],
            },
            distanceKm: 5,
            name: "",
            categoryIds: [],
          },
          token
        );

        console.log("✅ Ответ от /api/place/search:", response);

        const mappedPlaces = (response.result ?? []).map((place: any, index: number) => ({
          id: index + 1,
          name: place.name,
          address: place.address,
          category: place.category?.name || "Категория", // Если category есть в ответе
          coords: [place.location.latitude, place.location.longitude],
        }));

        setPlaces(mappedPlaces);
      } catch (error) {
        console.error("❌ Ошибка при загрузке мест:", error);
      }
    };

    fetchPlaces();
  }, [coords, token]);

  const handleAddPlace = (response: any) => {
    const placeData = response.result;
  
    const coordsFromPlace: [number, number] = [
      placeData.location.latitude,
      placeData.location.longitude,
    ];
  
    const id = placeData.id;
  
    setPlaces([
      ...places,
      {
        id,
        name: placeData.name,
        address: placeData.address,
        category: placeData.categoryId || "Категория",
        description: placeData.description || "Описание отсутствует",
        coords: coordsFromPlace,
      },
    ]);
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

      <div className="flex flex-1">
      <div className="w-2/3 h-screen sticky top-0">
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
                description={place.description}
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
