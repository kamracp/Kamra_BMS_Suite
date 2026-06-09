import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "./app/layout/MainLayout";
import Dashboard from "./modules/dashboard/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>

        <Routes>

          <Route
            path="/"
            element={<Dashboard />}
          />

        </Routes>

      </MainLayout>
    </BrowserRouter>
  );
}

export default App;