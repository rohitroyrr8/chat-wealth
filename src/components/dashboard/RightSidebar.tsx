import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const RightSidebar = () => {
  return (
    <div className="w-80 bg-background border-l border-border p-6 space-y-6">
      {/* Quick Insights */}
      <Card className="p-6 bg-gradient-card shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-3">Quick Insights</h3>
        <p className="text-muted-foreground text-sm">
          Your portfolio is performing well, up 1.2% today. Consider reviewing your risk tolerance.
        </p>
      </Card>

      {/* Next Steps */}
      <Card className="p-6 bg-gradient-card shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Next Steps</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <span className="text-foreground text-sm">Review Q3 Performance</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary"></div>
            <span className="text-foreground text-sm">Update Budget Categories</span>
          </div>
        </div>
      </Card>

      {/* Related Articles */}
      <Card className="p-6 bg-gradient-card shadow-card">
        <h3 className="text-lg font-semibold text-foreground mb-4">Related Articles</h3>
        <div className="space-y-4">
          <div>
            <h4 className="text-foreground text-sm font-medium mb-1">Understanding Market Volatility</h4>
            <p className="text-muted-foreground text-xs">Learn how to navigate market ups and downs</p>
          </div>
          <div>
            <h4 className="text-foreground text-sm font-medium mb-1">The Power of Compound Interest</h4>
            <p className="text-muted-foreground text-xs">Maximize your long-term wealth building</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RightSidebar;