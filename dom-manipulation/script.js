// Initial list of quotes
const quotes = [
  { text: "Believe in yourself.", category: "Motivational" },
  { text: "Why don’t scientists trust atoms? Because they make up everything!", category: "Funny" },
  { text: "Code is like humor. When you have to explain it, it’s bad.", category: "Programming" }
];

// Function: Show a random quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  const display = document.getElementById("quoteDisplay");
  display.innerHTML = `
    <p><strong>"${quote.text}"</strong></p>
    <p><em>Category: ${quote.category}</em></p>
  `;
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

  // Button: Add Quote
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

// Event listeners on page load
window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  showRandomQuote(); // Optional: show a quote at start
  createAddQuoteForm(); // ✅ Call the dynamic form creation
});
