const daily_button = document.querySelector(".daily");
const weekly_button = document.querySelector(".weekly");
const monthly_button = document.querySelector(".monthly");
const toggle_button = document.querySelector(".toggle");
const card_hours = document.querySelector(".card-hours");
const card_previous = document.querySelector(".card-previous");
let data;

fetch("./data.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((json) => {
    data = json;
  })
  .catch((error) => {
    console.error("Fetch error:", error);
  });

function updateUI(timeframe) {
  [daily_button, weekly_button, monthly_button].forEach((btn) =>
    btn.classList.remove("active")
  );

  let label_1;
  let label_2;

  if (timeframe === "daily") {
    label_1 = "daily";
    label_2 = "Day";
    daily_button.classList.add("active");
  } else if (timeframe === "weekly") {
    label_1 = "weekly";
    label_2 = "Week";
    weekly_button.classList.add("active");
  } else {
    label_1 = "monthly";
    label_2 = "Month";
    monthly_button.classList.add("active");
  }

  if (data) {
    data.forEach((item, index) => {
      document.querySelectorAll(".card-hours")[index].textContent = `${item.timeframes[label_1].current}hrs`;
      document.querySelectorAll(".card-previous")[index].textContent = `Last ${label_2} - ${item.timeframes[label_1].previous}hrs`;
    });
  }
}

daily_button.addEventListener("click", () => {
  updateUI("daily");
});

weekly_button.addEventListener("click", () => {
  updateUI("weekly");
});

monthly_button.addEventListener("click", () => {
  updateUI("monthly");
});
