import "./App.css";
import Footer from "./components/Footer";
import Pipa from "./components/Pipa";

function App() {
  return (
    <>
      <Pipa />
      <div className="content">
        <h2>Playing instructions</h2>
        <p>
          You can play either using the keyboard, or by clicking the strings. In
          keyboard mode, you can play the notes marked by the active region (the
          region inside the rectangle).
        </p>
        <p>To toggle the active region, use the left and right keys.</p>
        <p>
          The keyboard Pipa is designed to mimic the actual Pipa. The four rows
          on the keyboard represent the four strings in the pipa, the first
          string being the number row, the second string is the row that starts
          with 'Q', the third string is the row that starts with 'A', and the
          fourth string is the row that starts with 'Z'.
        </p>
      </div>
      <Footer />
    </>
  );
}

export default App;
