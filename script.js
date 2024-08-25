document.getElementById("submit-btn").addEventListener("click", () => {
  const jsonInput = document.getElementById("json-input").value;
  let jsonData;

  // Validate JSON
  try {
    jsonData = JSON.parse(jsonInput);
  } catch (e) {
    alert("Invalid JSON format!");
    return;
  }

  // Get selected options from the multi-select dropdown
  const selectedOptions = Array.from(
    document.getElementById("multi-filter").selectedOptions
  ).map((option) => option.value);

  // Call the API with the JSON data
  fetch("https://your-netlify-api-url.com/your-endpoint", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(jsonData),
  })
    .then((response) => response.json())
    .then((data) => {
      // Filter response based on selected options
      let result = "";

      if (selectedOptions.includes("alphabets")) {
        result += `Alphabets: ${data.alphabets}\n`;
      }
      if (selectedOptions.includes("numbers")) {
        result += `Numbers: ${data.numbers}\n`;
      }
      if (selectedOptions.includes("highest-lowercase")) {
        result += `Highest Lowercase Alphabet: ${data.highestLowercase}\n`;
      }

      // Display the filtered response
      document.getElementById("filtered-response").innerText = result;
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("filtered-response").innerText =
        "Failed to fetch data";
    });
});
