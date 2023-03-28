import { Route, Routes } from "react-router-dom";
import Cancel from "./pages/Cancel";
import Payment from "./pages/Payment";
import Success from "./pages/Success";

const App = () => {
    return (
        <Routes>
            <Route index element={<Payment />} />
            <Route path="success" element={<Success />} />
            <Route path="cancel" element={<Cancel />} />
        </Routes>
    );
};

export default App;
