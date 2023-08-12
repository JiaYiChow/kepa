import { Route, Routes } from 'react-router-dom';
import "./App.css";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import HomePage from "./pages/HomePage";
import NoMatch from "./pages/NoMatch";

import SavedRecordingsPage from "./recording/SavedRecordingsPage";
function App() {
  return (
    <>
      <Header />
        <Routes>
        <Route exact path="/kepa" element={<HomePage />} />
        <Route exact path="/kepa/my-recordings" element={<SavedRecordingsPage />} />
        <Route path="*" element={<NoMatch />} />
        </Routes>
      <Footer />
    </>
  );
}

export default App;
