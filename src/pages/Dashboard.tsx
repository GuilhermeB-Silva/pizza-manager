import { DashboardStats } from "@/components/DashboardStats"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Pizza, 
  Truck, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Eye,
  MoreHorizontal
} from "lucide-react"

export default function Dashboard() {
  // Mock data for recent orders
  const recentOrders = [
    {
      id: "#001245",
      customer: "Giuseppe Verdi",
      items: ["Pizza Margherita (L)", "Coca Cola"],
      status: "preparing",
      total: "€18.50",
      time: "12:45",
      estimatedDelivery: "25 min"
    },
    {
      id: "#001246", 
      customer: "Anna Rossi",
      items: ["Pizza Quattro Stagioni (XL)", "Pizza Marinara (M)"],
      status: "delivery",
      total: "€32.00",
      time: "12:30",
      estimatedDelivery: "10 min"
    },
    {
      id: "#001247",
      customer: "Marco Bianchi", 
      items: ["Pizza Diavola (L)", "Birra Moretti"],
      status: "completed",
      total: "€21.50",
      time: "12:15",
      estimatedDelivery: "Delivered"
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "preparing":
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">
          <Clock className="w-3 h-3 mr-1" />
          Preparing
        </Badge>
      case "delivery":
        return <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
          <Truck className="w-3 h-3 mr-1" />
          Out for Delivery
        </Badge>
      case "completed":
        return <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
          <CheckCircle className="w-3 h-3 mr-1" />
          Completed
        </Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Mario! Here's what's happening today.</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Today</p>
          <p className="text-lg font-semibold">{new Date().toLocaleDateString('it-IT', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
        </div>
      </div>

      {/* Stats Cards */}
      <DashboardStats />

      {/* Recent Orders and Quick Actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Orders */}
        <Card className="lg:col-span-2 shadow-elegant border-border/60">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl font-semibold">Recent Orders</CardTitle>
            <Button variant="outline" size="sm">
              <Eye className="w-4 h-4 mr-2" />
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{order.id}</span>
                      {getStatusBadge(order.status)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{order.customer}</p>
                    <p className="text-sm text-foreground">{order.items.join(", ")}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">{order.total}</p>
                    <p className="text-xs text-muted-foreground">{order.time}</p>
                    <p className="text-xs text-muted-foreground">{order.estimatedDelivery}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-elegant border-border/60">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-gradient-primary hover:shadow-warm transition-all duration-300" size="lg">
              <Pizza className="w-5 h-5 mr-3" />
              Add New Pizza
            </Button>
            <Button variant="outline" className="w-full justify-start hover:bg-accent/50" size="lg">
              <Truck className="w-5 h-5 mr-3" />
              Manage Deliveries
            </Button>
            <Button variant="outline" className="w-full justify-start hover:bg-accent/50" size="lg">
              <AlertCircle className="w-5 h-5 mr-3" />
              View Alerts
            </Button>
            <Button variant="outline" className="w-full justify-start hover:bg-accent/50" size="lg">
              <MoreHorizontal className="w-5 h-5 mr-3" />
              More Actions
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}