// ============================
// AL FAKHAMA BOOKING SYSTEM
// ============================

// Demo hotel prices
const hotelPrices = {
  "Select Hotel": 0,
  "Anjum Hotel": 480,
  "Swissotel Al Maqam": 550,
  "Rotana Al Manakha": 420,
  "Valy Hotel": 300,
  "Maien Taiba": 250
};

const hotel = document.getElementById("hotel");
const checkIn = document.getElementById("checkIn");
const checkOut = document.getElementById("checkOut");
const nights = document.getElementById("nights");
const rooms = document.getElementById("rooms");
const adults = document.getElementById("adults");
const children = document.getElementById("children");
const mealPlan = document.getElementById("mealPlan");
const needTransfer = document.getElementById("needTransfer");

const summaryHotel = document.getElementById("summaryHotel");
const summaryRoom = document.getElementById("summaryRoom");
const summaryGuests = document.getElementById("summaryGuests");
const summaryNights = document.getElementById("summaryNights");
const summaryMeal = document.getElementById("summaryMeal");
const summaryTransfer = document.getElementById("summaryTransfer");
const grandTotal = document.getElementById("grandTotal");

// Hotel list
[
  "Anjum Hotel",
  "Swissotel Al Maqam",
  "Rotana Al Manakha",
  "Valy Hotel",
  "Maien Taiba"
].forEach(name => {
  const option = document.createElement("option");
  option.textContent = name;
  hotel.appendChild(option);
});

// Calculate nights
function calculateNights() {

  if (!checkIn.value || !checkOut.value) return;

  const start = new Date(checkIn.value);
  const end = new Date(checkOut.value);

  const totalDays =
    Math.ceil((end - start) / (1000 * 60 * 60 * 24));

  nights.value = totalDays > 0 ? totalDays : 0;

  updateSummary();

}

// Update Summary
function updateSummary() {

  summaryHotel.textContent = hotel.value;

  summaryRoom.textContent =
    document.getElementById("roomType").value;

  summaryGuests.textContent =
    adults.value +
    " Adults / " +
    children.value +
    " Children";

  summaryNights.textContent =
    nights.value;

  summaryMeal.textContent =
    mealPlan.value;

  summaryTransfer.textContent =
    needTransfer.value === "yes"
      ? "Included"
      : "No";

  calculateTotal();

}

// Calculate Total
function calculateTotal() {

  const price =
    hotelPrices[hotel.value] || 0;

  const total =
    price *
    Number(nights.value || 0) *
    Number(rooms.value || 1);

  grandTotal.textContent =
    total.toLocaleString() +
    " SAR";

}

// Events
checkIn.addEventListener("change", calculateNights);
checkOut.addEventListener("change", calculateNights);

hotel.addEventListener("change", updateSummary);
rooms.addEventListener("input", updateSummary);
adults.addEventListener("input", updateSummary);
children.addEventListener("input", updateSummary);
mealPlan.addEventListener("change", updateSummary);
needTransfer.addEventListener("change", updateSummary);

updateSummary();
