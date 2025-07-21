import { toast } from "react-toastify";
import React from "react";
import ApperIcon from "@/components/ApperIcon";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";

const ActionPanel = ({ results, calculationMode = 'standard', bulkResults = [] }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const copyResults = async () => {
    if (!results || !results.calculations) {
      toast.error("No calculation data to copy!");
      return;
    }

    const { calculations } = results;
    
    const text = `
🔢 DROPSHIPPING CALCULATION RESULTS

📦 Product: ${calculations.productName || "N/A"}
💰 Selling Price: ${formatCurrency(calculations.sellingPrice)}
📊 Quantity: ${calculations.quantitySold} units

💸 COSTS BREAKDOWN:
• Product Cost: ${formatCurrency(calculations.productCost * calculations.quantitySold)}
• Delivery: ${formatCurrency(calculations.deliveryCharges * calculations.quantitySold)}
• Payment Gateway: ${formatCurrency(calculations.paymentGatewayFees * calculations.quantitySold)}
• Advertising: ${formatCurrency(calculations.advertisingCost * calculations.quantitySold)}
• GST (${calculations.gstRate}%): ${formatCurrency(results.gstAmount)}
• Other Fees: ${formatCurrency(calculations.otherFees * calculations.quantitySold)}

📈 RESULTS:
• Total Revenue: ${formatCurrency(results.totalRevenue)}
• Total Costs: ${formatCurrency(results.totalCost)}
• Total Profit: ${formatCurrency(results.totalProfit)}
• Profit Margin: ${results.profitMargin.toFixed(2)}%
• Per Unit Profit: ${formatCurrency(results.perUnitProfit)}

Generated with ProfitPulse 🚀
    `.trim();

    try {
      await navigator.clipboard.writeText(text);
      toast.success("Results copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy results");
    }
  };

  const saveCalculation = () => {
    if (!results || !results.calculations) {
      toast.error("No calculation data to save!");
      return;
    }

    // Use the globally exposed saveCalculation function
    if (window.saveCalculation) {
      window.saveCalculation(results);
      toast.success("Calculation saved!");
    } else {
      toast.error("Save function not available");
    }
  };

const exportAsImage = () => {
    toast.info("Image export feature coming soon!");
  };

  const exportBulkData = () => {
    if (bulkResults.length === 0) {
      toast.error("No bulk data to export!");
      return;
    }

    const csvData = bulkResults.map(result => ({
      Product: result.calculations.productName || 'N/A',
      'Selling Price': result.calculations.sellingPrice,
      'Product Cost': result.calculations.productCost,
      'Total Profit': result.totalProfit.toFixed(2),
      'Profit Margin': result.profitMargin.toFixed(2) + '%',
      'Per Unit Profit': result.perUnitProfit.toFixed(2)
    }));

    const csvString = [
      Object.keys(csvData[0]).join(','),
      ...csvData.map(row => Object.values(row).join(','))
    ].join('\n');

    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'bulk-calculations.csv';
    link.click();
    URL.revokeObjectURL(url);
    
    toast.success("Bulk data exported as CSV!");
  };

  return (
    <Card className="space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-gradient-to-r from-green-600 to-green-700 rounded-lg">
          <ApperIcon name="Share2" size={20} className="text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Actions</h3>
<p className="text-sm text-gray-400">Export and save your results</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <Button 
          variant="secondary" 
          onClick={copyResults}
          className="justify-start"
        >
          <ApperIcon name="Copy" size={16} className="mr-2" />
          Copy Results
        </Button>
        
        <Button 
          variant="secondary" 
          onClick={saveCalculation}
          className="justify-start"
        >
          <ApperIcon name="Save" size={16} className="mr-2" />
          Save Calculation
        </Button>

        {calculationMode === 'bulk' && bulkResults.length > 0 && (
          <Button 
            variant="secondary" 
            onClick={exportBulkData}
            className="justify-start"
          >
            <ApperIcon name="FileSpreadsheet" size={16} className="mr-2" />
            Export Bulk CSV
          </Button>
        )}
        
        <Button 
          variant="secondary" 
          onClick={exportAsImage}
          className="justify-start"
        >
          <ApperIcon name="Download" size={16} className="mr-2" />
          Export as Image
        </Button>
      </div>
    </Card>
  );
};

export default ActionPanel;