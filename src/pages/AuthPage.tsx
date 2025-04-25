import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { authService } from "@/services/authService";
import { useAuthStore } from "@/store/useAuthStore";
import { useNavigate } from "react-router-dom";

export default function AuthPage() {
  const [form, setForm] = useState({ email: "", password: "", username: "" });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const token = await authService.login({
        email: form.email,
        password: form.password,
      });
  
      useAuthStore.getState().login({ username: "", email: form.email, id: 0 }, token);
      console.log("Вход выполнен, токен:", token);
      navigate("/map");     
    } catch (err) {
      console.error("Ошибка при входе", err);
    }
  };  

  const handleRegister = async () => {
    try {
      const token = await authService.register({
        username: form.username,
        email: form.email,
        password: form.password,
      });
  
      useAuthStore.getState().login({ username: form.username, email: form.email, id: 0 }, token);
      console.log("Зарегистрирован, токен:", token);
      navigate("/map"); 
    } catch (err) {
      console.error("Ошибка при регистрации", err);
    }
  };  

  return (
<div className="h-screen w-screen flex items-center justify-center bg-muted px-4">
      <Card className="w-full max-w-lg mx-auto shadow-xl rounded-xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Добро пожаловать!</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Вход</TabsTrigger>
              <TabsTrigger value="register">Регистрация</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form
                className="space-y-4 mt-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
              >
                <Input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <Input
                  name="password"
                  type="password"
                  placeholder="Пароль"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <Button type="submit" className="w-full">
                  Войти
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form
                className="space-y-4 mt-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleRegister();
                }}
              >
                <Input
                  name="username"
                  type="text"
                  placeholder="Имя пользователя"
                  value={form.username}
                  onChange={handleChange}
                  required
                />
                <Input
                  name="email"
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                <Input
                  name="password"
                  type="password"
                  placeholder="Пароль"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <Button type="submit" className="w-full">
                  Зарегистрироваться
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
