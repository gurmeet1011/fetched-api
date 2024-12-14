const tableBody = document.getElementById("table-body");
const fetchDataBtn = document.getElementById("fetch-data-btn");

// Function to create a table row
function createRow(apiName, data) {
  const row = document.createElement("tr");
  const apiCell = document.createElement("td");
  const dataCell = document.createElement("td");

  apiCell.textContent = apiName;
  dataCell.textContent = Array.isArray(data)
    ? JSON.stringify(data.slice(0, 5), null, 2) // Display first 5 items if it's an array
    : "No data available"; // Fallback message for non-array data

  row.appendChild(apiCell);
  row.appendChild(dataCell);
  tableBody.appendChild(row);
}

// Simulate a delay and fetch API data
function promiseAPI1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("https://dummyjson.com/posts")
        .then((response) => response.json())
        .then((data) => {
          createRow("API 1 - Posts", data.posts); // Use the 'posts' key
          resolve();
        })
        .catch((error) => reject(error));
    }, 1000); // Simulated delay of 1000ms
  });
}

function promiseAPI2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("https://dummyjson.com/products")
        .then((response) => response.json())
        .then((data) => {
          createRow("API 2 - Products", data.products); // Use the 'products' key
          resolve();
        })
        .catch((error) => reject(error));
    }, 2000); // Simulated delay of 2000ms
  });
}

function promiseAPI3() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      fetch("https://dummyjson.com/todos")
        .then((response) => response.json())
        .then((data) => {
          createRow("API 3 - Todos", data.todos); // Use the 'todos' key
          resolve();
        })
        .catch((error) => reject(error));
    }, 3000); // Simulated delay of 3000ms
  });
}

// Fetch data sequentially using promise chaining
fetchDataBtn.addEventListener("click", () => {
  tableBody.innerHTML = "<tr><td colspan='2'>Loading...</td></tr>"; // Show loading message

  promiseAPI1()
    .then(() => promiseAPI2())
    .then(() => promiseAPI3())
    .then(() => {
      const loadingRow = document.querySelector("tr > td[colspan='2']");
      if (loadingRow) loadingRow.remove(); // Remove the loading message
    })
    .catch((error) => {
      tableBody.innerHTML = `<tr><td colspan='2' style='color: red;'>Error: ${error.message}</td></tr>`;
    });
});
