import { useState } from "react"
import { Search, Filter, Edit, Trash2, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import AddPizzaModal from "@/components/AddPizzaModal"

// Mock pizza data
const pizzas = [
    {
      id: 1,
      name: "Pizza Margherita",
      description: "Fresh tomato sauce, mozzarella, basil",
      image: "🍕",
      category: "Classic",
      sizes: ["Broto", "Média", "Grande", "Gigante"],
      prices: { "Broto": 8, "Média": 12, "Grande": 16, "Gigante": 20 },
      available: true
    },
    {
      id: 2,
      name: "Pizza Quattro Stagioni",
      description: "Artichokes, ham, mushrooms, olives",
      image: "🍕",
      category: "Specialty",
      sizes: ["Média", "Grande", "Gigante"],
      prices: { "Média": 15, "Grande": 19, "Gigante": 24 },
      available: true
    },
    {
      id: 3,
      name: "Pizza Diavola",
      description: "Spicy salami, mozzarella, hot peppers",
      image: "🍕",
      category: "Spicy",
      sizes: ["Broto", "Média", "Grande"],
      prices: { "Broto": 9, "Média": 13, "Grande": 17 },
      available: false
    },
    {
      id: 4,
      name: "Pizza Vegetariana",
      description: "Bell peppers, mushrooms, onions, olives, tomatoes",
      image: "🥗",
      category: "Vegetarian",
      sizes: ["Broto", "Média", "Grande", "Gigante"],
      prices: { "Broto": 10, "Média": 14, "Grande": 18, "Gigante": 22 },
      available: true
    },
    {
      id: 5,
      name: "Pizza Pepperoni",
      description: "Pepperoni, mozzarella, tomato sauce",
      image: "🍕",
      category: "Classic",
      sizes: ["Broto", "Média", "Grande", "Gigante"],
      prices: { "Broto": 9, "Média": 13, "Grande": 17, "Gigante": 21 },
      available: true
    },
    {
      id: 6,
      name: "Pizza Nutella",
      description: "Sweet pizza with Nutella and strawberries",
      image: "🍫",
      category: "Sweet",
      sizes: ["Média", "Grande"],
      prices: { "Média": 11, "Grande": 15 },
      available: true
    },
    {
      id: 7,
      name: "Pizza Vegan Deluxe",
      description: "Vegan cheese, mushrooms, spinach, sun-dried tomatoes",
      image: "🌱",
      category: "Vegan",
      sizes: ["Média", "Grande", "Gigante"],
      prices: { "Média": 16, "Grande": 20, "Gigante": 24 },
      available: true
    },
    {
      id: 8,
      name: "Pizza Quattro Formaggi",
      description: "Four cheese blend: mozzarella, gorgonzola, parmesan, fontina",
      image: "🧀",
      category: "Specialty",
      sizes: ["Broto", "Média", "Grande"],
      prices: { "Broto": 11, "Média": 15, "Grande": 19 },
      available: true
    }
  ]

export default function MenuPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [pizzaList, setPizzaList] = useState(pizzas)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Pizza Menu Management</h1>
          <p className="text-muted-foreground">Manage your pizza offerings and pricing</p>
        </div>
        <AddPizzaModal onAddPizza={(newPizza) => setPizzaList(prev => [...prev, newPizza])} />
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search pizzas..."
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

      {/* Pizza Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {pizzaList.filter(pizza => 
          pizza.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pizza.description.toLowerCase().includes(searchTerm.toLowerCase())
        ).map((pizza) => (
          <Card key={pizza.id} className="shadow-warm hover:shadow-elegant transition-all duration-300 border-border/60">
            <CardHeader className="pb-3">
              <div className="text-6xl text-center mb-2">{pizza.image}</div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{pizza.name}</h3>
                  <Badge variant={pizza.available ? "default" : "secondary"} className="mt-1">
                    {pizza.available ? "Available" : "Unavailable"}
                  </Badge>
                </div>
                <Badge variant="outline">{pizza.category}</Badge>
              </div>
            </CardHeader>
            
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{pizza.description}</p>
              
              <div className="space-y-2">
                <p className="text-sm font-medium">Sizes & Prices:</p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {Object.entries(pizza.prices).map(([size, price]) => (
                    <div key={size} className="flex justify-between">
                      <span>{size}</span>
                      <span className="font-medium">€{price}</span>
                    </div>
                  ))}
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