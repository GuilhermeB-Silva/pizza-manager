import { useState } from "react"
import { Search, Filter, Edit, Trash2, Eye, Phone, MapPin, Mail, Calendar, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import AddCustomerModal from "@/components/AddCustomerModal"

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  
  // Mock customers data
  const initialCustomers = [
    {
      id: 1,
      name: "Maria Silva",
      phone: "+351 912 345 678",
      address: "Rua das Flores, 123, Lisboa",
      email: "maria.silva@email.com",
      registrationDate: "2024-01-15",
      totalOrders: 12,
      lastOrder: "2024-07-28"
    },
    {
      id: 2,
      name: "João Santos",
      phone: "+351 923 456 789",
      address: "Avenida da Liberdade, 456, Porto",
      email: "joao.santos@email.com",
      registrationDate: "2024-02-10",
      totalOrders: 8,
      lastOrder: "2024-07-30"
    },
    {
      id: 3,
      name: "Ana Costa",
      phone: "+351 934 567 890",
      address: "Praça do Comércio, 789, Coimbra",
      email: "",
      registrationDate: "2024-03-05",
      totalOrders: 5,
      lastOrder: "2024-07-25"
    },
    {
      id: 4,
      name: "Pedro Oliveira",
      phone: "+351 945 678 901",
      address: "Rua Augusta, 321, Faro",
      email: "pedro.oliveira@email.com",
      registrationDate: "2024-04-20",
      totalOrders: 15,
      lastOrder: "2024-07-31"
    }
  ]
  
  const [customersList, setCustomersList] = useState(initialCustomers)

  const filteredCustomers = customersList.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.phone.includes(searchTerm) ||
    customer.address.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Customers Management</h1>
          <p className="text-muted-foreground">Manage customer information and order history</p>
        </div>
        <AddCustomerModal onAddCustomer={(newCustomer) => setCustomersList(prev => [...prev, newCustomer])} />
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Total Customers</h3>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customersList.length}</div>
            <p className="text-xs text-muted-foreground">Active customers</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Total Orders</h3>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customersList.reduce((sum, customer) => sum + customer.totalOrders, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Lifetime orders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="text-sm font-medium">Avg Orders/Customer</h3>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(customersList.reduce((sum, customer) => sum + customer.totalOrders, 0) / customersList.length).toFixed(1)}
            </div>
            <p className="text-xs text-muted-foreground">Per customer</p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search customers..."
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

      {/* Customers Table */}
      <Card>
        <CardHeader>
          <h3 className="text-lg font-semibold">Customer Directory</h3>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Last Order</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Since {customer.registrationDate}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="h-3 w-3" />
                        {customer.phone}
                      </div>
                      {customer.email && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Mail className="h-3 w-3" />
                          {customer.email}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-3 w-3" />
                      {customer.address}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">{customer.totalOrders} orders</Badge>
                  </TableCell>
                  <TableCell className="text-sm">
                    {customer.lastOrder}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
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