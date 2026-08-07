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

const API =
"https://alfakhama-travel-booking.alfakhama-travel-uzb.workers.dev";

async function loadHotels() {

  hotel.innerHTML =
    '<option value="">Select Hotel</option>';

  const res =
    await fetch(API + "/api/hotels");

  const hotels =
    await res.json();

  hotels.forEach(item => {

    const option =
      document.createElement("option");

    option.value = item.id;
    option.textContent = item.name;
    option.dataset.image = item.image_url;

    hotel.appendChild(option);

  });

}

loadHotels();

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
// ============================
// HOTEL IMAGES
// ============================

hotel.addEventListener("change", () => {

  const selected =
    hotel.options[hotel.selectedIndex];

  if (selected.dataset.image) {
    hotelImage.src = selected.dataset.image;
  }

  updateSummary();

});

const hotelImage = document.getElementById("hotelImage");

hotel.addEventListener("change", () => {

  if (hotelImages[hotel.value]) {

    hotelImage.src = hotelImages[hotel.value];

  }

});

// ============================
// EXTRA PRICES
// ============================

const transferPrice = 250;

const extraBedPrice = 100;

const hbPrice = 50;

// ============================
// NEW TOTAL
// ============================

function calculateTotal(){

let hotelCost =
(hotelPrices[hotel.value] || 0) *
Number(nights.value || 0) *
Number(rooms.value || 1);

let extra =

Number(document.getElementById("extraBed").value) *
extraBedPrice *
Number(nights.value || 0);

let meal = 0;

if(mealPlan.value==="HB"){

meal =
hbPrice *
Number(adults.value) *
Number(nights.value || 0);

}

let transfer =

needTransfer.value==="yes"
? transferPrice
:0;

let total =
hotelCost +
extra +
meal +
transfer;

grandTotal.textContent =
total.toLocaleString() + " SAR";

}

// ============================
// UPDATE SUMMARY
// ============================

document
.getElementById("extraBed")
.addEventListener(
"change",
updateSummary
);

updateSummary();
