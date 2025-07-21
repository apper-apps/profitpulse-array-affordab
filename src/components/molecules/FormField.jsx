import { cn } from "@/utils/cn";
import Label from "@/components/atoms/Label";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";

const FormField = ({ 
  label, 
  icon, 
  value, 
  onChange, 
  placeholder, 
  type = "number", 
  className,
  tooltip,
  prefix,
  suffix,
  ...props 
}) => {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-2">
        <Label className="flex items-center gap-2">
          {icon && <ApperIcon name={icon} size={16} className="text-gray-400" />}
          {label}
        </Label>
        {tooltip && (
          <div className="group relative">
            <ApperIcon name="Info" size={14} className="text-gray-400 cursor-help" />
            <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 px-3 py-2 bg-surface-800 text-white text-xs rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10 whitespace-nowrap border border-white/10">
              {tooltip}
            </div>
          </div>
        )}
      </div>
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
            {prefix}
          </span>
        )}
        <Input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={cn(
            prefix && "pl-8",
            suffix && "pr-12"
          )}
          {...props}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
};

export default FormField;