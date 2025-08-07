import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  Share,
  User,
  Settings,
  Sparkles,
  Plus
} from "lucide-react";

const Explore = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const marketIndices = [
    { name: "S&P Futures", symbol: "ES/USD", value: "6,356", change: "-0.24%", color: "text-red-400", trend: "down" },
    { name: "NASDAQ Fut.", symbol: "NQ/USD", value: "23,452.75", change: "+0.13%", color: "text-emerald-400", trend: "up" },
    { name: "Dow Futures", symbol: "YM/USD", value: "44,031", change: "-0.63%", color: "text-red-400", trend: "down" },
    { name: "VIX", symbol: "VIX", value: "17.02", change: "+1.49%", color: "text-emerald-400", trend: "up" }
  ];

  const watchlistStocks = [
    { name: "Apple Inc.", symbol: "AAPL", price: "$220.03", change: "+3.18%" },
    { name: "Alphabet Inc.", symbol: "GOOGL", price: "$197.28", change: "+0.18%" },
    { name: "Meta Platforms, Inc.", symbol: "META", price: "$761.83", change: "-1.32%" },
    { name: "Tesla, Inc.", symbol: "TSLA", price: "$322.29", change: "+0.74%" },
    { name: "Northern Trust Corp...", symbol: "NTRS", price: "$124.73", change: "-0.76%" }
  ];

  const equitySectors = [
    { name: "Technology", value: "$263.31", change: "+0.1%" },
    { name: "Energy", value: "$84.40", change: "-0.38%" },
    { name: "Discretionary", value: "$223.42", change: "-0.02%" },
    { name: "Staples", value: "$82.24", change: "+0.77%" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border px-6 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">FinAI</span>
              <span className="text-muted-foreground">Explore</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search for companies, tickers, or crypto"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-80 bg-muted/50"
              />
            </div>
            <Button variant="outline" size="sm">
              <Share className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button 
              onClick={() => navigate("/dashboard")}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <User className="w-4 h-4 mr-2" />
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Market Data */}
          <div className="lg:col-span-2 space-y-6">
            {/* Navigation Tabs */}
            <div className="flex items-center justify-between">
              <Tabs defaultValue="markets" className="w-full">
                <div className="flex items-center justify-between">
                  <TabsList className="grid w-auto grid-cols-4">
                    <TabsTrigger value="markets">US Markets</TabsTrigger>
                    <TabsTrigger value="crypto">Crypto</TabsTrigger>
                    <TabsTrigger value="earnings">Earnings</TabsTrigger>
                    <TabsTrigger value="screener">Screener</TabsTrigger>
                  </TabsList>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    <span>Aug 8, 2025 • Market Open</span>
                    <Badge variant="secondary" className="text-emerald-400">Upbeat Sentiment</Badge>
                  </div>
                </div>

                <TabsContent value="markets" className="space-y-6 mt-6">
                  {/* Market Indices */}
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                    {marketIndices.map((index, i) => (
                      <Card key={i} className="bg-muted/30 border-border">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-muted-foreground">{index.name}</span>
                            {index.trend === "up" ? (
                              <TrendingUp className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <TrendingDown className="w-4 h-4 text-red-400" />
                            )}
                          </div>
                          <div className="space-y-1">
                            <div className="text-2xl font-bold text-foreground">{index.value}</div>
                            <div className={`text-sm ${index.color}`}>
                              {index.change}
                            </div>
                          </div>
                          {/* Simple chart placeholder */}
                          <div className="mt-3 h-12 flex items-end space-x-1">
                            {Array.from({ length: 20 }).map((_, j) => (
                              <div
                                key={j}
                                className={`w-1 rounded-sm ${
                                  index.trend === "up" ? "bg-emerald-400/60" : "bg-red-400/60"
                                }`}
                                style={{
                                  height: `${Math.random() * 100 + 20}%`
                                }}
                              />
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {/* Market Summary */}
                  <Card className="bg-muted/30 border-border">
                    <CardHeader>
                      <CardTitle className="text-lg">Market Summary</CardTitle>
                      <p className="text-sm text-muted-foreground">Updated 45 minutes ago</p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">Tariffs Shake Market Confidence, But Tech Moves Higher</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Sweeping new tariffs from the Trump administration triggered volatility in U.S. equities, with varied performance across major indices. Technology shares, especially Apple, rallied after the president exempted firms committed to U.S. manufacturing from new chip import duties.
                        </p>
                      </div>
                      
                      <div>
                        <h3 className="font-semibold mb-2">S&P 500 and NASDAQ: Volatile but Resilient</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          The S&P 500 fluctuated and ended slightly lower at -0.36%, while the tech-heavy NASDAQ outperformed, easing only -0.09% after strong moves from Apple and semiconductor stocks. Gains were limited as ongoing tariff uncertainty and mixed economic data kept investors cautious.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-2">Investor Focus Shifts to Monetary Policy Amid Growth Concerns</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Rising expectations for Federal Reserve rate cuts, following a weak U.S. jobs report, supported overall market sentiment. However, Fed officials expressed caution, citing tariff-driven inflation and labor market fragility as reasons not to move hastily.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Right Column - Watchlist & Sectors */}
          <div className="space-y-6">
            {/* Watchlist */}
            <Card className="bg-muted/30 border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Create Watchlist</CardTitle>
                <Button size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-1" />
                  Add
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {watchlistStocks.map((stock, i) => (
                    <div key={i} className="flex items-center justify-between py-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium">{stock.symbol.charAt(0)}</span>
                        </div>
                        <div>
                          <div className="font-medium text-sm">{stock.name}</div>
                          <div className="text-xs text-muted-foreground">{stock.symbol}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{stock.price}</div>
                        <div className={`text-xs ${
                          stock.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'
                        }`}>
                          {stock.change}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Equity Sectors */}
            <Card className="bg-muted/30 border-border">
              <CardHeader>
                <CardTitle className="text-lg">Equity Sectors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {equitySectors.map((sector, i) => (
                    <div key={i} className="flex items-center justify-between py-2">
                      <span className="text-sm font-medium">{sector.name}</span>
                      <div className="text-right">
                        <div className="text-sm font-medium">{sector.value}</div>
                        <div className={`text-xs ${
                          sector.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'
                        }`}>
                          {sector.change}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;