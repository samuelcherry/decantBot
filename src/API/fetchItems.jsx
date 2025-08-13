export async function fetchItems() {
  const response = await fetch("http://localhost:3000/osrs/items");

  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const items = await response.json();
  return items; // array of items with name, currentPrice, todayChange, trend
}
