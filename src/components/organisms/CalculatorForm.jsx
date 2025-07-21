import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import FormField from "@/components/molecules/FormField";
import GSTSelector from "@/components/molecules/GSTSelector";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const CalculatorForm = ({ onCalculate }) => {
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
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
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
    const sellingPrice = parseFloat(formData.sellingPrice) || 0;
    const quantitySold = parseFloat(formData.quantitySold) || 1;
    const otherFees = parseFloat(formData.otherFees) || 0;

    if (productCost > 0 && sellingPrice > 0) {
      const totalCostPerUnit = productCost + deliveryCharges + paymentGatewayFees + advertisingCost + otherFees;
      const gstAmount = (sellingPrice * gstRate) / 100;
      const netSellingPrice = sellingPrice - gstAmount;
      const profitPerUnit = netSellingPrice - totalCostPerUnit;
      const totalProfit = profitPerUnit * quantitySold;
      const totalRevenue = netSellingPrice * quantitySold;
      const totalCost = totalCostPerUnit * quantitySold;
      const profitMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

      const results = {
        totalCost,
        gstAmount: gstAmount * quantitySold,
        totalRevenue,
        totalProfit,
        profitMargin,
        perUnitProfit: profitPerUnit,
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
        }
      };

      onCalculate(results);
    }
  }, [formData, onCalculate]);

  return (
    <Card className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg">
            <ApperIcon name="Calculator" size={20} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Dropshipping Calculator</h2>
            <p className="text-sm text-gray-400">Enter your product details below</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={handleClear}>
          <ApperIcon name="RotateCcw" size={16} className="mr-2" />
          Clear
        </Button>
      </div>

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
          label="Product Cost"
          icon="IndianRupee"
          value={formData.productCost}
          onChange={(e) => handleInputChange("productCost", e.target.value)}
          placeholder="0.00"
          prefix="₹"
          tooltip="The actual cost to purchase one item"
        />

        <FormField
          label="Delivery Charges"
          icon="Truck"
          value={formData.deliveryCharges}
          onChange={(e) => handleInputChange("deliveryCharges", e.target.value)}
          placeholder="0.00"
          prefix="₹"
          tooltip="Shipping cost per order"
        />

        <FormField
          label="Payment Gateway Fees"
          icon="CreditCard"
          value={formData.paymentGatewayFees}
          onChange={(e) => handleInputChange("paymentGatewayFees", e.target.value)}
          placeholder="0.00"
          prefix="₹"
          tooltip="Transaction fees charged by payment processor"
        />

        <FormField
          label="Advertising Cost"
          icon="Megaphone"
          value={formData.advertisingCost}
          onChange={(e) => handleInputChange("advertisingCost", e.target.value)}
          placeholder="0.00"
          prefix="₹"
          tooltip="Marketing cost per product or order"
        />

        <FormField
          label="Other Fees"
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
        <FormField
          label="Selling Price"
          icon="Tag"
          value={formData.sellingPrice}
          onChange={(e) => handleInputChange("sellingPrice", e.target.value)}
          placeholder="0.00"
          prefix="₹"
          tooltip="Price you charge to customers (including GST)"
        />

        <FormField
          label="Quantity Sold"
          icon="Hash"
          value={formData.quantitySold}
          onChange={(e) => handleInputChange("quantitySold", e.target.value)}
          placeholder="1"
          tooltip="Number of units sold"
        />
      </div>
    </Card>
  );
};

export default CalculatorForm;