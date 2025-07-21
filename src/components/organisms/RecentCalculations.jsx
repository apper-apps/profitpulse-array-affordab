import { useState, useEffect } from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { format } from "date-fns";
import { toast } from "react-toastify";

const RecentCalculations = ({ onLoadCalculation }) => {
  const [calculations, setCalculations] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("profitpulse-calculations");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCalculations(parsed);
      } catch (error) {
        console.error("Error parsing saved calculations:", error);
      }
    }
  }, []);

  const saveCalculation = (calculation) => {
    const newCalculation = {
      id: Date.now().toString(),
      ...calculation,
      timestamp: new Date().toISOString(),
    };

    const updated = [newCalculation, ...calculations.slice(0, 4)];
    setCalculations(updated);
    localStorage.setItem("profitpulse-calculations", JSON.stringify(updated));
  };

  const clearAll = () => {
    setCalculations([]);
    localStorage.removeItem("profitpulse-calculations");
    toast.success("All calculations cleared!");
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Expose saveCalculation function
  useEffect(() => {
    window.saveCalculation = saveCalculation;
    return () => {
      delete window.saveCalculation;
    };
  }, [calculations]);

  if (calculations.length === 0) {
    return (
      <Card className="text-center py-8">
        <ApperIcon name="History" size={32} className="text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-white mb-2">No Recent Calculations</h3>
        <p className="text-sm text-gray-400">
          Your recent calculations will appear here
        </p>
      </Card>
    );
  }

  return (
    <Card className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg">
            <ApperIcon name="History" size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">Recent Calculations</h3>
            <p className="text-sm text-gray-400">Last 5 calculations</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={clearAll}>
          <ApperIcon name="Trash2" size={16} />
        </Button>
      </div>

      <div className="space-y-3">
        {calculations.map((calc) => {
          const profitColor = calc.totalProfit > 0 ? "text-accent-400" : "text-red-400";
          
          return (
            <div
              key={calc.id}
              className="p-4 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 cursor-pointer transition-all duration-200"
              onClick={() => onLoadCalculation(calc.calculations)}
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-white truncate">
                  {calc.calculations.productName || "Unnamed Product"}
                </h4>
                <span className="text-xs text-gray-400">
                  {format(new Date(calc.timestamp), "MMM dd, HH:mm")}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-400">Revenue:</span>
                  <span className="ml-2 text-white">
                    {formatCurrency(calc.totalRevenue)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Profit:</span>
                  <span className={`ml-2 font-medium ${profitColor}`}>
                    {formatCurrency(calc.totalProfit)}
                  </span>
                </div>
              </div>
              
              <div className="mt-2 text-sm">
                <span className="text-gray-400">Margin:</span>
                <span className={`ml-2 font-medium ${profitColor}`}>
                  {calc.profitMargin.toFixed(2)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default RecentCalculations;