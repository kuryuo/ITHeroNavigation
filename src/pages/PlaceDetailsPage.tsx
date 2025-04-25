import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AppHeader from "@/components/AppHeader";

const mockPlace = {
  id: 1,
  name: "Кафе 'Лесная Поляна'",
  address: "ул. Центральная, 5",
  category: "Кафе",
  description: "Уютное кафе с домашней кухней и атмосферой леса.",
  photo: "", 
};

export default function PlaceDetailsPage() {

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <div className="px-6 py-8 w-full max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{mockPlace.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{mockPlace.category}</p>
            <p className="text-sm">{mockPlace.address}</p>
          </CardHeader>

          <CardContent className="space-y-4">
            {mockPlace.photo ? (
              <img src={mockPlace.photo} alt={mockPlace.name} className="rounded-md w-full max-h-[300px] object-cover" />
            ) : (
              <div className="w-full h-[200px] bg-muted flex items-center justify-center rounded-md text-sm text-muted-foreground">
                Фото пока нет
              </div>
            )}

            <p>{mockPlace.description}</p>

            <div className="flex gap-3 mt-4">
              <Button>Построить маршрут</Button>
              <Button variant="outline">Добавить в избранное</Button>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Отзывы</h3>
              <div className="text-sm text-muted-foreground">Пока нет отзывов</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
