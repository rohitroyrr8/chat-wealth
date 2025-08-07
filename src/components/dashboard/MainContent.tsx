import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const MainContent = () => {
  return (
    <div className="flex-1 bg-background">
      {/* Header */}
      <div className="border-b border-border p-6">
        <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Portfolio Summary */}
        <Card className="p-6 bg-gradient-card shadow-card">
          <h2 className="text-lg font-semibold text-foreground mb-4">Portfolio Summary</h2>
          <div className="mb-4">
            <div className="text-3xl font-bold text-foreground">$124,500.75</div>
            <div className="text-success text-sm font-medium">+1.2% today ($1,480.00)</div>
          </div>
          
          {/* Portfolio Chart Placeholder */}
          <div className="h-48 bg-muted rounded-lg flex items-center justify-center mb-6">
            <span className="text-muted-foreground">Portfolio Value Chart</span>
          </div>

          {/* Holdings */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-foreground">Stocks</span>
              <span className="font-medium text-foreground">$75,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-foreground">Bonds</span>
              <span className="font-medium text-foreground">$30,000</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-foreground">Cash</span>
              <span className="font-medium text-foreground">$19,500.75</span>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Risk Factor */}
          <Card className="p-6 bg-gradient-card shadow-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Risk Factor</h3>
            <div className="mb-4">
              <div className="text-2xl font-bold text-warning">Moderate (5/10)</div>
              <p className="text-muted-foreground text-sm">
                Your current portfolio aligns with a moderate risk tolerance.
              </p>
            </div>
            <div className="h-32 bg-muted rounded-lg flex items-center justify-center">
              <span className="text-muted-foreground">Risk Score Trend</span>
            </div>
          </Card>

          {/* Asset Allocation */}
          <Card className="p-6 bg-gradient-card shadow-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Asset Allocation</h3>
            <div className="h-32 bg-muted rounded-lg flex items-center justify-center mb-4">
              <span className="text-muted-foreground">Pie Chart of Assets</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-foreground">Equities</span>
                <span className="font-medium text-foreground">60%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-foreground">Fixed Income</span>
                <span className="font-medium text-foreground">25%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-foreground">Alternatives</span>
                <span className="font-medium text-foreground">10%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-foreground">Cash</span>
                <span className="font-medium text-foreground">5%</span>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Financial Checklist */}
          <Card className="p-6 bg-gradient-card shadow-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Financial Checklist</h3>
            <div className="space-y-3">
              {[
                "Review Term Insurance",
                "Update Health Insurance", 
                "Fund Emergency Savings",
                "Set up Retirement Plan",
                "Create Will & Estate Plan"
              ].map((item, index) => (
                <div key={item} className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded border ${index < 2 ? 'bg-success border-success' : 'border-border'}`}></div>
                  <span className="text-foreground text-sm">{item}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6 bg-gradient-card shadow-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
            <div className="space-y-4">
              {[
                { action: "Deposit of $500", time: "2 days ago" },
                { action: "Withdrawal of $100", time: "4 days ago" },
                { action: "Portfolio rebalanced", time: "1 week ago" },
                { action: "Chat with AI about taxes", time: "2 weeks ago" }
              ].map((activity) => (
                <div key={activity.action} className="flex justify-between items-center">
                  <span className="text-foreground text-sm">{activity.action}</span>
                  <span className="text-muted-foreground text-xs">{activity.time}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MainContent;