// ===============================
// Initial List of Quotes
// Each quote has a `text` and `category`
// ===============================
let quotes = [
  {
    text: "The best way to predict the future is to invent it.",
    category: "Motivational"
  },
  {
    text: "Life is short. Smile while you still have teeth.",
    category: "Funny"
  },
  {
    text: "Knowledge is power.",
    category: "Educational"
  }
];

// ===============================
// Function: Show a Random Quote
// ===============================
function showRandomQuote() {
  // Pick a random index from the quotes array
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  // Find the quote display area in HTML
  const display = document.getElementById("quoteDisplay");

  // Inject the quote into the HTML using innerHTML
  display.innerHTML = `
    <p style="font-size: 20px;"><strong>"${quote.text}"</strong></p>
    <p style="color: gray;">Category: ${quote.category}</p>
  `;
}

// ===============================
// Function: Add a New Quote
// ===============================
function addQuote() {
  // Get input values from the form
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  // Check if both fields are filled
  if (text && category) {
    // Add the new quote to the array
    quotes.push({ text, category });

    // Clear the input fields
    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";

    // Notify the user
    alert("✅ New quote added!");
  } else {
    alert("⚠️ Please enter both quote and category.");
  }
}

// ===============================
// Event Listener: Button to Show Quote
// ===============================
document.getElementById("newQuote").addEventListener("click", showRandomQuote);

// ===============================
// Optional: Show one quote by default when the page loads
// ===============================
window.addEventListener("DOMContentLoaded", showRandomQuote);
