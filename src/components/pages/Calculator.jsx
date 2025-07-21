import { useState, useCallback } from "react";
import CalculatorForm from "@/components/organisms/CalculatorForm";
import ProfitDisplay from "@/components/molecules/ProfitDisplay";
import CostBreakdown from "@/components/organisms/CostBreakdown";
import RecentCalculations from "@/components/organisms/RecentCalculations";
import ActionPanel from "@/components/organisms/ActionPanel";
import Empty from "@/components/ui/Empty";

const Calculator = () => {
  const [results, setResults] = useState(null);

  const handleCalculate = useCallback((calculationResults) => {
    setResults(calculationResults);
  }, []);

  const handleLoadCalculation = useCallback((calculationData) => {
    // This will trigger the form to load the data and recalculate
    // The form component should handle this via a prop or context
    window.location.reload(); // Simple approach for now
  }, []);

  return (
    <div className="min-h-screen bg-surface-900 p-4 lg:p-8">
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
              ProfitPulse
            </h1>
          </div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Calculate accurate profit margins for your dropshipping business with all hidden costs included
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Calculator Form */}
          <div className="lg:col-span-2">
            <CalculatorForm onCalculate={handleCalculate} />
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            {results ? (
              <>
                <ProfitDisplay results={results} />
                <ActionPanel results={results} />
              </>
            ) : (
              <Empty
                title="Ready to Calculate"
                description="Enter your product details on the left to see profit analysis here."
                icon="Calculator"
              />
            )}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cost Breakdown */}
          <div>
            {results ? (
              <CostBreakdown results={results} />
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
        <div className="text-center py-8 border-t border-white/10">
          <p className="text-gray-400">
            Made for Indian dropshippers • GST compliant calculations
          </p>
        </div>
      </div>
    </div>
  );
};

export default Calculator;