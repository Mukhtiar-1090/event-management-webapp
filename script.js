const events = [
  { name: "FIFA World Cup", date: "2026-06-11", desc: "The most-watched football tournament showcasing the best national teams on the planet." },
  { name: "TED Conference", date: "2026-04-13", desc: "The flagship TED global conference featuring thought leaders, innovators, and inspiring talks from around the world." }
];

const list = document.getElementById("event-list");
const form = document.getElementById("eventForm");
const warning = document.getElementById("warning");
const search = document.getElementById("search");
const scrollBtn = document.getElementById("scrollTop");

document.getElementById("year").innerText = new Date().getFullYear();

// DISPLAY EVENTS WITH ANIMATION
function displayEvents(data) {
  list.innerHTML = "";
  const today = new Date().toISOString().split("T")[0];

  data.sort((a, b) => new Date(a.date) - new Date(b.date));

  data.forEach((event, index) => {
    const card = document.createElement("div");
    card.className = "event-card fade-in";
    if (event.date < today) card.classList.add("past");

    card.innerHTML = `
      <h3>${event.name}</h3>
      <p><strong>Date:</strong> ${event.date}</p>
      <p>${event.desc}</p>
      <button onclick="deleteEvent(${index})">Delete</button>
    `;
    list.appendChild(card);
  });
}

// DELETE EVENT
function deleteEvent(index) {
  events.splice(index, 1);
  displayEvents(events);
}

// ADD EVENT
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = eventName.value.trim();
  const date = eventDate.value;
  const desc = eventDesc.value.trim();

  if (!name || !date || !desc) {
    warning.innerText = "All fields are required!";
    return;
  }

  warning.innerText = "";
  events.push({ name, date, desc });
  form.reset();
  displayEvents(events);
});

// SEARCH
search.addEventListener("input", () => {
  const value = search.value.toLowerCase();
  const filtered = events.filter(e =>
    e.name.toLowerCase().includes(value) || e.date.includes(value)
  );
  displayEvents(filtered);
});

// SCROLL TO TOP BUTTON
window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 200 ? "block" : "none";
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

displayEvents(events);
