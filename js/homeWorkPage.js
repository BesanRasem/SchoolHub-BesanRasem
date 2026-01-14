const loadBtn = document.getElementById("loadHomeworkBtn");
const feedback = document.getElementById("feedback");
const homeworkList = document.getElementById("homeworkList");

loadBtn.addEventListener("click", loadHomework);

async function loadHomework() {
  feedback.textContent = "Loading homework...";
  homeworkList.innerHTML = "";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");

    if (!response.ok) {
      throw new Error("Fetch failed");
    }

    const data = await response.json();
    setTimeout(()=>{

    feedback.textContent = "Homework loaded successfully";

    data.slice(0, 10).forEach(todo => {
      renderHomework(todo);
    });}, 1000)

  } catch (error) {
    feedback.className = "alert alert-danger";
    feedback.textContent = "Error loading homework";
  }
}

function renderHomework(todo) {
  const col = document.createElement("div");
  col.className = "col-md-6";

  const card = document.createElement("div");
  card.className = "card p-3";

  const statusBadge = todo.completed
    ? '<span class="badge bg-success">Completed</span>'
    : '<span class="badge bg-danger ">Not Completed</span>';

  card.innerHTML = `
    <div class="d-flex justify-content-between mb-2">
      <h5 >Homework</h5>
      ${statusBadge}
    </div>

    <p>${todo.title}</p>
    <button class="btn btn-outline-primary" > Upload Your Homework</button>
  `;

  col.appendChild(card);
  homeworkList.appendChild(col);
}
