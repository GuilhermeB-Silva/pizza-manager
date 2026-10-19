import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Checkbox } from "@/components/ui/checkbox"
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

interface AddPizzaModalProps {
  onAddPizza: (pizza: unknown) => void
}

export default function AddPizzaModal({ onAddPizza }: AddPizzaModalProps) {
  const [open, setOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    available: true,
    sizes: [] as string[],
    prices: {} as Record<string, number>
  })

  const categories = ["Classic", "Specialty", "Spicy", "Vegetarian", "Vegan", "Sweet"]
  const availableSizes = ["Broto", "Média", "Grande", "Gigante"]

  const handleSizeChange = (size: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        sizes: [...prev.sizes, size]
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        sizes: prev.sizes.filter(s => s !== size),
        prices: Object.fromEntries(
          Object.entries(prev.prices).filter(([key]) => key !== size)
        )
      }))
    }
  }

  const handlePriceChange = (size: string, price: string) => {
    setFormData(prev => ({
      ...prev,
      prices: {
        ...prev.prices,
        [size]: parseFloat(price) || 0
      }
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.description || !formData.category || formData.sizes.length === 0) {
      toast.error("Please fill in all required fields")
      return
    }

    const newPizza = {
      id: Date.now(),
      name: formData.name,
      description: formData.description,
      image: formData.category === "Sweet" ? "🍫" : formData.category === "Vegetarian" ? "🥗" : formData.category === "Vegan" ? "🌱" : "🍕",
      category: formData.category,
      sizes: formData.sizes,
      prices: formData.prices,
      available: formData.available
    }

    onAddPizza(newPizza)
    toast.success("Pizza added successfully!")
    setOpen(false)
    setFormData({
      name: "",
      description: "",
      category: "",
      available: true,
      sizes: [],
      prices: {}
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-primary hover:shadow-warm transition-all duration-300">
          <Plus className="w-4 h-4 mr-2" />
          Add New Pizza
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Pizza</DialogTitle>
          <DialogDescription>
            Create a new pizza for your menu with sizes and pricing.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Pizza Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="e.g., Pizza Margherita"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe the ingredients and flavors..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Available Sizes *</Label>
            <div className="grid grid-cols-2 gap-2">
              {availableSizes.map((size) => (
                <div key={size} className="flex items-center space-x-2">
                  <Checkbox
                    id={size}
                    checked={formData.sizes.includes(size)}
                    onCheckedChange={(checked) => handleSizeChange(size, checked as boolean)}
                  />
                  <Label htmlFor={size}>{size}</Label>
                </div>
              ))}
            </div>
          </div>

          {formData.sizes.length > 0 && (
            <div className="space-y-2">
              <Label>Prices (€)</Label>
              <div className="space-y-2">
                {formData.sizes.map((size) => (
                  <div key={size} className="flex items-center space-x-2">
                    <Label className="w-16">{size}:</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.prices[size] || ""}
                      onChange={(e) => handlePriceChange(size, e.target.value)}
                      placeholder="0.00"
                      className="flex-1"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

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
            <Button type="submit">Add Pizza</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}