import { useState, useCallback } from "react";
import CalculatorForm from "@/components/organisms/CalculatorForm";
import ProfitDisplay from "@/components/molecules/ProfitDisplay";
import CostBreakdown from "@/components/organisms/CostBreakdown";
import RecentCalculations from "@/components/organisms/RecentCalculations";
import ActionPanel from "@/components/organisms/ActionPanel";
import Empty from "@/components/ui/Empty";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";

const Calculator = () => {
  const [results, setResults] = useState(null);
  const [calculationMode, setCalculationMode] = useState('standard');
  const [bulkResults, setBulkResults] = useState([]);

  const handleCalculate = useCallback((calculationResults) => {
    setResults(calculationResults);
    if (calculationMode === 'bulk' && calculationResults) {
      setBulkResults(prev => [...prev, { ...calculationResults, id: Date.now() }]);
    }
  }, [calculationMode]);

  const handleLoadCalculation = useCallback((calculationData) => {
    // This will trigger the form to load the data and recalculate
    // The form component should handle this via a prop or context
    window.location.reload(); // Simple approach for now
  }, []);

  const calculationModes = [
    {
      id: 'standard',
      title: 'Standard Calculator',
      description: 'Basic profit calculation',
      icon: 'Calculator',
      color: 'from-primary-600 to-primary-700'
    },
    {
      id: 'reverse',
      title: 'Reverse Calculation for Target Profit',
      description: 'Calculate required selling price for desired profit',
      icon: 'Target',
      color: 'from-secondary-600 to-secondary-700'
    },
    {
      id: 'visual',
      title: 'Visual Charts for Cost Breakdown',
      description: 'Interactive charts and visual analysis',
      icon: 'PieChart',
      color: 'from-accent-600 to-accent-700'
    },
    {
      id: 'bulk',
      title: 'Bulk Calculation Mode',
      description: 'Calculate multiple products at once',
      icon: 'Package2',
      color: 'from-green-600 to-green-700'
    },
    {
      id: 'breakeven',
      title: 'Break-Even Analysis Visualization',
      description: 'Investment and profit break-even analysis',
      icon: 'TrendingUp',
      color: 'from-orange-600 to-orange-700'
    }
  ];
return (
    <div className="bg-surface-900 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none">
                <path d="M9 11H15M9 15H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L19.7071 9.70711C19.8946 9.89464 20 10.149 20 10.4142V19C20 20.1046 19.1046 21 18 21H17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13 3V9H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              RL Apna Store
            </h1>
          </div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Advanced dropshipping calculator with multiple calculation modes and visual analytics
          </p>
        </div>

        {/* Feature Selection Panel */}
        <Card className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg">
              <ApperIcon name="Settings2" size={20} className="text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Choose Calculation Mode</h3>
              <p className="text-sm text-gray-400">Select the best calculation method for your needs</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {calculationModes.map((mode) => (
              <Button
                key={mode.id}
                variant={calculationMode === mode.id ? "default" : "secondary"}
                onClick={() => setCalculationMode(mode.id)}
                className="h-auto p-4 flex-col items-start text-left space-y-2"
              >
                <div className="flex items-center gap-2 w-full">
                  <div className={`p-1.5 bg-gradient-to-r ${mode.color} rounded`}>
                    <ApperIcon name={mode.icon} size={16} className="text-white" />
                  </div>
                  <span className="font-medium text-sm">{mode.title}</span>
                </div>
                <p className="text-xs opacity-75 text-left">{mode.description}</p>
              </Button>
            ))}
          </div>
        </Card>

{/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Calculator Form */}
          <div className="lg:col-span-2">
            <CalculatorForm 
              onCalculate={handleCalculate} 
              calculationMode={calculationMode}
              bulkResults={bulkResults}
              setBulkResults={setBulkResults}
            />
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            {results ? (
              <>
                <ProfitDisplay 
                  results={results} 
                  calculationMode={calculationMode}
                />
                <ActionPanel 
                  results={results} 
                  calculationMode={calculationMode}
                  bulkResults={bulkResults}
                />
              </>
) : (
              <Empty
                title="Abhi tak aapne koi calculation nahi ki है।"
                description="Jaise hi aap product details भरेंगे और 'Calculate' पर क्लिक करेंगे, Yahan aapki latest profit aur cost calculations dikhengi. Calculation karne ke liye pehle apne product ki poori jaankari daalen."
                icon="Calculator"
              />
            )}
          </div>
        </div>

        {/* Bulk Results Summary */}
        {calculationMode === 'bulk' && bulkResults.length > 0 && (
          <Card className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-green-600 to-green-700 rounded-lg">
                  <ApperIcon name="Package2" size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Bulk Calculation Summary</h3>
                  <p className="text-sm text-gray-400">{bulkResults.length} products calculated</p>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setBulkResults([])}
              >
                <ApperIcon name="Trash2" size={16} className="mr-2" />
                Clear All
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
              {bulkResults.map((result, index) => (
                <div key={result.id} className="p-4 bg-white/5 rounded-lg border border-white/10">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-white">
                        {result.calculations.productName || `Product ${index + 1}`}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setBulkResults(prev => prev.filter(r => r.id !== result.id))}
                      >
                        <ApperIcon name="X" size={12} />
                      </Button>
                    </div>
                    <div className="text-sm text-gray-400">
                      Profit: <span className={result.totalProfit >= 0 ? "text-accent-400" : "text-red-400"}>
                        ₹{result.totalProfit.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Margin: {result.profitMargin.toFixed(1)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

{/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cost Breakdown */}
          <div>
            {results ? (
              <CostBreakdown 
                results={results} 
                calculationMode={calculationMode}
              />
            ) : (
              <Empty
                title="Cost Breakdown"
                description="Detailed cost analysis will appear here after calculation."
                icon="PieChart"
              />
            )}
          </div>

          {/* Recent Calculations */}
          <div>
            <RecentCalculations onLoadCalculation={handleLoadCalculation} />
          </div>
        </div>

{/* Footer */}
        <div className="py-8 border-t border-white/10">
          <div className="text-center space-y-4">
            <p className="text-gray-400">
              Made for Indian dropshippers • GST compliant calculations
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-500">
              <a href="tel:9876543210" className="flex items-center gap-2 hover:text-accent-400 transition-colors">
                <ApperIcon name="Phone" size={16} />
                <span>9876543210</span>
              </a>
              <a href="mailto:support@rlapnastore.com" className="flex items-center gap-2 hover:text-accent-400 transition-colors">
                <ApperIcon name="Mail" size={16} />
                <span>support@rlapnastore.com</span>
              </a>
              <span className="flex items-center gap-2">
                <ApperIcon name="Clock" size={16} />
                <span>9:00 AM - 9:00 PM</span>
              </span>
            </div>
            <p className="text-xs text-gray-600">
              Aapka apna: <span className="text-accent-400 font-medium">RL Apna Store</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;