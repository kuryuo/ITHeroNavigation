import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/useAuthStore";

export default function AppHeader() {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      if (token) {
        await authService.logout(token); 
      }
      logout(); 
      navigate("/auth"); 
    } catch (err) {
      console.error("Ошибка при выходе", err);
    }
  };
  

  return (
    <header className="w-full bg-white shadow-sm flex items-center justify-between px-6 py-4">
      <div
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/map")}
      >
        NaviHero
      </div>
      <div className="flex items-center gap-4">
        <Button onClick={() => navigate("/favorites")}>
          Избранное
        </Button>
        <Button onClick={() => navigate("/profile")}>
          Профиль
        </Button>
        <Button variant="destructive" onClick={handleLogout}>
          Выйти
        </Button>
      </div>
    </header>
  );
}
