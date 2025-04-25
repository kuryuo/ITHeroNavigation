import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface AddPlaceModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (place: any) => void; 
}

export default function AddPlaceModal({ open, onClose, onAdd }: AddPlaceModalProps) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);

  const handleAdd = () => {
    if (!name || !address || !category) return;
    const newPlace = { name, address, category, description, photo };
    onAdd(newPlace);
    onClose();
    setName("");
    setAddress("");
    setCategory("");
    setDescription("");
    setPhoto(null);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Добавить место</DialogTitle>
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
          <Button onClick={handleAdd}>Добавить</Button>
          <Button variant="outline" onClick={onClose}>
            Отмена
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
