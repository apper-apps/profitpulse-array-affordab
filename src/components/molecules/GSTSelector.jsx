import { useState } from "react";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import Label from "@/components/atoms/Label";

const GSTSelector = ({ value, onChange }) => {
  const [customMode, setCustomMode] = useState(false);
  const presetRates = [5, 12, 18, 28];

  const handlePresetClick = (rate) => {
    setCustomMode(false);
    onChange(rate);
  };

  const handleCustomClick = () => {
    setCustomMode(true);
    onChange(0);
  };

  const handleCustomChange = (e) => {
    const newValue = parseFloat(e.target.value) || 0;
    onChange(newValue);
  };

  return (
    <div className="space-y-3">
      <Label>GST Rate (%)</Label>
      <div className="flex flex-wrap gap-2">
        {presetRates.map((rate) => (
          <Button
            key={rate}
            variant={value === rate && !customMode ? "gst-active" : "gst"}
            size="sm"
            onClick={() => handlePresetClick(rate)}
            className="min-w-[60px]"
          >
            {rate}%
          </Button>
        ))}
        <Button
          variant={customMode ? "gst-active" : "gst"}
          size="sm"
          onClick={handleCustomClick}
        >
          Custom
        </Button>
      </div>
      {customMode && (
        <div className="mt-3">
          <Input
            type="number"
            placeholder="Enter custom GST rate"
            value={value || ""}
            onChange={handleCustomChange}
            min="0"
            max="100"
            step="0.1"
          />
        </div>
      )}
    </div>
  );
};

export default GSTSelector;