import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { placeService } from "@/services/placeService";
import { useAuthStore } from "@/store/useAuthStore";

interface AddPlaceModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (place: any) => void;
  coords: [number, number];
}

export default function AddPlaceModal({ open, onClose, onAdd, coords }: AddPlaceModalProps) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const { token } = useAuthStore();

  const handleAdd = async () => {
    if (!name || !address || !category) return;

    const newPlace = {
      name,
      address,
      description,
      location: {
        latitude: coords[0],
        longitude: coords[1],
      },
      categoryId: "3fa85f64-5717-4562-b3fc-2c963f66afa6", 
    };

    try {
      setLoading(true);

      const response = await placeService.createPlace(newPlace, token);
      console.log("Место успешно создано:", response);

      onAdd(response);
      onClose();

      setName("");
      setAddress("");
      setCategory("");
      setDescription("");
      setPhoto(null);
    } catch (error) {
      console.error("Ошибка при добавлении места:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Добавить место</DialogTitle>
          <DialogDescription>
        Пожалуйста, заполните форму для создания нового места.
      </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Название</Label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>

          <div className="grid gap-2">
            <Label>Адрес</Label>
            <Input value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>

          <div className="grid gap-2">
            <Label>Категория</Label>
            <Input value={category} onChange={(e) => setCategory(e.target.value)} />
          </div>

          <div className="grid gap-2">
            <Label>Описание</Label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          <div className="grid gap-2">
            <Label>Фото</Label>
            <Input type="file" onChange={(e) => setPhoto(e.target.files?.[0] || null)} />
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleAdd} disabled={loading}>
            {loading ? "Добавляем..." : "Добавить"}
          </Button>
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Отмена
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
