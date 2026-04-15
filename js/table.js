// ===== LOAD DATA SOURCE =====
let isFiltered = false;

let tableData = [];
if (localStorage.getItem("filteredData")) {
  tableData = JSON.parse(localStorage.getItem("filteredData"));
  isFiltered = true;
} else {
  tableData = JSON.parse(localStorage.getItem("tableData")) || [];
}

// ===== SAVE DATA =====
function saveData() {
  if (isFiltered) {
    // update main tableData also
    let mainData = JSON.parse(localStorage.getItem("tableData")) || [];

    // Replace matching records by date+tag (simple logic)
    tableData.forEach(updatedRow => {
      let index = mainData.findIndex(r =>
        r.date === updatedRow.date && r.tag === updatedRow.tag
      );

      if (index !== -1) {
        mainData[index] = updatedRow;
      } else {
        mainData.push(updatedRow);
      }
    });

    localStorage.setItem("tableData", JSON.stringify(mainData));
  } else {
    localStorage.setItem("tableData", JSON.stringify(tableData));
  }
}

// ===== ADD ROW =====
function addRow() {
  let row = {
    date: getTodayDate(),
    tag: "",
    location: "",
    status: "",
    remarks: "",
    shift: ""
  };

  tableData.push(row);
  saveData();
  render();
}

// ===== DELETE ROW =====
function deleteRow(index) {
  tableData.splice(index, 1);
  saveData();
  render();
}

// ===== UPDATE CELL (FIXED ISSUE HERE 🔥) =====
function updateCell(index, field, element) {
  tableData[index][field] = element.innerText.trim();
  saveData();
}

// ===== RENDER TABLE =====
function render() {
  let tbody = document.querySelector("#dataTable tbody");
  tbody.innerHTML = "";

  tableData.forEach((r, i) => {
    let row = document.createElement("tr");

    row.innerHTML = `
      <td>${i+1}</td>
      <td contenteditable onblur="updateCell(${i}, 'date', this)">${r.date}</td>
      <td contenteditable onblur="updateCell(${i}, 'tag', this)">${r.tag}</td>
      <td contenteditable onblur="updateCell(${i}, 'location', this)">${r.location}</td>
      <td contenteditable onblur="updateCell(${i}, 'status', this)">${r.status}</td>
      <td contenteditable onblur="updateCell(${i}, 'remarks', this)">${r.remarks}</td>
      <td contenteditable onblur="updateCell(${i}, 'shift', this)">${r.shift}</td>
      <td><button onclick="deleteRow(${i})">❌</button></td>
    `;

    tbody.appendChild(row);
  });
}

// ===== FILTER =====
function filterTable() {
  let input = document.getElementById("filter").value.toLowerCase();
  let rows = document.querySelectorAll("#dataTable tbody tr");

  rows.forEach(row => {
    let text = row.innerText.toLowerCase();
    row.style.display = text.includes(input) ? "" : "none";
  });
}

// ===== INIT =====
render();
