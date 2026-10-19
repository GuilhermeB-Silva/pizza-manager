import { useState } from "react"
import { Download, Calendar, TrendingUp, BarChart3, PieChart, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("week")
  
  // Mock analytics data
  const salesData = {
    week: {
      totalRevenue: 8947.50,
      totalOrders: 342,
      avgOrderValue: 26.15,
      growth: "+15.2%"
    },
    month: {
      totalRevenue: 34580.25,
      totalOrders: 1289,
      avgOrderValue: 26.83,
      growth: "+8.7%"
    },
    quarter: {
      totalRevenue: 98745.80,
      totalOrders: 3567,
      avgOrderValue: 27.68,
      growth: "+12.3%"
    }
  }

  // Mock top products data
  const topProducts = [
    { name: "Pizza Margherita", quantity: 89, revenue: 1424.00, percentage: 15.9 },
    { name: "Pizza Pepperoni", quantity: 76, revenue: 988.00, percentage: 11.0 },
    { name: "Pizza Quattro Stagioni", quantity: 54, revenue: 1026.00, percentage: 11.5 },
    { name: "Pizza Vegetariana", quantity: 45, revenue: 810.00, percentage: 9.1 },
    { name: "Coca-Cola", quantity: 156, revenue: 390.00, percentage: 4.4 }
  ]

  // Mock customer analytics
  const customerData = [
    { metric: "New Customers", value: 45, change: "+22%" },
    { metric: "Returning Customers", value: 123, change: "+8%" },
    { metric: "Customer Retention Rate", value: "73%", change: "+5%" },
    { metric: "Average Orders per Customer", value: "2.8", change: "+0.3%" }
  ]

  // Mock daily sales chart data
  const dailySales = [
    { day: "Monday", orders: 42, revenue: 1089.50 },
    { day: "Tuesday", orders: 38, revenue: 987.20 },
    { day: "Wednesday", orders: 51, revenue: 1324.80 },
    { day: "Thursday", orders: 47, revenue: 1221.30 },
    { day: "Friday", orders: 68, revenue: 1764.90 },
    { day: "Saturday", orders: 72, revenue: 1872.40 },
    { day: "Sunday", orders: 58, revenue: 1508.20 }
  ]

  // Mock peak hours data
  const peakHours = [
    { time: "12:00-13:00", orders: 89, percentage: 8.2 },
    { time: "13:00-14:00", orders: 124, percentage: 11.4 },
    { time: "19:00-20:00", orders: 156, percentage: 14.3 },
    { time: "20:00-21:00", orders: 142, percentage: 13.1 },
    { time: "21:00-22:00", orders: 98, percentage: 9.0 }
  ]

  const currentData = salesData[selectedPeriod as keyof typeof salesData]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">Comprehensive business insights and performance metrics</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Performance Indicators */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">€{currentData.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{currentData.growth} from last period</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <BarChart3 className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{currentData.totalOrders}</div>
            <p className="text-xs text-muted-foreground">Orders completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
            <PieChart className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">€{currentData.avgOrderValue}</div>
            <p className="text-xs text-muted-foreground">Per order average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{currentData.growth}</div>
            <p className="text-xs text-muted-foreground">Revenue growth</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Daily Sales Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dailySales.map((day, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{day.day}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">{day.orders} orders</span>
                    <span className="font-semibold">€{day.revenue.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Peak Hours Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {peakHours.map((hour, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{hour.time}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-muted-foreground">{hour.percentage}%</span>
                    <span className="font-semibold">{hour.orders} orders</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products & Customer Analytics */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>% of Sales</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topProducts.map((product, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.quantity}</TableCell>
                    <TableCell>€{product.revenue.toFixed(2)}</TableCell>
                    <TableCell>{product.percentage}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Customer Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customerData.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{data.metric}</span>
                  <div className="text-right">
                    <div className="font-semibold">{data.value}</div>
                    <div className="text-xs text-green-600">{data.change}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Business Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-green-600 mb-2">📈 Growth Opportunity</h4>
              <p className="text-sm text-muted-foreground">
                Friday and Saturday show highest sales. Consider extending hours or adding promotional offers on weekdays.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-blue-600 mb-2">🍕 Product Focus</h4>
              <p className="text-sm text-muted-foreground">
                Pizza Margherita remains the top seller. Consider creating variations or combo deals to increase average order value.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-purple-600 mb-2">⏰ Peak Time Strategy</h4>
              <p className="text-sm text-muted-foreground">
                Lunch (1-2 PM) and dinner (7-9 PM) are peak times. Ensure adequate staffing during these periods.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}