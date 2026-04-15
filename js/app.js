// ================= GLOBAL DATA =================
function getAllData() {
  return JSON.parse(localStorage.getItem("tableData")) || [];
}

function saveAllData(data) {
  localStorage.setItem("tableData", JSON.stringify(data));
}

// ================= DATE FORMAT =================
function getTodayDate() {
  let today = new Date();
  return today.getFullYear() + "-" +
    String(today.getMonth()+1).padStart(2,'0') + "-" +
    String(today.getDate()).padStart(2,'0');
}

// ================= MONTHLY =================
function getMonthlyList() {
  let data = getAllData();
  let months = {};

  data.forEach(d => {
    if (!d.date) return;
    let parts = d.date.split("-");
    let key = parts[0] + "-" + parts[1];
    months[key] = true;
  });

  return Object.keys(months);
}

function getDataByMonth(month) {
  let data = getAllData();
  return data.filter(d => d.date.startsWith(month));
}

// ================= YEARLY =================
function getYearlyList() {
  let data = getAllData();
  let years = {};

  data.forEach(d => {
    if (!d.date) return;
    let year = d.date.split("-")[0];
    years[year] = true;
  });

  return Object.keys(years);
}

function getDataByYear(year) {
  let data = getAllData();
  return data.filter(d => d.date.startsWith(year));
}

// ================= LOAD MONTH PAGE =================
function loadMonthlyPage() {
  let container = document.getElementById("list");
  container.innerHTML = "<h2>📅 Monthly Data</h2>";

  let months = getMonthlyList();

  if (months.length === 0) {
    container.innerHTML += "<p>No data available</p>";
    return;
  }

  months.forEach(m => {
    let btn = document.createElement("button");
    btn.innerText = m;
    btn.onclick = () => {
      let data = getDataByMonth(m);
      localStorage.setItem("filteredData", JSON.stringify(data));
      window.location.href = "table.html";
    };
    container.appendChild(btn);
  });
}

// ================= LOAD YEAR PAGE =================
function loadYearlyPage() {
  let container = document.getElementById("list");
  container.innerHTML = "<h2>📆 Yearly Data</h2>";

  let years = getYearlyList();

  if (years.length === 0) {
    container.innerHTML += "<p>No data available</p>";
    return;
  }

  years.forEach(y => {
    let btn = document.createElement("button");
    btn.innerText = y;
    btn.onclick = () => {
      let data = getDataByYear(y);
      localStorage.setItem("filteredData", JSON.stringify(data));
      window.location.href = "table.html";
    };
    container.appendChild(btn);
  });
}

// ================= SHARE DATA =================
function shareData() {
  let data = localStorage.getItem("tableData");

  if (!data || data === "[]") {
    alert("No data available to share");
    return;
  }

  let parsed = JSON.parse(data);

  let text = "🔥 Tamdeen Fire & Safety Report\n\n";

  parsed.forEach((r, i) => {
    text += `${i+1}. ${r.date} | ${r.tag} | ${r.location} | ${r.status}\n`;
  });

  // WhatsApp open
  let url = "https://wa.me/?text=" + encodeURIComponent(text);
  window.open(url, "_blank");

  // Copy backup
  navigator.clipboard.writeText(text);

  alert("Data copied & WhatsApp opened");
}

// ================= BACK BUTTON =================
function goBack() {
  window.history.back();
}
