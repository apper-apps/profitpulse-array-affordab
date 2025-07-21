import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import GSTSelector from "@/components/molecules/GSTSelector";
import FormField from "@/components/molecules/FormField";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";

const CalculatorForm = ({ onCalculate, calculationMode = 'standard', bulkResults, setBulkResults }) => {
const [formData, setFormData] = useState({
    productName: "",
    productCost: "",
    deliveryCharges: "",
    paymentGatewayFees: "",
    advertisingCost: "",
    gstRate: 18,
    sellingPrice: "",
    quantitySold: "1",
    otherFees: "",
    targetProfit: "",
    selectedPreset: ""
  });

  const presetTemplates = {
    electronics: {
      name: "Electronics",
      productCost: "2000",
      deliveryCharges: "50",
      paymentGatewayFees: "30",
      advertisingCost: "100",
      gstRate: 18,
      otherFees: "25"
    },
    fashion: {
      name: "Fashion & Clothing",
      productCost: "500",
      deliveryCharges: "40",
      paymentGatewayFees: "20",
      advertisingCost: "80",
      gstRate: 12,
      otherFees: "15"
    },
    home: {
      name: "Home & Kitchen",
      productCost: "800",
      deliveryCharges: "60",
      paymentGatewayFees: "25",
      advertisingCost: "60",
      gstRate: 18,
      otherFees: "20"
    },
    beauty: {
      name: "Beauty & Personal Care",
      productCost: "300",
      deliveryCharges: "35",
      paymentGatewayFees: "15",
      advertisingCost: "70",
      gstRate: 18,
      otherFees: "10"
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePresetChange = (presetKey) => {
    if (presetKey && presetTemplates[presetKey]) {
      const preset = presetTemplates[presetKey];
      setFormData(prev => ({
        ...prev,
        selectedPreset: presetKey,
        productCost: preset.productCost,
        deliveryCharges: preset.deliveryCharges,
        paymentGatewayFees: preset.paymentGatewayFees,
        advertisingCost: preset.advertisingCost,
        gstRate: preset.gstRate,
        otherFees: preset.otherFees
      }));
      toast.success(`Applied ${preset.name} template!`);
    }
  };

  const handleClear = () => {
    setFormData({
      productName: "",
      productCost: "",
      deliveryCharges: "",
      paymentGatewayFees: "",
      advertisingCost: "",
      gstRate: 18,
      sellingPrice: "",
      quantitySold: "1",
      otherFees: "",
    });
    toast.success("Form cleared successfully!");
  };

// Calculate results whenever form data changes
  useEffect(() => {
    const productCost = parseFloat(formData.productCost) || 0;
    const deliveryCharges = parseFloat(formData.deliveryCharges) || 0;
    const paymentGatewayFees = parseFloat(formData.paymentGatewayFees) || 0;
    const advertisingCost = parseFloat(formData.advertisingCost) || 0;
    const gstRate = parseFloat(formData.gstRate) || 0;
    const quantitySold = parseFloat(formData.quantitySold) || 1;
    const otherFees = parseFloat(formData.otherFees) || 0;
    const targetProfit = parseFloat(formData.targetProfit) || 0;

    let sellingPrice = parseFloat(formData.sellingPrice) || 0;

    // Handle reverse calculation mode
    if (calculationMode === 'reverse' && targetProfit > 0 && productCost > 0) {
      const totalCostPerUnit = productCost + deliveryCharges + paymentGatewayFees + advertisingCost + otherFees;
      const desiredProfitPerUnit = targetProfit / quantitySold;
      const netSellingPriceRequired = totalCostPerUnit + desiredProfitPerUnit;
      // Calculate selling price including GST
      sellingPrice = netSellingPriceRequired / (1 - gstRate / 100);
      
      // Auto-update selling price field for reverse calculation
      if (Math.abs(parseFloat(formData.sellingPrice) - sellingPrice) > 0.01) {
        setFormData(prev => ({ ...prev, sellingPrice: sellingPrice.toFixed(2) }));
      }
    }

    if (productCost > 0 && sellingPrice > 0) {
      const totalCostPerUnit = productCost + deliveryCharges + paymentGatewayFees + advertisingCost + otherFees;
      const gstAmount = (sellingPrice * gstRate) / 100;
      const netSellingPrice = sellingPrice - gstAmount;
      const profitPerUnit = netSellingPrice - totalCostPerUnit;
      const totalProfit = profitPerUnit * quantitySold;
      const totalRevenue = netSellingPrice * quantitySold;
      const totalCost = totalCostPerUnit * quantitySold;
      const profitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

      // Break-even analysis
      const breakEvenUnits = profitPerUnit > 0 ? Math.ceil(totalCostPerUnit / profitPerUnit) : 0;
      const breakEvenRevenue = breakEvenUnits * netSellingPrice;

      const results = {
        totalCost,
        gstAmount: gstAmount * quantitySold,
        totalRevenue,
        totalProfit,
        profitMargin,
        perUnitProfit: profitPerUnit,
        breakEvenUnits,
        breakEvenRevenue,
        calculations: {
          ...formData,
          productCost,
          deliveryCharges,
          paymentGatewayFees,
          advertisingCost,
          gstRate,
          sellingPrice,
          quantitySold,
          otherFees,
          targetProfit
        }
      };

      onCalculate(results);
    }
  }, [formData, onCalculate, calculationMode]);

return (
    <Card className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg">
            <ApperIcon name="Calculator" size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">
              {calculationMode === 'reverse' && 'Reverse Calculation Mode'}
              {calculationMode === 'visual' && 'Visual Calculator Mode'}
              {calculationMode === 'bulk' && 'Bulk Calculation Mode'}
              {calculationMode === 'breakeven' && 'Break-Even Analysis Mode'}
              {calculationMode === 'standard' && 'Dropshipping Calculator'}
            </h2>
            <p className="text-sm text-gray-400">
              {calculationMode === 'reverse' && 'Set target profit to calculate required selling price'}
              {calculationMode === 'visual' && 'Enhanced calculator with visual cost breakdown'}
              {calculationMode === 'bulk' && 'Calculate multiple products efficiently'}
              {calculationMode === 'breakeven' && 'Analyze break-even points and investment recovery'}
              {calculationMode === 'standard' && 'Enter your product details below'}
            </p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={handleClear}>
          <ApperIcon name="RotateCcw" size={16} className="mr-2" />
          Clear
        </Button>
      </div>

      {/* Preset Templates */}
      {(calculationMode === 'standard' || calculationMode === 'visual') && (
        <div className="border-b border-white/10 pb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-1.5 bg-gradient-to-r from-purple-600 to-purple-700 rounded">
              <ApperIcon name="Layers" size={16} className="text-white" />
            </div>
            <span className="text-sm font-medium text-white">Quick Start Templates</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {Object.entries(presetTemplates).map(([key, preset]) => (
              <Button
                key={key}
                variant={formData.selectedPreset === key ? "default" : "secondary"}
                size="sm"
                onClick={() => handlePresetChange(key)}
                className="text-xs"
              >
                {preset.name}
              </Button>
            ))}
          </div>
        </div>
      )}

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="Product Name"
          icon="Package"
          value={formData.productName}
          onChange={(e) => handleInputChange("productName", e.target.value)}
          placeholder="e.g., Wireless Earbuds"
          type="text"
          tooltip="Give your product a name for reference"
        />

        <FormField
          label="Product Cost (base rate of the product)"
          icon="IndianRupee"
          value={formData.productCost}
          onChange={(e) => handleInputChange("productCost", e.target.value)}
          placeholder="0.00"
          prefix="₹"
          tooltip="The actual cost to purchase one item"
        />

        <FormField
          label="Delivery Charges (delivery charge)"
          icon="Truck"
          value={formData.deliveryCharges}
          onChange={(e) => handleInputChange("deliveryCharges", e.target.value)}
          placeholder="0.00"
          prefix="₹"
          tooltip="Shipping cost per order"
        />

        <FormField
          label="Payment Gateway Fees (payment fee, if any)"
          icon="CreditCard"
          value={formData.paymentGatewayFees}
          onChange={(e) => handleInputChange("paymentGatewayFees", e.target.value)}
          placeholder="0.00"
          prefix="₹"
          tooltip="Transaction fees charged by payment processor"
        />

        <FormField
          label="Advertising Cost (ad/platform cost for the product)"
          icon="Megaphone"
          value={formData.advertisingCost}
          onChange={(e) => handleInputChange("advertisingCost", e.target.value)}
          placeholder="0.00"
          prefix="₹"
          tooltip="Marketing cost per product or order"
        />

        <FormField
          label="Other Charges (if any)"
          icon="FileText"
          value={formData.otherFees}
          onChange={(e) => handleInputChange("otherFees", e.target.value)}
          placeholder="0.00"
          prefix="₹"
          tooltip="Platform or fulfillment charges, if any"
        />
      </div>

      <div className="border-t border-white/10 pt-6">
        <GSTSelector
          value={formData.gstRate}
          onChange={(value) => handleInputChange("gstRate", value)}
        />
      </div>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {calculationMode === 'reverse' ? (
          <FormField
            label="Target Profit"
            icon="Target"
            value={formData.targetProfit}
            onChange={(e) => handleInputChange("targetProfit", e.target.value)}
            placeholder="0.00"
            prefix="₹"
            tooltip="Desired total profit amount"
          />
        ) : (
          <FormField
            label="Selling Price (rate at which you are selling to the customer)"
            icon="Tag"
            value={formData.sellingPrice}
            onChange={(e) => handleInputChange("sellingPrice", e.target.value)}
            placeholder="0.00"
            prefix="₹"
            tooltip="Price you charge to customers (including GST)"
            disabled={calculationMode === 'reverse'}
          />
        )}

        <FormField
          label="Quantity Sold (how many units sold)"
          icon="Hash"
          value={formData.quantitySold}
          onChange={(e) => handleInputChange("quantitySold", e.target.value)}
          placeholder="1"
          tooltip="Number of units sold"
        />
      </div>

      {calculationMode === 'reverse' && formData.sellingPrice && (
        <div className="bg-accent-500/10 border border-accent-500/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <ApperIcon name="Lightbulb" size={16} className="text-accent-400" />
            <span className="text-sm font-medium text-white">Calculated Selling Price</span>
          </div>
          <p className="text-sm text-gray-300">
            To achieve your target profit of ₹{formData.targetProfit}, 
            set your selling price to <strong className="text-accent-400">₹{parseFloat(formData.sellingPrice).toFixed(2)}</strong>
          </p>
</div>
      )}
    </Card>
  );
};

export default CalculatorForm;