import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";
import ApperIcon from "@/components/ApperIcon";

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="min-h-screen bg-surface-900 flex items-center justify-center p-4">
      <Card className="max-w-md w-full text-center space-y-6">
        <div className="p-4 bg-red-500/10 rounded-full w-fit mx-auto">
          <ApperIcon name="AlertTriangle" size={32} className="text-red-400" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Oops! Something went wrong</h2>
          <p className="text-gray-400">{message}</p>
        </div>
        
        <div className="space-y-3">
          {onRetry && (
            <Button onClick={onRetry} className="w-full">
              <ApperIcon name="RefreshCw" size={16} className="mr-2" />
              Try Again
            </Button>
          )}
          
          <Button 
            variant="secondary" 
            onClick={() => window.location.reload()} 
            className="w-full"
          >
            <ApperIcon name="RotateCcw" size={16} className="mr-2" />
            Reload Page
          </Button>
        </div>
        
        <div className="text-sm text-gray-500">
          If the problem persists, please try refreshing the page or check your internet connection.
        </div>
      </Card>
    </div>
  );
};

export default Error;