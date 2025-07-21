import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";

const ProfitDisplay = ({ results }) => {
  const { totalProfit, profitMargin, perUnitProfit } = results;
  
  const getProfitStatus = (margin) => {
    if (margin > 20) return { status: "excellent", color: "text-green-400", bgColor: "bg-green-500/10", icon: "TrendingUp" };
    if (margin > 10) return { status: "good", color: "text-accent-400", bgColor: "bg-accent-500/10", icon: "TrendingUp" };
    if (margin > 0) return { status: "low", color: "text-yellow-400", bgColor: "bg-yellow-500/10", icon: "Minus" };
    return { status: "loss", color: "text-red-400", bgColor: "bg-red-500/10", icon: "TrendingDown" };
  };

  const profitStatus = getProfitStatus(profitMargin);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const formatPercentage = (percentage) => {
    return `${percentage.toFixed(2)}%`;
  };

  return (
    <Card className="space-y-6">
      <div className="flex items-center gap-3">
        <div className={cn("p-2 rounded-lg", profitStatus.bgColor)}>
          <ApperIcon name={profitStatus.icon} size={20} className={profitStatus.color} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Profit Analysis</h3>
          <p className="text-sm text-gray-400">Real-time calculation results</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <p className="text-sm text-gray-400">Total Profit</p>
          <p className={cn("text-3xl font-bold count-up", profitStatus.color)}>
            {formatCurrency(totalProfit)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Profit Margin</p>
            <p className={cn("text-xl font-semibold", profitStatus.color)}>
              {formatPercentage(profitMargin)}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-400">Per Unit Profit</p>
            <p className={cn("text-xl font-semibold", profitStatus.color)}>
              {formatCurrency(perUnitProfit)}
            </p>
          </div>
        </div>
      </div>

      <div className={cn("p-4 rounded-lg border", profitStatus.bgColor, "border-opacity-20")}>
        <div className="flex items-center gap-2 mb-2">
          <ApperIcon name="Lightbulb" size={16} className="text-yellow-400" />
          <span className="text-sm font-medium text-white">Recommendation</span>
        </div>
        <p className="text-sm text-gray-300">
          {profitMargin > 20 && "Excellent profit margin! Your pricing strategy is working well."}
          {profitMargin <= 20 && profitMargin > 10 && "Good profit margin. Consider optimizing costs for better returns."}
          {profitMargin <= 10 && profitMargin > 0 && "Low profit margin. Review your costs and pricing strategy."}
          {profitMargin <= 0 && "You're making a loss. Consider increasing selling price or reducing costs."}
        </p>
      </div>
    </Card>
  );
};

export default ProfitDisplay;