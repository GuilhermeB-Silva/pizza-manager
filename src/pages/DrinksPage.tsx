import { useState } from "react"
import { Search, Filter, Edit, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AddDrinkModal from "@/components/AddDrinkModal"

export default function DrinksPage() {
  const [searchTerm, setSearchTerm] = useState("")
  
  // Mock drinks data
  const initialDrinks = [
    {
      id: 1,
      name: "Coca-Cola",
      type: "Soda",
      price: 2.50,
      packaging: "Can",
      available: true,
      icon: "🥤"
    },
    {
      id: 2,
      name: "Orange Juice",
      type: "Juice",
      price: 3.00,
      packaging: "Glass",
      available: true,
      icon: "🧃"
    },
    {
      id: 3,
      name: "Heineken",
      type: "Beer",
      price: 4.50,
      packaging: "Bottle",
      available: true,
      icon: "🍺"
    },
    {
      id: 4,
      name: "Espresso",
      type: "Coffee",
      price: 1.80,
      packaging: "Cup",
      available: true,
      icon: "☕"
    },
    {
      id: 5,
      name: "Sparkling Water",
      type: "Water",
      price: 2.00,
      packaging: "Bottle",
      available: true,
      icon: "💧"
    },
    {
      id: 6,
      name: "Red Wine",
      type: "Wine",
      price: 5.50,
      packaging: "Glass",
      available: false,
      icon: "🍷"
    }
  ]
  
  const [drinksList, setDrinksList] = useState(initialDrinks)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Drinks Management</h1>
          <p className="text-muted-foreground">Manage your beverage menu and pricing</p>
        </div>
        <AddDrinkModal onAddDrink={(newDrink) => setDrinksList(prev => [...prev, newDrink])} />
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search drinks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      {/* Drinks Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {drinksList.filter(drink => 
          drink.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          drink.type.toLowerCase().includes(searchTerm.toLowerCase())
        ).map((drink) => (
          <Card key={drink.id} className="shadow-warm hover:shadow-elegant transition-all duration-300 border-border/60">
            <CardHeader className="pb-3">
              <div className="text-6xl text-center mb-2">{drink.icon}</div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{drink.name}</h3>
                  <Badge variant={drink.available ? "default" : "secondary"} className="mt-1">
                    {drink.available ? "Available" : "Unavailable"}
                  </Badge>
                </div>
                <Badge variant="outline">{drink.type}</Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Price:</span>
                  <span className="font-medium">€{drink.price.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Packaging:</span>
                  <span className="font-medium">{drink.packaging}</span>
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="pt-4 border-t">
              <div className="flex gap-2 w-full">
                <Button variant="outline" size="sm" className="flex-1">
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}