import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import PlaceCard from "@/components/PlaceCard";

const mockUser = {
  name: "Александр",
  email: "alex@example.com",
};

const mockPlaces = [
  {
    id: 1,
    name: "Музей космонавтики",
    address: "пр-т Гагарина, 10",
    category: "Музей",
  },
  {
    id: 2,
    name: "Библиотека им. Пушкина",
    address: "ул. Ленина, 22",
    category: "Библиотека",
  },
];

export default function ProfilePage() {
  const handleLogout = () => {
    console.log("Выйти из аккаунта");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <div className="p-6 w-full max-w-screen-xl mx-auto">

        <h1 className="text-2xl font-bold mb-4">Профиль</h1>

        <div className="mb-6 space-y-1">
          <p><span className="font-medium">Имя:</span> {mockUser.name}</p>
          <p><span className="font-medium">Email:</span> {mockUser.email}</p>
        </div>

        <Button variant="destructive" onClick={handleLogout}>
          Выйти
        </Button>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3">Мои добавленные места</h2>

          <div className="space-y-4">
            {mockPlaces.length > 0 ? (
              mockPlaces.map((place) => (
                <PlaceCard
                  key={place.id}
                  id={place.id}
                  name={place.name}
                  address={place.address}
                  category={place.category}
                  onNavigate={() => console.log("go to", place.id)}
                />
              ))
            ) : (
              <p className="text-muted-foreground text-sm">Вы ещё не добавили ни одного места</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
