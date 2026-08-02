<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Al Fakhama Travel</title>

<style>

*{
box-sizing:border-box;
}

body{
margin:0;
font-family:Arial,sans-serif;
background:#f6f2ea;
color:#29251f;
}

.header{
background:#29251f;
color:white;
padding:45px 20px;
text-align:center;
}

.header h1{
margin:0;
font-size:32px;
letter-spacing:2px;
}

.header p{
margin-top:10px;
font-size:16px;
}

.container{
max-width:700px;
margin:30px auto;
padding:20px;
}

.booking{
background:white;
padding:25px;
border-radius:18px;
box-shadow:0 5px 25px rgba(0,0,0,0.1);
}

h2{
text-align:center;
}

label{
display:block;
margin-top:18px;
font-weight:bold;
}

select,
input{
width:100%;
padding:14px;
margin-top:7px;
border:1px solid #ddd;
border-radius:8px;
font-size:16px;
}

.total{
margin-top:25px;
padding:22px;
background:#f1ede5;
border-radius:12px;
text-align:center;
}

.total-title{
font-size:15px;
}

.total-price{
font-size:30px;
font-weight:bold;
margin-top:5px;
}

button{
width:100%;
padding:16px;
margin-top:20px;
border:0;
border-radius:8px;
background:#29251f;
color:white;
font-size:17px;
font-weight:bold;
}

</style>

</head>

<body>

<div class="header">

<h1>AL FAKHAMA TRAVEL</h1>

<p>Premium Hotel Booking — Madinah & Makkah</p>

</div>


<div class="container">

<div class="booking">

<h2>Hotel Booking</h2>


<label>Destination</label>

<select id="destination">

<option value="">Select Destination</option>

<option value="Madinah">
Madinah
</option>

<option value="Makkah">
Makkah
</option>

</select>



<label>Hotel</label>

<select id="hotel">

<option value="">
Select Hotel
</option>

</select>



<label>Room Type</label>

<select id="room">

<option value="">
Select Room
</option>

<option value="Double">
Double Room
</option>

<option value="Triple">
Triple Room
</option>

<option value="Quad">
Quad Room
</option>

</select>



<label>Number of Rooms</label>

<input
type="number"
id="rooms"
value="1"
min="1"
>



<label>Check-in</label>

<input
type="date"
id="checkin"
>



<label>Check-out</label>

<input
type="date"
id="checkout"
>



<div class="total">

<div class="total-title">
TOTAL PRICE
</div>

<div
class="total-price"
id="total"
>
0 SAR
</div>

</div>



<button onclick="sendBooking()">

REQUEST BOOKING

</button>


</div>

</div>


<script>


const hotels = {


Madinah: {


"Maien Taiba Hotel":{

Double:500,
Triple:560,
Quad:620

},


"Valy Al Madinah Hotel":{

Double:490,
Triple:550,
Quad:610

},


"View Al Madinah Hotel":{

Double:520,
Triple:580,
Quad:640

},


"GEWAR AL ANDALUS":{

Double:500,
Triple:550,
Quad:600

}


},


Makkah:{


"Anjum Hotel Makkah":{

Double:580,
Triple:680,
Quad:780

},


"Movinpik Makkah":{

Double:650,
Triple:775,
Quad:900

}


}


};



const destination =
document.getElementById(
"destination"
);


const hotel =
document.getElementById(
"hotel"
);


const room =
document.getElementById(
"room"
);


const rooms =
document.getElementById(
"rooms"
);


const checkin =
document.getElementById(
"checkin"
);


const checkout =
document.getElementById(
"checkout"
);


const total =
document.getElementById(
"total"
);



destination.addEventListener(
"change",
function(){

hotel.innerHTML =
'<option value="">Select Hotel</option>';


let selected =
destination.value;


if(
hotels[selected]
){

Object.keys(
hotels[selected]
).forEach(
function(name){

let option =
document.createElement(
"option"
);

option.value =
name;

option.textContent =
name;

hotel.appendChild(
option
);

});

}


calculate();

});



function calculate(){


let d =
destination.value;


let h =
hotel.value;


let r =
room.value;


let roomCount =
parseInt(
rooms.value
) || 1;


let nights =
0;


if(
checkin.value &&
checkout.value
){


let start =
new Date(
checkin.value
);


let end =
new Date(
checkout.value
);


nights =
Math.round(
(
end-start
) /
86400000
);


}


let price =
0;


if(
hotels[d] &&
hotels[d][h] &&
hotels[d][h][r]
){


price =
hotels[d][h][r];


}


let finalTotal =
price *
roomCount *
nights;


total.innerText =
finalTotal.toLocaleString()
+
" SAR";


}



hotel.addEventListener(
"change",
calculate
);


room.addEventListener(
"change",
calculate
);


rooms.addEventListener(
"input",
calculate
);


checkin.addEventListener(
"change",
calculate
);


checkout.addEventListener(
"change",
calculate
);



function sendBooking(){


let message =

"Al Fakhama Travel Booking%0A%0A"

+
"Destination: "
+
destination.value

+
"%0AHotel: "
+
hotel.value

+
"%0ARoom: "
+
room.value

+
"%0ARooms: "
+
rooms.value

+
"%0ACheck-in: "
+
checkin.value

+
"%0ACheck-out: "
+
checkout.value

+
"%0ATotal: "
+
total.innerText;


window.open(
"https://wa.me/?text="
+
message,
"_blank"
);


}


</script>


</body>

</html>
