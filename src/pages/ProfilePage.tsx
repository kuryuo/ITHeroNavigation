import { useEffect, useState } from "react";
import AppHeader from "@/components/AppHeader";
import { Button } from "@/components/ui/button";
import PlaceCard from "@/components/PlaceCard";
import { userService } from "@/services/userService";
import { useAuthStore } from "@/store/useAuthStore";

interface UserProfile {
  id: string;
  username: string;
  email: string;
}

interface Place {
  id: number;
  name: string;
  address: string;
  category: string;
}

export default function ProfilePage() {
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    logout();
    console.log("Выйти из аккаунта");
  };

  useEffect(() => {
    const loadProfile = async () => {
      if (!token) return;
  
      try {
        const profile = await userService.getProfile(token);
        console.log("Профиль:", profile); 
  
        const places = await userService.getMyPlaces(token, 0, 10);
        console.log("Места пользователя:", places); 
  
        setUser(profile.result);
        setPlaces(places);
      } catch (err) {
        console.error("Ошибка загрузки профиля", err);
      } finally {
        setLoading(false);
      }
    };
  
    loadProfile();
  }, [token]);

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader />
      <div className="p-6 w-full max-w-screen-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Профиль</h1>

        {loading ? (
          <p className="text-muted-foreground">Загрузка...</p>
        ) : user ? (
          <>
            <div className="mb-6 space-y-1">
              <p>
                <span className="font-medium">Имя:</span> {user.username}
              </p>
              <p>
                <span className="font-medium">Email:</span> {user.email}
              </p>
            </div>

            <Button variant="destructive" onClick={handleLogout}>
              Выйти
            </Button>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-3">Мои добавленные места</h2>

              <div className="space-y-4">
                {places.length > 0 ? (
                  places.map((place) => (
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
                  <p className="text-muted-foreground text-sm">
                    Вы ещё не добавили ни одного места
                  </p>
                )}
              </div>
            </div>
          </>
        ) : (
          <p className="text-muted-foreground">Пользователь не найден</p>
        )}
      </div>
    </div>
  );
}
