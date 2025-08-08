import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Target, Calendar, DollarSign, TrendingUp, Shield, CheckCircle, Download, Share } from "lucide-react";

interface FinancialPlan {
  emergencyFundTarget: number;
  monthlyInvestment: number;
  retirementCorpus: number;
  retirementAge: number;
  goalTimelines: { goal: string; amount: number; years: number }[];
  recommendations: string[];
}

interface FinancialPlanSummaryProps {
  plan: FinancialPlan;
  onStartOver: () => void;
}

const FinancialPlanSummary = ({ plan, onStartOver }: FinancialPlanSummaryProps) => {
  const formatAmount = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)} L`;
    } else {
      return `₹${amount.toLocaleString()}`;
    }
  };

  const getGoalIcon = (goal: string) => {
    const icons: { [key: string]: any } = {
      retirement: TrendingUp,
      home: Target,
      education: Calendar,
      travel: Calendar,
      business: DollarSign,
      "emergency fund": Shield,
      "debt clearance": CheckCircle
    };
    const Icon = icons[goal] || Target;
    return <Icon className="w-5 h-5" />;
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <CheckCircle className="w-8 h-8 text-green-500" />
          <h1 className="text-3xl font-bold text-foreground">Your Personalized Financial Plan</h1>
        </div>
        <p className="text-lg text-muted-foreground">
          Here's your customized roadmap to financial independence
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-2 border-green-200 dark:border-green-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-600" />
              Emergency Fund
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {formatAmount(plan.emergencyFundTarget)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">6 months expenses</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-blue-600" />
              Monthly Investment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {formatAmount(plan.monthlyInvestment)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Systematic investment</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-purple-200 dark:border-purple-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-purple-600" />
              Retirement Corpus
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {formatAmount(plan.retirementCorpus)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">By age {plan.retirementAge}</p>
          </CardContent>
        </Card>

        <Card className="border-2 border-orange-200 dark:border-orange-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4 text-orange-600" />
              Time to Freedom
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {plan.retirementAge - new Date().getFullYear() + 2000} years
            </div>
            <p className="text-xs text-muted-foreground mt-1">Financial independence</p>
          </CardContent>
        </Card>
      </div>

      {plan.goalTimelines.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Your Goal Timeline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {plan.goalTimelines.map((goal, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    {getGoalIcon(goal.goal)}
                    <div>
                      <h3 className="font-medium capitalize">{goal.goal.replace("-", " ")}</h3>
                      <p className="text-sm text-muted-foreground">Target: {formatAmount(goal.amount)}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-sm">
                    {goal.years} years
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Key Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {plan.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                <p className="text-sm">{recommendation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold">🎉 Congratulations!</h3>
            <p className="text-muted-foreground">
              You now have a clear roadmap to achieve financial independence. Remember, consistency is key to reaching your goals.
            </p>
            <div className="flex gap-3 justify-center">
              <Button onClick={onStartOver} variant="outline">
                Create New Plan
              </Button>
              <Button className="flex items-center gap-2">
                <Download className="w-4 h-4" />
                Download Plan
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Share className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialPlanSummary;