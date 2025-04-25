import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface PlaceCardProps {
  id: number;
  name: string;
  address: string;
  category: string;
  description: string; 
  onNavigate: (id: number) => void;
  onRemove?: (id: number) => void;
}

export default function PlaceCard({ id, name, address, category, description, onNavigate, onRemove }: PlaceCardProps) {
  const navigate = useNavigate();

  const handleCardClick = () => {
    console.log("Данные места перед переходом:", { id, name, address, category, description });
    navigate(`/place/${id}`, {
      state: { id, name, address, category, description}, // передаём данные карточки
    });
  };

  return (
    <Card onClick={handleCardClick} className="cursor-pointer hover:bg-muted transition">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-sm text-muted-foreground">{category}</p>
        <p className="text-sm">{address}</p>
        <div className="flex gap-2 mt-4">
          <Button
            onClick={(e) => {
              e.stopPropagation(); // чтобы не срабатывал переход при клике на кнопку
              onNavigate(id);
            }}
          >
            На карту
          </Button>
          {onRemove && (
            <Button
              variant="destructive"
              onClick={(e) => {
                e.stopPropagation(); // чтобы не срабатывал переход при клике на кнопку
                onRemove(id);
              }}
            >
              Удалить
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
