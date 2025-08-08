import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Target, Calendar, DollarSign, TrendingUp, Shield, Home, GraduationCap, Heart } from "lucide-react";

interface UserProfile {
  age?: number;
  location?: string;
  maritalStatus?: "single" | "married" | "divorced" | "widowed";
  monthlyIncome?: number;
  currentSavings?: number;
  existingInvestments?: number;
  monthlySavingCapacity?: number;
  emergencyFund?: number;
  hasTermInsurance?: boolean;
  hasMedicalInsurance?: boolean;
  goals?: string[];
  riskTolerance?: "conservative" | "moderate" | "aggressive";
}

interface FinancialPlan {
  emergencyFundTarget: number;
  monthlyInvestment: number;
  retirementCorpus: number;
  retirementAge: number;
  goalTimelines: { goal: string; amount: number; years: number }[];
  recommendations: string[];
}

interface FinancialPlanningFlowProps {
  onComplete: (plan: FinancialPlan) => void;
}

const questions = [
  {
    id: "intro",
    question: "Let's create your personalized financial independence plan! I'll ask you a few questions to understand your situation better. What's your current age?",
    type: "number",
    field: "age"
  },
  {
    id: "location", 
    question: "Which city/country are you based in? This helps me understand cost of living and investment options.",
    type: "text",
    field: "location"
  },
  {
    id: "marital",
    question: "What's your marital status?",
    type: "options",
    field: "maritalStatus",
    options: ["single", "married", "divorced", "widowed"]
  },
  {
    id: "income",
    question: "What's your current monthly income (after taxes)?",
    type: "number",
    field: "monthlyIncome"
  },
  {
    id: "savings",
    question: "How much do you currently have in savings?",
    type: "number", 
    field: "currentSavings"
  },
  {
    id: "investments",
    question: "What's the current value of your existing investments (stocks, mutual funds, etc.)?",
    type: "number",
    field: "existingInvestments"
  },
  {
    id: "capacity",
    question: "How much can you comfortably save/invest every month?",
    type: "number",
    field: "monthlySavingCapacity"
  },
  {
    id: "emergency",
    question: "Do you have an emergency fund? If yes, how many months of expenses does it cover?",
    type: "number",
    field: "emergencyFund"
  },
  {
    id: "term",
    question: "Do you have term life insurance?",
    type: "boolean",
    field: "hasTermInsurance"
  },
  {
    id: "medical",
    question: "Do you have medical/health insurance?",
    type: "boolean", 
    field: "hasMedicalInsurance"
  },
  {
    id: "goals",
    question: "What are your main financial goals? (Select all that apply)",
    type: "multiple",
    field: "goals",
    options: ["retirement", "home", "education", "travel", "emergency fund", "debt clearance", "business"]
  },
  {
    id: "risk",
    question: "What's your risk tolerance for investments?",
    type: "options",
    field: "riskTolerance", 
    options: ["conservative", "moderate", "aggressive"]
  }
];

const FinancialPlanningFlow = ({ onComplete }: FinancialPlanningFlowProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userProfile, setUserProfile] = useState<UserProfile>({});
  const [inputValue, setInputValue] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleNext = () => {
    const updatedProfile = { ...userProfile };
    
    if (currentQuestion.type === "number") {
      (updatedProfile as any)[currentQuestion.field] = parseFloat(inputValue) || 0;
    } else if (currentQuestion.type === "text") {
      (updatedProfile as any)[currentQuestion.field] = inputValue;
    } else if (currentQuestion.type === "options") {
      (updatedProfile as any)[currentQuestion.field] = inputValue;
    } else if (currentQuestion.type === "boolean") {
      (updatedProfile as any)[currentQuestion.field] = inputValue === "yes";
    } else if (currentQuestion.type === "multiple") {
      (updatedProfile as any)[currentQuestion.field] = selectedOptions;
    }

    setUserProfile(updatedProfile);
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
      setInputValue("");
      setSelectedOptions([]);
    } else {
      generatePlan(updatedProfile);
    }
  };

  const generatePlan = (profile: UserProfile) => {
    const monthlyExpenses = (profile.monthlyIncome || 0) * 0.7; // Assume 70% of income as expenses
    const emergencyFundTarget = monthlyExpenses * 6;
    const yearsToRetirement = 60 - (profile.age || 30);
    const monthlyInvestment = profile.monthlySavingCapacity || 0;
    
    // Simple compound interest calculation for retirement corpus
    const annualReturn = profile.riskTolerance === "aggressive" ? 0.12 : 
                        profile.riskTolerance === "moderate" ? 0.10 : 0.08;
    const monthlyReturn = annualReturn / 12;
    const totalMonths = yearsToRetirement * 12;
    
    const retirementCorpus = monthlyInvestment * 
      ((Math.pow(1 + monthlyReturn, totalMonths) - 1) / monthlyReturn);

    const goalTimelines = (profile.goals || []).map(goal => {
      const goalAmounts: { [key: string]: number } = {
        home: 5000000,
        education: 2000000, 
        travel: 500000,
        business: 3000000,
        "debt clearance": 1000000,
        "emergency fund": emergencyFundTarget
      };
      
      const amount = goalAmounts[goal] || 1000000;
      const years = Math.ceil(amount / (monthlyInvestment * 12));
      
      return { goal, amount, years };
    });

    const recommendations = [
      `Build emergency fund of ₹${emergencyFundTarget.toLocaleString()} (6 months expenses)`,
      !profile.hasTermInsurance ? "Get term life insurance of 10-15x annual income" : "",
      !profile.hasMedicalInsurance ? "Get comprehensive health insurance" : "",
      `Invest ₹${monthlyInvestment.toLocaleString()} monthly for retirement`,
      profile.riskTolerance === "aggressive" ? "Consider equity mutual funds for higher returns" : 
      profile.riskTolerance === "moderate" ? "Mix of equity and debt funds" : "Focus on debt funds and FDs",
      "Review and rebalance portfolio annually"
    ].filter(Boolean);

    const plan: FinancialPlan = {
      emergencyFundTarget,
      monthlyInvestment,
      retirementCorpus,
      retirementAge: 60,
      goalTimelines,
      recommendations
    };

    onComplete(plan);
  };

  const toggleOption = (option: string) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter(o => o !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const canProceed = () => {
    if (currentQuestion.type === "multiple") {
      return selectedOptions.length > 0;
    }
    return inputValue.trim() !== "";
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-foreground">Financial Planning Journey</h2>
          <Badge variant="outline">{currentStep + 1} of {questions.length}</Badge>
        </div>
        <Progress value={progress} className="w-full" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{currentQuestion.question}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentQuestion.type === "number" && (
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter amount"
              className="w-full p-3 border border-border rounded-lg bg-background text-foreground"
              autoFocus
            />
          )}
          
          {currentQuestion.type === "text" && (
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter your answer"
              className="w-full p-3 border border-border rounded-lg bg-background text-foreground"
              autoFocus
            />
          )}
          
          {currentQuestion.type === "options" && (
            <div className="grid grid-cols-2 gap-3">
              {currentQuestion.options?.map((option) => (
                <Button
                  key={option}
                  variant={inputValue === option ? "default" : "outline"}
                  onClick={() => setInputValue(option)}
                  className="capitalize"
                >
                  {option}
                </Button>
              ))}
            </div>
          )}
          
          {currentQuestion.type === "boolean" && (
            <div className="flex gap-3">
              <Button
                variant={inputValue === "yes" ? "default" : "outline"}
                onClick={() => setInputValue("yes")}
                className="flex-1"
              >
                Yes
              </Button>
              <Button
                variant={inputValue === "no" ? "default" : "outline"}
                onClick={() => setInputValue("no")}
                className="flex-1"
              >
                No
              </Button>
            </div>
          )}
          
          {currentQuestion.type === "multiple" && (
            <div className="grid grid-cols-2 gap-3">
              {currentQuestion.options?.map((option) => (
                <Button
                  key={option}
                  variant={selectedOptions.includes(option) ? "default" : "outline"}
                  onClick={() => toggleOption(option)}
                  className="capitalize flex items-center gap-2"
                >
                  {selectedOptions.includes(option) && <CheckCircle className="w-4 h-4" />}
                  {option}
                </Button>
              ))}
            </div>
          )}
          
          <Button 
            onClick={handleNext}
            disabled={!canProceed()}
            className="w-full"
          >
            {currentStep === questions.length - 1 ? "Generate My Plan" : "Next"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FinancialPlanningFlow;