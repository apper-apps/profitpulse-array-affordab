import { useState } from "react";
import Card from "@/components/atoms/Card";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import { toast } from "react-toastify";

const Contact = () => {
  const [chatOpen, setChatOpen] = useState(false);

  const handleChatClick = () => {
    setChatOpen(!chatOpen);
    toast.info("Chat Support - Developer se implement karwayein!", {
      position: "top-center"
    });
  };

  const contactMethods = [
    {
      title: "Helpline Number",
      subtitle: "Turant sampark karen",
      value: "9876543210",
      icon: "Phone",
      action: "tel:9876543210",
      color: "from-green-600 to-green-700",
      description: "Direct call kar sakte hain"
    },
    {
      title: "Email Support", 
      subtitle: "Detailed queries ke liye",
      value: "support@rlapnastore.com",
      icon: "Mail",
      action: "mailto:support@rlapnastore.com",
      color: "from-blue-600 to-blue-700",
      description: "Email bhej kar sawal puchhen"
    },
    {
      title: "Chat Support",
      subtitle: "Real-time assistance",
      value: "Chat Now",
      icon: "MessageCircle",
      action: "javascript:void(0)",
      color: "from-purple-600 to-purple-700",
      description: "Live chat option (Developer se set karwayein)",
      onClick: handleChatClick
    },
    {
      title: "Business Hours",
      subtitle: "Kab available hain",
      value: "9:00 AM - 9:00 PM",
      icon: "Clock",
      action: null,
      color: "from-orange-600 to-orange-700",
      description: "Daily service time"
    }
  ];

  return (
    <div className="bg-surface-900 min-h-screen p-4 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-r from-primary-600 to-primary-700 rounded-2xl">
              <ApperIcon name="Headphones" size={32} className="text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              सहायता और संपर्क
            </h1>
          </div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Agar aapko kisi bhi prakar ki sahayata chahiye, to humse turant sampark karen
          </p>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {contactMethods.map((method, index) => (
            <Card key={index} className="p-6 space-y-4 hover:scale-[1.02] transition-transform duration-200">
              <div className="flex items-start gap-4">
                <div className={`p-3 bg-gradient-to-r ${method.color} rounded-xl flex-shrink-0`}>
                  <ApperIcon name={method.icon} size={24} className="text-white" />
                </div>
                <div className="flex-1 space-y-2">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{method.title}</h3>
                    <p className="text-sm text-gray-400">{method.subtitle}</p>
                  </div>
                  <div className="text-xl font-bold text-accent-400">
                    {method.value}
                  </div>
                  <p className="text-sm text-gray-500">{method.description}</p>
                </div>
              </div>
              
              {method.action && method.action !== "javascript:void(0)" && (
                <a
                  href={method.action}
                  className="block w-full"
                >
                  <Button className="w-full" variant="secondary">
                    <ApperIcon name={method.icon} size={16} className="mr-2" />
                    Connect Now
                  </Button>
                </a>
              )}
              
              {method.onClick && (
                <Button 
                  className="w-full" 
                  variant="secondary"
                  onClick={method.onClick}
                >
                  <ApperIcon name={method.icon} size={16} className="mr-2" />
                  Chat Now
                </Button>
              )}
            </Card>
          ))}
        </div>

        {/* Detailed Contact Information */}
        <Card className="p-8 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-white">Sampark karen</h2>
            <p className="text-gray-400">
              Koi samasya ho, order ki jaankari chahiye, ya sujhav dena ho – Humse in tareekon se jud sakte hain
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="space-y-3">
              <div className="p-4 bg-gradient-to-r from-green-600 to-green-700 rounded-xl inline-block">
                <ApperIcon name="Phone" size={24} className="text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Helpline Number</h4>
                <a 
                  href="tel:9876543210"
                  className="text-accent-400 hover:text-accent-300 transition-colors text-lg font-bold"
                >
                  9876543210
                </a>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="p-4 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl inline-block">
                <ApperIcon name="MessageCircle" size={24} className="text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Chat Support</h4>
                <p className="text-gray-400 text-sm">App mein Chat Option se kabhi bhi sawal puch sakte hain</p>
                <Button 
                  className="mt-2" 
                  size="sm" 
                  variant="secondary"
                  onClick={handleChatClick}
                >
                  Chat Now
                </Button>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl inline-block">
                <ApperIcon name="Mail" size={24} className="text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-white mb-1">Email Support</h4>
                <a 
                  href="mailto:support@rlapnastore.com"
                  className="text-accent-400 hover:text-accent-300 transition-colors break-all"
                >
                  support@rlapnastore.com
                </a>
              </div>
            </div>
          </div>
          
          <div className="text-center py-4 border-t border-white/10">
            <div className="flex items-center justify-center gap-2 text-orange-400 mb-2">
              <ApperIcon name="Clock" size={20} />
              <span className="font-semibold">Samay: Subah 9:00 baje se raat 9:00 baje tak</span>
            </div>
            <p className="text-sm text-gray-500">Daily service available</p>
          </div>
        </Card>

        {/* Special Notice */}
        <Card className="p-6 bg-gradient-to-r from-accent-800/20 to-accent-700/20 border-accent-500/30">
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-2">
              <ApperIcon name="Info" size={20} className="text-accent-400" />
              <h3 className="text-lg font-semibold text-white">Dhyan den</h3>
            </div>
            <p className="text-accent-100">
              Aapki suvidha ke liye Chat Option har samay uplabdh hai. Ab sawal ka jawab turant!
            </p>
            <div className="mt-4 p-4 bg-white/5 rounded-lg">
              <p className="text-accent-200 text-sm">
                <strong>Developer Note:</strong> Chat functionality placeholder ready - 
                "Chat Now" button jod den jisse user direct support par pahunch sake
              </p>
            </div>
          </div>
        </Card>

        {/* Store Information */}
        <Card className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-white">Aapka apna</h3>
            <div className="space-y-2">
              <div className="text-2xl font-bold bg-gradient-to-r from-accent-400 to-accent-300 bg-clip-text text-transparent">
                RL Apna Store
              </div>
              <p className="text-gray-400">(Owner: [Yahan Aapka Naam Daalen])</p>
            </div>
            <p className="text-sm text-gray-500 max-w-md mx-auto">
              Aap apne mobile number, email ya naam change kar sakte hain—jo detail aap chahte hain, vahaan mention kar dijiyega.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Contact;