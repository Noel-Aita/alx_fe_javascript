// Initial list of quotes
const quotes = [
  { text: "Believe in yourself.", category: "Motivational" },
  { text: "Why don’t scientists trust atoms? Because they make up everything!", category: "Funny" },
  { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Programming" }
];

// Save quotes to localStorage
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

// === Populate unique categories in dropdown ===
function populateCategories() {
  const dropdown = document.getElementById("categoryFilter");
  dropdown.innerHTML = '<option value="all">All Categories</option>'; // Reset

  const categories = [...new Set(quotes.map(q => q.category))]; // Unique categories
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    dropdown.appendChild(option);
  });

  // Restore last selected filter
  const savedCategory = localStorage.getItem("selectedCategory");
  if (savedCategory) {
    dropdown.value = savedCategory;
    filterQuotes(); // show filtered quotes on load
  }
}

// === Filter quotes by category ===
function filterQuotes() {
  const selected = document.getElementById("categoryFilter").value;
  localStorage.setItem("selectedCategory", selected); // Persist filter

  const display = document.getElementById("quoteDisplay");
  const filtered = selected === "all"
    ? quotes
    : quotes.filter(q => q.category === selected);

  if (filtered.length === 0) {
    display.innerHTML = "<p>No quotes in this category.</p>";
    return;
  }

  const randomIndex = Math.floor(Math.random() * filtered.length);
  const quote = filtered[randomIndex];
  display.innerHTML = `
    <p><strong>"${quote.text}"</strong></p>
    <p><em>Category: ${quote.category}</em></p>
  `;
}

// Function: Show a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  const display = document.getElementById("quoteDisplay");
  display.innerHTML = `
    <p><strong>"${quote.text}"</strong></p>
    <p><em>Category: ${quote.category}</em></p>
  `;

 // Save last viewed quote to sessionStorage
  localStorage.getItem("lastQuote", JSON.stringify(quote))

}

// Function: Add a new quote
function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (!text || !category) {
    alert("Please fill in both fields.");
    return;
  }

  quotes.push({ text, category });
  saveQuotes();

  document.getElementById("newQuoteText").value = "";
  document.getElementById("newQuoteCategory").value = "";

  alert("New quote added!");
}

// ✅ Function: Create the quote input form dynamically
function createAddQuoteForm() {
  const formContainer = document.createElement("div");

  // Input: Quote text
  const quoteInput = document.createElement("input");
  quoteInput.id = "newQuoteText";
  quoteInput.type = "text";
  quoteInput.placeholder = "Enter a new quote";

  // Input: Quote category
  const categoryInput = document.createElement("input");
  categoryInput.id = "newQuoteCategory";
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter quote category";

  // Button: Add Quote    //  
  const addButton = document.createElement("button");
  addButton.textContent = "Add Quote";
  addButton.addEventListener("click", addQuote);

  // Append all elements to the form container
  formContainer.appendChild(quoteInput);
  formContainer.appendChild(categoryInput);
  formContainer.appendChild(addButton);

  // Add form container to body
  document.body.appendChild(formContainer);
}
// Export quotes to JSON file
function exportQuotesToJson() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();

  URL.revokeObjectURL(url);
}

// Import quotes from JSON file
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      if (!Array.isArray(importedQuotes)) throw new Error("Invalid format");

      quotes.push(...importedQuotes);
      saveQuotes();
      alert("Quotes imported successfully!");
    } catch (e) {
      alert("Error importing quotes: " + e.message);
    }
  };

  fileReader.readAsText(event.target.files[0]);
}

function fetchQuotesFromServer() {
  return serverQuotes;
}

// Simulated server quote data (pretend this is fetched from a server)
const serverQuotes = [
  { text: "Server quote 1", category: "Server" },
  { text: "Server quote 2", category: "Server" }
];

function syncWithServer() {
  console.log("🔄 Syncing with server...");

  // Simulated fetch from server
  const serverData = fetchQuotesFromServer(); // simulate fetch()

  // Compare and merge
  const localTexts = quotes.map(q => q.text);
  let newQuotes = [];

  serverData.forEach(q => {
    if (!localTexts.includes(q.text)) {
      newQuotes.push(q);
    }
  });

  if (newQuotes.length > 0) {
    quotes.push(...newQuotes);             // Server wins — add new quotes
    saveQuotes();                          // Save to localStorage
    populateCategories();                  // Update categories
    filterQuotes();                        // Refresh view
    alert("✅ Synced with server. New quotes added!");
  } else {
    console.log("✅ No new server updates.");
  }
}

// Call sync every 30 seconds
setInterval(syncWithServer, 30000);



// Event listeners on page load
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  document.getElementById("exportBtn").addEventListener("click", exportQuotesToJson);


  populateCategories(); // load categories
  filterQuotes(); // filter on page load if previously selected
  syncWithServer(); // Run on load


  showRandomQuote(); // Optional: show a quote at start
  createAddQuoteForm(); // ✅ Call the dynamic form creation
});
