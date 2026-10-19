import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { toast } from "sonner"

interface AddDrinkModalProps {
  onAddDrink: (drink: unknown) => void
}

export default function AddDrinkModal({ onAddDrink }: AddDrinkModalProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    price: "",
    packaging: "",
    available: true
  })

  const drinkTypes = ["Soda", "Juice", "Beer", "Water", "Coffee", "Tea", "Energy Drink", "Wine"]
  const packagingTypes = ["Bottle", "Can", "Glass", "Cup", "Pitcher"]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.type || !formData.price || !formData.packaging) {
      toast.error("Please fill in all required fields")
      return
    }

    const newDrink = {
      id: Date.now(),
      name: formData.name,
      type: formData.type,
      price: parseFloat(formData.price),
      packaging: formData.packaging,
      available: formData.available,
      icon: formData.type === "Beer" ? "🍺" : formData.type === "Coffee" ? "☕" : formData.type === "Juice" ? "🧃" : formData.type === "Water" ? "💧" : formData.type === "Wine" ? "🍷" : "🥤"
    }

    onAddDrink(newDrink)
    toast.success("Drink added successfully!")
    setOpen(false)
    setFormData({
      name: "",
      type: "",
      price: "",
      packaging: "",
      available: true
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-primary hover:shadow-warm transition-all duration-300">
          <Plus className="w-4 h-4 mr-2" />
          Add New Drink
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Add New Drink</DialogTitle>
          <DialogDescription>
            Add a new beverage to your menu.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Drink Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Coca-Cola"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Type *</Label>
            <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select drink type" />
              </SelectTrigger>
              <SelectContent>
                {drinkTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="packaging">Packaging *</Label>
            <Select value={formData.packaging} onValueChange={(value) => setFormData(prev => ({ ...prev, packaging: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select packaging type" />
              </SelectTrigger>
              <SelectContent>
                {packagingTypes.map((packaging) => (
                  <SelectItem key={packaging} value={packaging}>
                    {packaging}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Price (€) *</Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
              placeholder="0.00"
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="available"
              checked={formData.available}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, available: checked }))}
            />
            <Label htmlFor="available">Available for orders</Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Drink</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}