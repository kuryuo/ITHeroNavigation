import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AppHeader from "@/components/AppHeader";

const favoritePlaces = [
  {
    id: 1,
    name: "Кафе 'Лесная Поляна'",
    address: "ул. Центральная, 5",
    category: "Кафе"
  },
  {
    id: 2,
    name: "Парк Победы",
    address: "пр-т Мира, 12",
    category: "Достопримечательность"
  },
];

export default function FavoritesPage() {
  const handleNavigate = (placeId: number) => {
    console.log("Navigate to place", placeId);
  };

  const handleRemove = (placeId: number) => {
    console.log("Remove from favorites", placeId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-muted">
      <AppHeader />
      <main className="w-full max-w-6xl mx-auto px-6 py-8">
        <h1 className="text-2xl font-bold mb-6">Избранные места</h1>
        <div className="grid gap-6">
          {favoritePlaces.map((place) => (
            <Card key={place.id}>
              <CardHeader>
                <CardTitle>{place.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">{place.category}</p>
                <p className="text-sm">{place.address}</p>
                <div className="flex gap-2 mt-4">
                  <Button onClick={() => handleNavigate(place.id)}>На карту</Button>
                  <Button variant="destructive" onClick={() => handleRemove(place.id)}>
                    Удалить
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
