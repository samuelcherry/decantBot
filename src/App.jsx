import { useState, useEffect } from "react";
import "./App.css";
import { fetchItems } from "./API/fetchItems";

function App() {
  const [threeDose, setThreeDose] = useState("");
  const [fourDose, setFourDose] = useState("");
  const [items, setItems] = useState([]);

  const handleDecant = () => {
    const three = parseFloat(threeDose) || 0;
    const four = parseFloat(fourDose) || 0;
    const difference = four * 21 - four * 21 * 0.02 - three * 28;
    console.log("Difference:", difference);
  };

  useEffect(() => {
    async function loadItems() {
      try {
        const itemsData = await fetchItems();
        setItems(itemsData); // save to state
        console.log(itemsData);
      } catch (error) {
        console.error(error);
      }
    }

    loadItems();
  }, []);

  return (
    <div className="page">
      <div className="calc">
        <h1 className="calc-title">Dose Cost Calculator</h1>

        <label>
          Three dose cost
          <input
            type="number"
            value={threeDose}
            onChange={(e) => setThreeDose(e.target.value)}
            placeholder="Enter cost..."
          />
        </label>

        <label>
          Four dose cost
          <input
            type="number"
            value={fourDose}
            onChange={(e) => setFourDose(e.target.value)}
            placeholder="Enter cost..."
          />
        </label>

        <button className="calc-btn" onClick={handleDecant}>
          Calculate
        </button>
      </div>
    </div>
  );
}

export default App;
