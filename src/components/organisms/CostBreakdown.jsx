import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const CostBreakdown = ({ results }) => {
  if (!results || !results.calculations) return null;

  const { calculations } = results;
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const costItems = [
    {
      label: "Product Cost",
      value: calculations.productCost * calculations.quantitySold,
      icon: "Package",
      color: "text-blue-400"
    },
    {
      label: "Delivery Charges",
      value: calculations.deliveryCharges * calculations.quantitySold,
      icon: "Truck",
      color: "text-green-400"
    },
    {
      label: "Payment Gateway",
      value: calculations.paymentGatewayFees * calculations.quantitySold,
      icon: "CreditCard",
      color: "text-purple-400"
    },
    {
      label: "Advertising Cost",
      value: calculations.advertisingCost * calculations.quantitySold,
      icon: "Megaphone",
      color: "text-orange-400"
    },
    {
      label: "GST Amount",
      value: results.gstAmount,
      icon: "FileText",
      color: "text-yellow-400"
    },
    {
      label: "Other Fees",
      value: calculations.otherFees * calculations.quantitySold,
      icon: "Settings",
      color: "text-gray-400"
    },
  ];

  const totalCosts = costItems.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-r from-secondary-600 to-secondary-700 rounded-lg">
          <ApperIcon name="PieChart" size={20} className="text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Cost Breakdown</h3>
          <p className="text-sm text-gray-400">Detailed cost analysis</p>
        </div>
      </div>

      <div className="space-y-3">
        {costItems.map((item, index) => (
          item.value > 0 && (
            <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
              <div className="flex items-center gap-3">
                <ApperIcon name={item.icon} size={16} className={item.color} />
                <span className="text-sm text-gray-300">{item.label}</span>
              </div>
              <span className="text-sm font-medium text-white">
                {formatCurrency(item.value)}
              </span>
            </div>
          )
        ))}
      </div>

      <div className="border-t border-white/10 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ApperIcon name="Calculator" size={16} className="text-accent-400" />
            <span className="font-medium text-white">Total Costs</span>
          </div>
          <span className="text-lg font-bold text-accent-400">
            {formatCurrency(totalCosts)}
          </span>
        </div>
      </div>

      <div className="bg-gradient-to-r from-accent-500/10 to-accent-600/10 border border-accent-500/20 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ApperIcon name="TrendingUp" size={16} className="text-accent-400" />
            <span className="font-medium text-white">Revenue</span>
          </div>
          <span className="text-lg font-bold text-accent-400">
            {formatCurrency(results.totalRevenue)}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default CostBreakdown;