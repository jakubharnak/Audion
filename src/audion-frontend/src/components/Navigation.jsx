import { Link, useLocation } from "react-router-dom";
import { Waves, Home, GitCompare, BarChart3 } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Waves className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">Audion</span>
          </Link>

          <div className="flex space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                isActive("/")
                  ? "text-primary-600 bg-primary-50"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>

            <Link
              to="/match"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                isActive("/match")
                  ? "text-primary-600 bg-primary-50"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <GitCompare className="h-4 w-4" />
              <span>Audio Match</span>
            </Link>

            <Link
              to="/analyze"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium ${
                isActive("/analyze")
                  ? "text-primary-600 bg-primary-50"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <BarChart3 className="h-4 w-4" />
              <span>Analyze</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
