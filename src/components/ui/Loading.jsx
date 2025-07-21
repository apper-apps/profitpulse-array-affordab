import ApperIcon from "@/components/ApperIcon";

const Loading = () => {
  return (
    <div className="min-h-screen bg-surface-900 flex items-center justify-center">
      <div className="text-center space-y-6">
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl flex items-center justify-center mx-auto animate-pulse">
            <ApperIcon name="Calculator" size={32} className="text-white" />
          </div>
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent-500 rounded-full animate-bounce"></div>
        </div>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">ProfitPulse</h2>
          <p className="text-gray-400">Loading your calculator...</p>
        </div>
        
        <div className="flex space-x-2 justify-center">
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;