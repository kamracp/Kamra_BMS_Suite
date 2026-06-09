import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white">
      <div className="p-4 border-b border-slate-700">
        <h1 className="text-2xl font-bold text-cyan-400">
          Kamra BMS
        </h1>

        <p className="text-xs text-slate-400 mt-1">
          Engineering & Automation Suite
        </p>
      </div>

      <div className="p-4 space-y-2">
        <Link to="/" className="block p-3 rounded hover:bg-slate-800">
          Dashboard
        </Link>

        <Link to="/hvac" className="block p-3 rounded hover:bg-slate-800">
          HVAC
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;