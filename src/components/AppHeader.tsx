import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function AppHeader() {
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Logout user"); 
    navigate("/auth");
  };

  return (
    <header className="w-full bg-white shadow-sm flex items-center justify-between px-6 py-4">
      <div
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/favorites")}
      >
        NaviHero
      </div>
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => navigate("/favorites")}>
          Избранное
        </Button>
        <Button onClick={() => console.log("Открыть модалку добавления места")}>
          Добавить место
        </Button>
        <Button variant="destructive" onClick={handleLogout}>
          Выйти
        </Button>
      </div>
    </header>
  );
}
