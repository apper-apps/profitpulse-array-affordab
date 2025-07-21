import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Calculator from "@/components/pages/Calculator";
import Contact from "@/components/pages/Contact";
import ApperIcon from "@/components/ApperIcon";

const Navigation = () => {
  const location = useLocation();
  
  return (
    <nav className="bg-surface-800/50 backdrop-blur-sm border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl">
              <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
                <path d="M9 11H15M9 15H15M17 21H7C5.89543 21 5 20.1046 5 19V5C5 3.89543 5.89543 3 7 3H12.5858C12.851 3 13.1054 3.10536 13.2929 3.29289L19.7071 9.70711C19.8946 9.89464 20 10.149 20 10.4142V19C20 20.1046 19.1046 21 18 21H17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13 3V9H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="text-xl font-bold text-white">RL Apna Store</span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                location.pathname === '/' 
                  ? 'bg-primary-600 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <ApperIcon name="Calculator" size={16} />
              <span className="hidden sm:inline">Calculator</span>
            </Link>
            <Link
              to="/contact"
              className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                location.pathname === '/contact' 
                  ? 'bg-primary-600 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <ApperIcon name="Phone" size={16} />
              <span className="hidden sm:inline">Contact Us</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-surface-900">
        <Navigation />
        <Routes>
          <Route path="/" element={<Calculator />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          style={{ zIndex: 9999 }}
        />
      </div>
    </Router>
  );
}

export default App;