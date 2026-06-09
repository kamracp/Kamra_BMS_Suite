import { BrowserRouter } from "react-router-dom";
import MainLayout from "./app/layout/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <h1 className="text-3xl font-bold">
          Kamra BMS Dashboard
        </h1>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;