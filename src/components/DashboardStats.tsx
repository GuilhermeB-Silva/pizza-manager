import { TrendingUp, ShoppingCart, Clock, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatCardProps {
  title: string
  value: string
  change: string
  icon: React.ElementType
  trend: "up" | "down" | "neutral"
}

function StatCard({ title, value, change, icon: Icon, trend }: StatCardProps) {
  const trendColor = {
    up: "text-success",
    down: "text-destructive", 
    neutral: "text-muted-foreground"
  }[trend]

  return (
    <Card className="hover:shadow-warm transition-all duration-300 bg-card border-border/60">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
          <Icon className="w-4 h-4 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground mb-1">{value}</div>
        <p className={`text-xs flex items-center gap-1 ${trendColor}`}>
          <TrendingUp className="w-3 h-3" />
          {change}
        </p>
      </CardContent>
    </Card>
  )
}

export function DashboardStats() {
  const stats = [
    {
      title: "Total Sales Today",
      value: "€2,847.50",
      change: "+12.5% from yesterday",
      icon: DollarSign,
      trend: "up" as const
    },
    {
      title: "Active Orders",
      value: "23",
      change: "6 in preparation, 17 delivery",
      icon: ShoppingCart,
      trend: "neutral" as const
    },
    {
      title: "Average Delivery Time",
      value: "28 min",
      change: "-3 min from last week",
      icon: Clock,
      trend: "up" as const
    },
    {
      title: "Orders Completed",
      value: "127",
      change: "+8% from yesterday",
      icon: TrendingUp,
      trend: "up" as const
    }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          icon={stat.icon}
          trend={stat.trend}
        />
      ))}
    </div>
  )
}