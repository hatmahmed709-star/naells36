const defaultRows = [
  ["عمر أحمد عبد الله البغدادي", "IQ-36-101", "المادة 4 إرهاب", "سارية المفعول", "2026-01-02"],
  ["نائل علي الغزالي", "IQ-36-102", "المادة 406 عقوبات", "قيد التعديل", "2026-01-04"],
  ["علي حسين محمود الفتلاوي", "IQ-36-103", "المادة 413 عقوبات", "معلقة", "2026-01-06"],
  ["محمد جاسم محمد الزبيدي", "IQ-36-104", "المادة 289 عقوبات", "سارية المفعول", "2026-01-08"],
  ["حسان فاضل عباس الدليمي", "IQ-36-105", "المادة 4 إرهاب", "قيد التعديل", "2026-01-10"],
  ["خالد عبد الرحمن السامرائي", "IQ-36-106", "المادة 406 عقوبات", "سارية المفعول", "2026-01-12"],
  ["سليم رعد خضير", "IQ-36-107", "المادة 413 عقوبات", "معلقة", "2026-01-13"],
  ["حيدر مهدي كاظم", "IQ-36-108", "المادة 289 عقوبات", "سارية المفعول", "2026-01-15"]
];

let allRows = [...defaultRows];

const tableBody = document.getElementById("tableBody");
const totalRecords = document.getElementById("totalRecords");
const matchRecords = document.getElementById("matchRecords");
const searchInput = document.getElementById("searchInput");
const articleFilter = document.getElementById("articleFilter");
const emptyState = document.getElementById("emptyState");
const csvInput = document.getElementById("csvInput");
const demoBtn = document.getElementById("demoBtn");
const clearBtn = document.getElementById("clearBtn");

function renderArticlesFilter() {
  const options = [...new Set(allRows.map(row => row[2]))];
  articleFilter.innerHTML = '<option value="">كل المواد</option>';

  options.forEach(item => {
    const option = document.createElement("option");
    option.value = item;
    option.textContent = item;
    articleFilter.appendChild(option);
  });
}

function statusClass(value) {
  const text = String(value || "").trim();
  if (text.includes("سارية")) return "good";
  if (text.includes("تعديل")) return "warn";
  if (text.includes("معلقة")) return "alert";
  return "good";
}

function renderTable() {
  const query = searchInput.value.trim().toLowerCase();
  const selectedArticle = articleFilter.value;

  const filtered = allRows.filter(row => {
    const joined = row.join(" ").toLowerCase();
    const matchesQuery = !query || joined.includes(query);
    const matchesArticle = !selectedArticle || row[2] === selectedArticle;
    return matchesQuery && matchesArticle;
  });

  tableBody.innerHTML = "";

  if (filtered.length === 0) {
    emptyState.classList.remove("hidden");
  } else {
    emptyState.classList.add("hidden");
  }

  filtered.forEach((row, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${index + 1}</td>
      <td>${row[0]}</td>
      <td>${row[1]}</td>
      <td>${row[2]}</td>
      <td><span class="status ${statusClass(row[3])}">${row[3]}</span></td>
      <td>${row[4]}</td>
    `;
    tableBody.appendChild(tr);
  });

  totalRecords.textContent = String(allRows.length);
  matchRecords.textContent = String(filtered.length);
}

function parseCsvText(text) {
  const lines = text.split(/\r?\n/).filter(line => line.trim() !== "");
  if (lines.length === 0) return [];

  return lines.slice(1).map(line => {
    const cells = line.split(",").map(cell => cell.trim());
    if (cells.length < 5) {
      return [cells[0] || "", cells[1] || "", cells[2] || "", cells[3] || "", cells[4] || ""];
    }
    return cells.slice(0, 5);
  }).filter(row => row.some(Boolean));
}

searchInput.addEventListener("input", renderTable);
articleFilter.addEventListener("change", renderTable);
clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  articleFilter.value = "";
  renderTable();
});

demoBtn.addEventListener("click", () => {
  allRows = [...defaultRows];
  renderArticlesFilter();
  renderTable();
});

csvInput.addEventListener("change", (event) => {
  const file = event.target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    const text = String(reader.result || "");
    const parsedRows = parseCsvText(text);

    if (parsedRows.length > 0) {
      allRows = parsedRows;
      renderArticlesFilter();
      renderTable();
    }
  };
  reader.readAsText(file);
});

renderArticlesFilter();
renderTable();
