const API_BASE = "https://itheronavigation.ru:5000";

interface CreatePlaceDto {
  name: string;
  location: {
    latitude: number;
    longitude: number;
  };
  description: string;
  address: string;
  categoryId: string;
}

interface CreateReviewDto {
  rating: number;
  text: string;
}

interface SearchPlaceDto {
  location: {
    latitude: number;
    longitude: number;
  };
  distanceKm: number;
  name: string;
  categoryIds: string[];
}

export const placeService = {
  async createPlace(data: CreatePlaceDto, token: string) {
    const res = await fetch(`${API_BASE}/api/place`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Ошибка при создании места");
    return await res.json();
  },

  async getPlace(placeId: string) {
    const res = await fetch(`${API_BASE}/api/place/${placeId}`);

    if (!res.ok) throw new Error("Ошибка при получении места");
    return await res.json();
  },

  async searchPlaces(data: SearchPlaceDto, token: string) {
    const res = await fetch(`${API_BASE}/api/place/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  
    if (!res.ok) throw new Error("Ошибка при поиске мест");
    return await res.json();
  }
  ,

  async getNearbyPlaces(latitude: number, longitude: number, distanceKm = 1) {
    const params = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      distanceKm: distanceKm.toString(),
    });

    const res = await fetch(`${API_BASE}/api/place/nearby?${params.toString()}`);

    if (!res.ok) throw new Error("Ошибка при получении ближайших мест");
    return await res.json();
  },

  async createReview(placeId: string, data: CreateReviewDto, token: string) {
    const res = await fetch(`${API_BASE}/api/place/${placeId}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Ошибка при создании отзыва");
    return await res.json();
  },

  async getReviews(placeId: string, offset = 0, count = 10) {
    const params = new URLSearchParams({
      offset: offset.toString(),
      count: count.toString(),
    });

    const res = await fetch(`${API_BASE}/api/place/${placeId}/reviews?${params.toString()}`);

    if (!res.ok) throw new Error("Ошибка при получении отзывов");
    return await res.json();
  },

  async uploadPhoto(placeId: string, photo: File, token: string) {
    const formData = new FormData();
    formData.append("file", photo);

    const res = await fetch(`${API_BASE}/api/place/${placeId}/photos`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!res.ok) throw new Error("Ошибка при загрузке фото");
    return await res.json();
  },

  async getPhotos(placeId: string) {
    const res = await fetch(`${API_BASE}/api/place/${placeId}/photos`);

    if (!res.ok) throw new Error("Ошибка при получении фото");
    return await res.json();
  },

  async deletePlace(placeId: string, token: string) {
    const res = await fetch(`${API_BASE}/api/place/${placeId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) throw new Error("Ошибка при удалении места");
    return await res.json();
  },
  
};
