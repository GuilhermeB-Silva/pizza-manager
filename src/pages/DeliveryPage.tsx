import { useState } from "react"
import { Plus, MapPin, Clock, CheckCircle, Phone, User, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function DeliveryPage() {
  // Mock delivery staff data
  const deliveryStaff = [
    {
      id: 1,
      name: "Carlos Mendes",
      phone: "+351 966 123 456",
      region: "Lisboa Centro",
      status: "available",
      currentDeliveries: 0,
      totalDeliveries: 8
    },
    {
      id: 2,
      name: "Ricardo Pereira",
      phone: "+351 977 234 567",
      region: "Lisboa Norte",
      status: "on-delivery",
      currentDeliveries: 2,
      totalDeliveries: 12
    },
    {
      id: 3,
      name: "Bruno Silva",
      phone: "+351 988 345 678",
      region: "Lisboa Sul",
      status: "available",
      currentDeliveries: 0,
      totalDeliveries: 6
    }
  ]

  // Mock active deliveries
  const activeDeliveries = [
    {
      id: 1,
      orderNumber: "ORD-002",
      driver: "Ricardo Pereira",
      customer: "João Santos",
      address: "Avenida da Liberdade, 456, Porto",
      phone: "+351 923 456 789",
      estimatedTime: "15 min",
      status: "en-route"
    },
    {
      id: 2,
      orderNumber: "ORD-005",
      driver: "Ricardo Pereira", 
      customer: "Sofia Rodrigues",
      address: "Rua do Norte, 789, Lisboa",
      phone: "+351 933 567 890",
      estimatedTime: "25 min",
      status: "picked-up"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-100 text-green-800 border-green-200"
      case "on-delivery": return "bg-blue-100 text-blue-800 border-blue-200"
      case "off-duty": return "bg-gray-100 text-gray-800 border-gray-200"
      case "en-route": return "bg-blue-100 text-blue-800 border-blue-200"
      case "picked-up": return "bg-amber-100 text-amber-800 border-amber-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "available": return <CheckCircle className="h-4 w-4" />
      case "on-delivery": return <Truck className="h-4 w-4" />
      case "en-route": return <Truck className="h-4 w-4" />
      case "picked-up": return <Clock className="h-4 w-4" />
      default: return <User className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Delivery Management</h1>
          <p className="text-muted-foreground">Manage delivery staff, routes, and active deliveries</p>
        </div>
        <Button className="bg-gradient-primary hover:shadow-warm transition-all duration-300">
          <Plus className="w-4 h-4 mr-2" />
          Add Driver
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Active Drivers</h3>
            <User className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {deliveryStaff.filter(staff => staff.status !== "off-duty").length}
            </div>
            <p className="text-xs text-muted-foreground">Currently working</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Available Drivers</h3>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {deliveryStaff.filter(staff => staff.status === "available").length}
            </div>
            <p className="text-xs text-muted-foreground">Ready for orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Active Deliveries</h3>
            <Truck className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{activeDeliveries.length}</div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Avg Delivery Time</h3>
            <Clock className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">22 min</div>
            <p className="text-xs text-muted-foreground">Today's average</p>
          </CardContent>
        </Card>
      </div>

      {/* Active Deliveries */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Active Deliveries</h3>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeDeliveries.map((delivery) => (
              <div key={delivery.id} className="border rounded-lg p-4 hover:shadow-warm transition-all duration-300">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold flex items-center gap-2">
                      🏍️ {delivery.orderNumber}
                      <Badge className={getStatusColor(delivery.status)}>
                        {getStatusIcon(delivery.status)}
                        {delivery.status.replace("-", " ")}
                      </Badge>
                    </h4>
                    <p className="text-sm text-muted-foreground">Driver: {delivery.driver}</p>
                  </div>
                  <span className="text-sm font-medium text-primary">ETA: {delivery.estimatedTime}</span>
                </div>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="font-medium">{delivery.customer}</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {delivery.address}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      {delivery.phone}
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end items-center">
                    <Button variant="outline" size="sm">
                      Track
                    </Button>
                    <Button variant="outline" size="sm">
                      Contact Driver
                    </Button>
                    <Button size="sm">
                      Mark Delivered
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Delivery Staff */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Delivery Staff</h3>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Driver</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Region</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Current Deliveries</TableHead>
                <TableHead>Total Today</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deliveryStaff.map((staff) => (
                <TableRow key={staff.id}>
                  <TableCell className="font-medium">{staff.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <Phone className="h-3 w-3" />
                      {staff.phone}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {staff.region}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(staff.status)}>
                      {getStatusIcon(staff.status)}
                      {staff.status.replace("-", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>{staff.currentDeliveries}</TableCell>
                  <TableCell>{staff.totalDeliveries}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" size="sm">
                        Assign Order
                      </Button>
                      <Button variant="outline" size="sm">
                        Contact
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}