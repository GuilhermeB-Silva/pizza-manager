import { useState } from "react"
import { Plus, Clock, CheckCircle, Truck, X, Eye, CreditCard, Banknote, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function OrdersPage() {
  // Mock orders data
  const initialOrders = [
    {
      id: 1,
      orderNumber: "ORD-001",
      customer: { name: "Maria Silva", phone: "+351 912 345 678", address: "Rua das Flores, 123, Lisboa" },
      items: [
        { name: "Pizza Margherita", size: "Grande", quantity: 1, price: 16 },
        { name: "Coca-Cola", quantity: 2, price: 2.50 }
      ],
      total: 21,
      status: "preparing",
      type: "delivery",
      paymentMethod: "card",
      estimatedTime: "25 min",
      orderTime: "19:30",
      notes: "Extra cheese, no olives"
    },
    {
      id: 2,
      orderNumber: "ORD-002",
      customer: { name: "João Santos", phone: "+351 923 456 789", address: "Avenida da Liberdade, 456, Porto" },
      items: [
        { name: "Pizza Pepperoni", size: "Média", quantity: 2, price: 13 },
        { name: "Heineken", quantity: 3, price: 4.50 }
      ],
      total: 39.50,
      status: "out-for-delivery",
      type: "delivery", 
      paymentMethod: "cash",
      estimatedTime: "15 min",
      orderTime: "19:45",
      notes: ""
    },
    {
      id: 3,
      orderNumber: "ORD-003",
      customer: { name: "Ana Costa", phone: "+351 934 567 890", address: "Praça do Comércio, 789, Coimbra" },
      items: [
        { name: "Pizza Vegetariana", size: "Grande", quantity: 1, price: 18 }
      ],
      total: 18,
      status: "delivered",
      type: "delivery",
      paymentMethod: "card",
      estimatedTime: "Delivered",
      orderTime: "18:15",
      notes: "Ring doorbell twice"
    },
    {
      id: 4,
      orderNumber: "ORD-004",
      customer: { name: "Pedro Oliveira", phone: "+351 945 678 901", address: "Table 5" },
      items: [
        { name: "Pizza Quattro Formaggi", size: "Broto", quantity: 1, price: 11 },
        { name: "Espresso", quantity: 1, price: 1.80 }
      ],
      total: 12.80,
      status: "preparing",
      type: "table",
      paymentMethod: "cash",
      estimatedTime: "20 min",
      orderTime: "20:00",
      notes: ""
    }
  ]

  const [ordersList, setOrdersList] = useState(initialOrders)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "preparing": return "bg-amber-100 text-amber-800 border-amber-200"
      case "out-for-delivery": return "bg-blue-100 text-blue-800 border-blue-200"
      case "delivered": return "bg-green-100 text-green-800 border-green-200"
      case "cancelled": return "bg-red-100 text-red-800 border-red-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "preparing": return <Clock className="h-4 w-4" />
      case "out-for-delivery": return <Truck className="h-4 w-4" />
      case "delivered": return <CheckCircle className="h-4 w-4" />
      case "cancelled": return <X className="h-4 w-4" />
      default: return <Clock className="h-4 w-4" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "delivery": return "🏍️"
      case "takeout": return "🛍️"
      case "table": return "🍽️"
      default: return "📦"
    }
  }

  const getPaymentIcon = (method: string) => {
    return method === "card" ? <CreditCard className="h-4 w-4" /> : <Banknote className="h-4 w-4" />
  }

  const groupedOrders = {
    preparing: ordersList.filter(order => order.status === "preparing"),
    "out-for-delivery": ordersList.filter(order => order.status === "out-for-delivery"),
    delivered: ordersList.filter(order => order.status === "delivered"),
    cancelled: ordersList.filter(order => order.status === "cancelled")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Orders Management</h1>
          <p className="text-muted-foreground">Track and manage all orders in real-time</p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-warm transition-all duration-300">
          <Plus className="w-4 h-4 mr-2" />
          New Order
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">In Progress</h3>
            <Clock className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-600">{groupedOrders.preparing.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Out for Delivery</h3>
            <Truck className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{groupedOrders["out-for-delivery"].length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Delivered Today</h3>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{groupedOrders.delivered.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Total Revenue</h3>
            <Banknote className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              €{ordersList.filter(o => o.status === "delivered").reduce((sum, order) => sum + order.total, 0).toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Kanban Board */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Object.entries(groupedOrders).map(([status, orders]) => (
          <div key={status} className="space-y-4">
            <h3 className="font-semibold text-lg capitalize flex items-center gap-2">
              {getStatusIcon(status)}
              {status.replace("-", " ")} ({orders.length})
            </h3>
            
            <div className="space-y-3">
              {orders.map((order) => (
                <Card key={order.id} className="shadow-warm hover:shadow-elegant transition-all duration-300">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold flex items-center gap-2">
                          {getTypeIcon(order.type)} {order.orderNumber}
                        </h4>
                        <p className="text-sm text-muted-foreground">{order.orderTime}</p>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {status.replace("-", " ")}
                      </Badge>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-3">
                    <div>
                      <p className="font-medium">{order.customer.name}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {order.customer.phone}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {order.customer.address}
                      </div>
                    </div>

                    <div className="border-t pt-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span>{item.quantity}x {item.name} {item.size && `(${item.size})`}</span>
                          <span>€{(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-2 flex justify-between items-center">
                      <div className="flex items-center gap-1 text-sm">
                        {getPaymentIcon(order.paymentMethod)}
                        {order.paymentMethod}
                      </div>
                      <span className="font-semibold">€{order.total.toFixed(2)}</span>
                    </div>

                    {order.notes && (
                      <div className="text-sm text-muted-foreground bg-muted p-2 rounded">
                        <strong>Notes:</strong> {order.notes}
                      </div>
                    )}

                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium text-primary">ETA: {order.estimatedTime}</span>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      {order.status === "preparing" && (
                        <Button size="sm" className="flex-1">
                          Mark Ready
                        </Button>
                      )}
                      {order.status === "out-for-delivery" && (
                        <Button size="sm" className="flex-1">
                          Delivered
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}