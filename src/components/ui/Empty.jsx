import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ 
  title = "No Data Found", 
  description = "There's nothing to display here yet.", 
  actionText = "Get Started",
  onAction,
  icon = "FileX"
}) => {
  return (
    <Card className="text-center py-12 space-y-6">
      <div className="p-6 bg-gradient-to-r from-gray-600/10 to-gray-700/10 rounded-full w-fit mx-auto">
        <ApperIcon name={icon} size={48} className="text-gray-400" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-gray-400 max-w-sm mx-auto">{description}</p>
      </div>
      
      {onAction && (
        <Button onClick={onAction} className="mt-6">
          <ApperIcon name="Plus" size={16} className="mr-2" />
          {actionText}
        </Button>
      )}
      
      <div className="text-sm text-gray-500">
        Start by entering your product details to see profit calculations.
      </div>
    </Card>
  );
};

export default Empty;