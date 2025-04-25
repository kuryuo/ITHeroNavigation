const API_BASE = 'https://itheronavigation.ru:5000';

export const userService = {
  async getProfile(token: string) {
    const res = await fetch(`${API_BASE}/api/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error('Ошибка при получении профиля');
    return await res.json();
  },

  async getMyPlaces(token: string, offset = 0, count = 10) {
    const res = await fetch(
      `${API_BASE}/api/users/me/places?offset=${offset}&count=${count}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    if (!res.ok) throw new Error("Ошибка при получении мест");
    return await res.json();
  },

  async getFavorites(token: string) {
    const res = await fetch(`${API_BASE}/api/users/me/favorites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error('Ошибка при получении избранного');
    return await res.json();
  },

  async addFavorite(token: string, placeId: number) {
    const res = await fetch(`${API_BASE}/api/users/me/favorites`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ placeId }),
    });

    if (!res.ok) throw new Error('Ошибка при добавлении в избранное');
    return await res.json();
  },

  async removeFavorite(token: string, placeId: number) {
    const res = await fetch(`${API_BASE}/api/users/me/favorites/${placeId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error('Ошибка при удалении из избранного');
  },
};
