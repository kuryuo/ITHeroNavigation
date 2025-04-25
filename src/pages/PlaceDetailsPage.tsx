import { useLocation } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AppHeader from "@/components/AppHeader";

export default function PlaceDetailsPage() {
  const location = useLocation();
  const place = location.state as { id: number; name: string; address: string; category: string; description: string};

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <div className="px-6 py-8 w-full max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{place.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{place.category}</p>
            <p className="text-sm">{place.address}</p>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="w-full h-[200px] bg-muted flex items-center justify-center rounded-md text-sm text-muted-foreground">
              Фото пока нет
            </div>

            <p>{place.description}</p>

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
