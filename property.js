const data = {
    "1": {
        "ownerId": 35,
        "ownerName": "Julia",
        "pricePerNight": 100,
        "cleaningFee": 12,
        "availability": [
            {
                "June": [19, 20, 21]
            },
            {
                "July": [1, 2, 3]
            }
        ],
        "guestsMax": 3,
        "bedrooms": 2,
        "bedSize": {
            "bedroom1": "king",
            "bedroom2": "twin"
        },
        "freeCancellation": "48 hours",
        "Kitchen": true,
        "Wifi": true,
        "Dedicated workspace": false,
        "Free parking on premises": true,
        "Pets allowed": false,
        "TV": true,
        "Free washer": "In building",
        "Free dryer": "In building",
        "Bath": true,
        "Private patio or balcony": true
    },
    "2": {
        "ownerId": 36,
        "ownerName": "Kevin",
        "pricePerNight": 80,
        "cleaningFee": 12,
        "availability": [
            {
                "June": [19, 20, 21, 22]
            },
            {
                "July": [2, 3]
            }
        ],
        "guestsMax": 2,
        "bedrooms": 2,
        "bedSize": {
            "bedroom1": "king"
        },
        "freeCancellation": "48 hours",
        "Kitchen": true,
        "Wifi": true,
        "Dedicated workspace": false,
        "Free parking on premises": true,
        "Pets allowed": false,
        "TV": true,
        "Bath": true,
        "Private patio or balcony": true
    }
};


function updateReservationInfo() {
  const id = window.location.pathname.split('/').pop().replace('.html', '');
  const property = data[id];
  const pricePerNight = property.pricePerNight;
  console.log(pricePerNight)
  const cleaningFee = property.cleaningFee;
  const airbnbServiceFee = 12;
  const checkinDate = new Date(document.getElementById('checkin-date').value);
  const checkoutDate = new Date(document.getElementById('checkout-date').value);
  const numGuests = parseInt(document.getElementById('num-guests').value);
  const nights = Math.ceil((checkoutDate - checkinDate) / (1000 * 3600 * 24)) || 1;
  const totalPrice = (nights * pricePerNight) + cleaningFee + airbnbServiceFee || 0;
  const pricePerNightTotal = pricePerNight * nights;

  document.querySelector('.price-per-night').textContent = `$${pricePerNight} per night`;
  document.querySelector('.price-detail:nth-child(1) .value').textContent = `${nights}`;
  document.querySelector('.price-detail:nth-child(2) .value').textContent = `$${cleaningFee}`;
  document.querySelector('.price-detail:nth-child(3) .value').textContent = `$${airbnbServiceFee}`;
  document.querySelector('.total .value').textContent = `$${totalPrice}`;

  // Save user input to localStorage
  const reservationInfo = {
    checkinDate: checkinDate,
    checkoutDate: checkoutDate,
    numGuests: numGuests,
    totalPrice: totalPrice,
    pricePerNight: pricePerNight
  };
  localStorage.setItem('reservationInfo', JSON.stringify(reservationInfo));
}

  
  window.addEventListener('DOMContentLoaded', () => {
    // Load reservationInfo from localStorage
    const reservationInfo = JSON.parse(localStorage.getItem('reservationInfo')) || {};
    document.getElementById('checkin-date').value = reservationInfo.checkinDate ? reservationInfo.checkinDate.toISOString().slice(0,10) : '';
    document.getElementById('checkout-date').value = reservationInfo.checkoutDate ? reservationInfo.checkoutDate.toISOString().slice(0,10) : '';
    document.getElementById('num-guests').value = reservationInfo.numGuests || '';
    updateReservationInfo();
    
    const checkinInput = document.getElementById('checkin-date');
    const checkoutInput = document.getElementById('checkout-date');
  
    checkinInput.addEventListener('change', () => {
      updateReservationInfo();
    });
  
    checkoutInput.addEventListener('change', () => {
      updateReservationInfo();
    });
  
    // const reserveButton = document.getElementById('reserve-button');
    // reserveButton.addEventListener('click', () => {
    //   // Save reservationInfo to localStorage upon clicking 'reserve' button
    //   const reservationInfo = {
    //     checkinDate: new Date(document.getElementById('checkin-date').value),
    //     checkoutDate: new Date(document.getElementById('checkout-date').value),
    //     numGuests: parseInt(document.getElementById('num-guests').value),
    //     totalPrice: parseFloat(document.querySelector('.total .value').textContent.slice(1))
    //   };
    //   localStorage.setItem('reservationInfo', JSON.stringify(reservationInfo));
    // });
  });
  
  updateReservationInfo()

  function reserve() {
    // Retrieve input values
    const checkinDate = document.getElementById("checkin-date");
    const checkoutDate = document.getElementById("checkout-date");
    const numGuests = document.getElementById("num-guests").value;
    const total = document.querySelector(".total .value").textContent;
    const numNights = document.querySelector('.price-detail:nth-child(1) .value').textContent
  
    // Check if check-in or check-out form is empty
    if (checkinDate.value === "") {
      checkinDate.style.border = "2px solid red";
      return;
    }
    if (checkoutDate.value === "") {
      checkoutDate.style.border = "2px solid red";
      return;
    }
  
    // Save input values to local storage
    localStorage.setItem("checkinDate", checkinDate.value);
    localStorage.setItem("checkoutDate", checkoutDate.value);
    localStorage.setItem("numGuests", numGuests);
    localStorage.setItem("total", total);
    localStorage.setItem("pricePerNight", 500)
    localStorage.setItem("numNights", numNights)
  
    // Redirect to payment page
    checkLocalStorage()
  }
  
  // Redirect to payment page if logged in
  function checkLocalStorage() {
    if (localStorage.getItem('formData')) {
      window.location.href = 'payment.html';
    } else {
      showSignUpBox();
    }
  }
  
  // Add event listeners to the reserve button and check-in/check-out date fields
  document.getElementById("reserve-button").addEventListener("click", reserve);
  document.getElementById("checkin-date").addEventListener("change", function() {
    this.style.border = "none";
  });
  document.getElementById("checkout-date").addEventListener("change", function() {
    this.style.border = "none";
  });

  /* check if user logged in */

  function displayDashboard() {
    const formData = localStorage.getItem('formData');
    if (formData) {
      const navRight = document.getElementById('nav-right');
      navRight.innerHTML = `<div class="navbar__menu__dropdown">
        <button onclick="toggleDropDownMenu()" id="navbar__menu__dropbtn" class="navbar__menu__dropbtn">Menu ▾</button>
        <div id="navbar__menu__dropdown-content" class="navbar__menu__dropdown-content">
          <a href="#">Host your home</a>
          <a href="#">Host an experience</a>
          <a href="#">Messages</a>
          <a href="#">Notifications</a>
          <a href="#">Trips</a>
          <a href="#">Account</a>
          <a href="#">Wishlists</a>
          <a href="#">Help</a>
        </div>
        <a href="#" class="navbar__menu__item">Hi, ${JSON.parse(localStorage['formData'])['name']}!</a>
      </div>`;
    }
    }
  
    window.addEventListener('load', function() {
        displayDashboard();
      });
      