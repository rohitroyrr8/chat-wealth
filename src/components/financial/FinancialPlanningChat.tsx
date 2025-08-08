import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Download, RotateCcw, Target, Calendar, DollarSign, TrendingUp, Shield, CheckCircle } from "lucide-react";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
  type?: "question" | "plan" | "normal";
}

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

const questions = [
  {
    id: "age",
    question: "Great! Let's start by understanding your current situation. What's your age?",
    field: "age",
    type: "number"
  },
  {
    id: "location",
    question: "Which city/country are you based in? This helps me understand cost of living and investment options.",
    field: "location", 
    type: "text"
  },
  {
    id: "marital",
    question: "What's your marital status? (single/married/divorced/widowed)",
    field: "maritalStatus",
    type: "options",
    options: ["single", "married", "divorced", "widowed"]
  },
  {
    id: "income",
    question: "What's your current monthly income after taxes?",
    field: "monthlyIncome",
    type: "number"
  },
  {
    id: "savings",
    question: "How much do you currently have in savings?",
    field: "currentSavings",
    type: "number"
  },
  {
    id: "investments", 
    question: "What's the current value of your existing investments (stocks, mutual funds, etc.)?",
    field: "existingInvestments",
    type: "number"
  },
  {
    id: "capacity",
    question: "How much can you comfortably save/invest every month?",
    field: "monthlySavingCapacity", 
    type: "number"
  },
  {
    id: "emergency",
    question: "Do you have an emergency fund? If yes, how many months of expenses does it cover? (Enter 0 if no emergency fund)",
    field: "emergencyFund",
    type: "number"
  },
  {
    id: "term",
    question: "Do you have term life insurance? (yes/no)",
    field: "hasTermInsurance",
    type: "boolean"
  },
  {
    id: "medical",
    question: "Do you have medical/health insurance? (yes/no)",
    field: "hasMedicalInsurance",
    type: "boolean"
  },
  {
    id: "goals",
    question: "What are your main financial goals? You can mention multiple goals like: retirement, home, education, travel, emergency fund, debt clearance, business",
    field: "goals",
    type: "multiple"
  },
  {
    id: "risk",
    question: "What's your risk tolerance for investments? (conservative/moderate/aggressive)",
    field: "riskTolerance",
    type: "options",
    options: ["conservative", "moderate", "aggressive"]
  }
];

interface FinancialPlanningChatProps {
  onComplete?: () => void;
}

const FinancialPlanningChat = ({ onComplete }: FinancialPlanningChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [userProfile, setUserProfile] = useState<UserProfile>({});
  const [isComplete, setIsComplete] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState<FinancialPlan | null>(null);

  useEffect(() => {
    // Start with welcome message
    const welcomeMessage: Message = {
      id: "welcome",
      content: "Hi! I'm here to help you create a personalized financial independence plan. I'll ask you a few questions to understand your situation better, and then create a customized roadmap for your financial goals. Ready to get started?",
      role: "assistant",
      timestamp: new Date(),
      type: "normal"
    };
    setMessages([welcomeMessage]);
    
    // Start with first question after a brief delay
    setTimeout(() => {
      askNextQuestion();
    }, 1000);
  }, []);

  const askNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      const question = questions[nextIndex];
      const questionMessage: Message = {
        id: `question-${nextIndex}`,
        content: question.question,
        role: "assistant", 
        timestamp: new Date(),
        type: "question"
      };
      setMessages(prev => [...prev, questionMessage]);
      setCurrentQuestionIndex(nextIndex);
    } else {
      generateFinancialPlan();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInput.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: currentInput,
      role: "user",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);

    // Process the answer
    if (currentQuestionIndex >= 0 && currentQuestionIndex < questions.length) {
      const currentQuestion = questions[currentQuestionIndex];
      const updatedProfile = { ...userProfile };

      if (currentQuestion.type === "number") {
        (updatedProfile as any)[currentQuestion.field] = parseFloat(currentInput) || 0;
      } else if (currentQuestion.type === "text") {
        (updatedProfile as any)[currentQuestion.field] = currentInput;
      } else if (currentQuestion.type === "options") {
        (updatedProfile as any)[currentQuestion.field] = currentInput.toLowerCase();
      } else if (currentQuestion.type === "boolean") {
        (updatedProfile as any)[currentQuestion.field] = currentInput.toLowerCase().includes("yes");
      } else if (currentQuestion.type === "multiple") {
        const goals = currentInput.toLowerCase().split(/[,\s]+/).filter(g => g.length > 0);
        (updatedProfile as any)[currentQuestion.field] = goals;
      }

      setUserProfile(updatedProfile);
    }

    setCurrentInput("");

    // Ask next question after a brief delay
    setTimeout(() => {
      askNextQuestion();
    }, 500);
  };

  const generateFinancialPlan = () => {
    const monthlyExpenses = (userProfile.monthlyIncome || 0) * 0.7;
    const emergencyFundTarget = monthlyExpenses * 6;
    const yearsToRetirement = 60 - (userProfile.age || 30);
    const monthlyInvestment = userProfile.monthlySavingCapacity || 0;
    
    const annualReturn = userProfile.riskTolerance === "aggressive" ? 0.12 : 
                        userProfile.riskTolerance === "moderate" ? 0.10 : 0.08;
    const monthlyReturn = annualReturn / 12;
    const totalMonths = yearsToRetirement * 12;
    
    const retirementCorpus = monthlyInvestment * 
      ((Math.pow(1 + monthlyReturn, totalMonths) - 1) / monthlyReturn);

    const goalTimelines = (userProfile.goals || []).map(goal => {
      const goalAmounts: { [key: string]: number } = {
        home: 5000000,
        education: 2000000,
        travel: 500000, 
        business: 3000000,
        "debt clearance": 1000000,
        "emergency fund": emergencyFundTarget,
        retirement: retirementCorpus
      };
      
      const amount = goalAmounts[goal] || 1000000;
      const years = Math.ceil(amount / (monthlyInvestment * 12));
      
      return { goal, amount, years };
    });

    const recommendations = [
      `Build emergency fund of ₹${emergencyFundTarget.toLocaleString()} (6 months expenses)`,
      !userProfile.hasTermInsurance ? "Get term life insurance of 10-15x annual income" : "",
      !userProfile.hasMedicalInsurance ? "Get comprehensive health insurance" : "",
      `Invest ₹${monthlyInvestment.toLocaleString()} monthly for retirement`,
      userProfile.riskTolerance === "aggressive" ? "Consider equity mutual funds for higher returns" : 
      userProfile.riskTolerance === "moderate" ? "Mix of equity and debt funds" : "Focus on debt funds and FDs",
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

    setGeneratedPlan(plan);

    // Add completion message
    const completionMessage: Message = {
      id: "completion",
      content: "Perfect! I've analyzed all your information and created your personalized financial plan. Here's your complete roadmap to financial independence:",
      role: "assistant",
      timestamp: new Date(),
      type: "normal"
    };

    const planMessage: Message = {
      id: "plan",
      content: "", // Plan will be rendered as a special component
      role: "assistant", 
      timestamp: new Date(),
      type: "plan"
    };

    setMessages(prev => [...prev, completionMessage, planMessage]);
    setIsComplete(true);
  };

  const formatAmount = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)} Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)} L`;
    } else {
      return `₹${amount.toLocaleString()}`;
    }
  };

  const handleStartOver = () => {
    setMessages([]);
    setCurrentQuestionIndex(-1);
    setUserProfile({});
    setIsComplete(false);
    setGeneratedPlan(null);
    setCurrentInput("");
    
    // Restart the flow
    setTimeout(() => {
      const welcomeMessage: Message = {
        id: "welcome-new",
        content: "Let's create a new financial plan for you! Ready to start fresh?",
        role: "assistant",
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
      setTimeout(() => askNextQuestion(), 1000);
    }, 500);
  };

  return (
    <div className="flex-1 bg-background flex flex-col h-screen">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-foreground">Financial Planning Assistant</h1>
          <Badge variant="secondary" className="text-xs">
            AI-Powered Personal Finance
          </Badge>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <div key={message.id} className="space-y-4">
              {message.role === "user" ? (
                <div className="flex justify-end">
                  <div className="bg-primary/10 border border-primary/20 rounded-2xl px-4 py-3 max-w-2xl">
                    <p className="text-foreground">{message.content}</p>
                  </div>
                </div>
              ) : message.type === "plan" && generatedPlan ? (
                <div className="space-y-6">
                  {/* Plan Summary Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="border-2 border-green-200 dark:border-green-800">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium">Emergency Fund</span>
                        </div>
                        <div className="text-xl font-bold text-green-600">
                          {formatAmount(generatedPlan.emergencyFundTarget)}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-blue-200 dark:border-blue-800">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <DollarSign className="w-4 h-4 text-blue-600" />
                          <span className="text-sm font-medium">Monthly Investment</span>
                        </div>
                        <div className="text-xl font-bold text-blue-600">
                          {formatAmount(generatedPlan.monthlyInvestment)}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-purple-200 dark:border-purple-800">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-4 h-4 text-purple-600" />
                          <span className="text-sm font-medium">Retirement Corpus</span>
                        </div>
                        <div className="text-xl font-bold text-purple-600">
                          {formatAmount(generatedPlan.retirementCorpus)}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-orange-200 dark:border-orange-800">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-orange-600" />
                          <span className="text-sm font-medium">Time to Freedom</span>
                        </div>
                        <div className="text-xl font-bold text-orange-600">
                          {generatedPlan.retirementAge - (userProfile.age || 30)} years
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Recommendations */}
                  <Card>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500" />
                        Key Recommendations
                      </h3>
                      <div className="space-y-2">
                        {generatedPlan.recommendations.map((rec, index) => (
                          <div key={index} className="flex items-start gap-2 text-sm">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{rec}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Action Buttons */}
                  <div className="flex gap-3 justify-center">
                    <Button onClick={handleStartOver} variant="outline" className="flex items-center gap-2">
                      <RotateCcw className="w-4 h-4" />
                      Start New Plan
                    </Button>
                    <Button className="flex items-center gap-2">
                      <Download className="w-4 h-4" />
                      Download Plan
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="prose prose-sm max-w-none">
                    <p className="text-foreground leading-relaxed">{message.content}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input Area */}
      {!isComplete && (
        <div className="p-6 border-t border-border">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="relative">
              <div className="flex items-center gap-3 bg-muted/30 rounded-xl border border-border p-3">
                <Input
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  placeholder="Type your answer here..."
                  className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground"
                  autoFocus
                />
                <Button 
                  type="submit" 
                  size="sm" 
                  className="h-8 w-8 p-0 bg-primary hover:bg-primary/90"
                  disabled={!currentInput.trim()}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinancialPlanningChat;