import { useState } from "react"
import { Download, DollarSign, Package, TrendingUp, Clock, CreditCard, Banknote, Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function EndOfDayPage() {
  const today = new Date().toLocaleDateString('en-GB')
  
  // Mock daily summary data
  const dailySummary = {
    totalRevenue: 1247.50,
    totalOrders: 48,
    totalCustomers: 35,
    averageOrderValue: 25.99,
    cashSales: 435.00,
    cardSales: 812.50,
    totalTips: 47.80,
    totalDiscounts: 89.30,
    topSellingPizza: "Pizza Margherita",
    topSellingDrink: "Coca-Cola"
  }

  // Mock hourly breakdown
  const hourlyData = [
    { time: "12:00-13:00", orders: 3, revenue: 67.50 },
    { time: "13:00-14:00", orders: 8, revenue: 189.20 },
    { time: "14:00-15:00", orders: 5, revenue: 125.30 },
    { time: "15:00-16:00", orders: 2, revenue: 45.80 },
    { time: "16:00-17:00", orders: 4, revenue: 98.70 },
    { time: "17:00-18:00", orders: 6, revenue: 142.60 },
    { time: "18:00-19:00", orders: 8, revenue: 203.40 },
    { time: "19:00-20:00", orders: 7, revenue: 178.90 },
    { time: "20:00-21:00", orders: 5, revenue: 196.10 }
  ]

  // Mock payment breakdown
  const paymentBreakdown = [
    { method: "Credit/Debit Card", amount: 812.50, count: 29, percentage: 65.2 },
    { method: "Cash", amount: 435.00, count: 19, percentage: 34.8 }
  ]

  // Mock product sales
  const productSales = [
    { name: "Pizza Margherita", quantity: 12, revenue: 192.00 },
    { name: "Pizza Pepperoni", quantity: 8, revenue: 104.00 },
    { name: "Pizza Vegetariana", quantity: 6, revenue: 108.00 },
    { name: "Coca-Cola", quantity: 24, revenue: 60.00 },
    { name: "Heineken", quantity: 15, revenue: 67.50 }
  ]

  const [dayCllosed, setDayCllosed] = useState(false)

  const handleCloseDay = () => {
    setDayCllosed(true)
    // Here you would typically generate reports, backup data, etc.
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">End-of-Day Report</h1>
          <p className="text-muted-foreground">Daily financial summary for {today}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          {!dayCllosed ? (
            <Button onClick={handleCloseDay} className="bg-gradient-primary hover:shadow-warm transition-all duration-300">
              <Calculator className="w-4 h-4 mr-2" />
              Close Day
            </Button>
          ) : (
            <Badge className="px-4 py-2 bg-green-100 text-green-800 border-green-200">
              Day Closed
            </Badge>
          )}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">€{dailySummary.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+12% from yesterday</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{dailySummary.totalOrders}</div>
            <p className="text-xs text-muted-foreground">{dailySummary.totalCustomers} unique customers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">€{dailySummary.averageOrderValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+5% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tips Collected</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">€{dailySummary.totalTips.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">3.8% of total sales</p>
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods & Top Products */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Payment Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentBreakdown.map((payment, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {payment.method.includes("Card") ? 
                      <CreditCard className="h-4 w-4 text-blue-600" /> : 
                      <Banknote className="h-4 w-4 text-green-600" />
                    }
                    <span className="text-sm font-medium">{payment.method}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">€{payment.amount.toFixed(2)}</div>
                    <div className="text-xs text-muted-foreground">{payment.count} orders ({payment.percentage}%)</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Selling Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {productSales.slice(0, 5).map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-xs text-muted-foreground">{product.quantity} sold</div>
                  </div>
                  <div className="font-semibold">€{product.revenue.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Hourly Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Hourly Sales Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Time Period
                </TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Avg Order Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hourlyData.map((hour, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{hour.time}</TableCell>
                  <TableCell>{hour.orders}</TableCell>
                  <TableCell>€{hour.revenue.toFixed(2)}</TableCell>
                  <TableCell>€{(hour.revenue / hour.orders).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Financial Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Financial Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Gross Revenue:</span>
                <span className="font-semibold">€{dailySummary.totalRevenue.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Discounts Applied:</span>
                <span className="font-semibold text-red-600">-€{dailySummary.totalDiscounts.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tips Collected:</span>
                <span className="font-semibold text-green-600">+€{dailySummary.totalTips.toFixed(2)}</span>
              </div>
              <hr />
              <div className="flex justify-between text-lg">
                <span className="font-semibold">Net Revenue:</span>
                <span className="font-bold text-green-600">
                  €{(dailySummary.totalRevenue - dailySummary.totalDiscounts + dailySummary.totalTips).toFixed(2)}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Cash in Register:</span>
                <span className="font-semibold">€{dailySummary.cashSales.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Card Payments:</span>
                <span className="font-semibold">€{dailySummary.cardSales.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Total Transactions:</span>
                <span className="font-semibold">{dailySummary.totalOrders}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}