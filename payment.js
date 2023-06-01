function updateReservationInfo() {
    const pricePerNight = Number(localStorage.getItem('pricePerNight'));
    const total = localStorage.getItem('total');
    const checkinDate = localStorage.getItem('checkinDate');
    const checkoutDate = localStorage.getItem('checkoutDate');
    const numNights = localStorage.getItem('numNights');
    
    // Get HTML elements to populate
    const propTitle = document.querySelector('.prop-title');
    const nightsValue = document.querySelector('.price-detail .value');
    const totalValue = document.querySelector('.total .value');
    
    // Populate the HTML elements with data from LocalStorage
    propTitle.textContent = 'Belsize Cottage';
    nightsValue.textContent = numNights;
    totalValue.textContent = total;
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
  
    // Redirect to payment page
    window.location.href = "payment.html";
  }
  
  // Add event listeners to the reserve button and check-in/check-out date fields
  document.getElementById("reserve-button").addEventListener("click", reserve);
  document.getElementById("checkin-date").addEventListener("change", function() {
    this.style.border = "none";
  });
  document.getElementById("checkout-date").addEventListener("change", function() {
    this.style.border = "none";
  });

  /* send request */

  function sendRequest() {
    const propertyName = "Belsize Park"
    const numNights = localStorage.numNights;
    const checkinDate = localStorage.checkinDate;
    const checkoutDate = localStorage.checkoutDate;
    const total = localStorage.total;
  
    const child1Div = document.querySelector('.child1');
    const child2Div = document.querySelector('.child2');
  
    // Update child1 div
    child1Div.innerHTML = `<h1>Your request has been sent to the host!</h1>`;
  
    // Hide child2 div
    child2Div.style.display = 'none';
  }
  
  /* Check if payment form is filled */

  function checkForm() {
    const cardHolder = document.getElementById('card-holder');
    const cardNumber = document.getElementById('card-number');
    const expiryDate = document.getElementById('expiry-date');
    const cvv = document.getElementById('cvv');
    
    let formIsValid = true;
    
    if (cardHolder.value === '') {
      formIsValid = false;
      cardHolder.style.border = '2px solid red';
    } else {
      cardHolder.style.border = '';
    }
    
    if (cardNumber.value === '') {
      formIsValid = false;
      cardNumber.style.border = '2px solid red';
    } else {
      cardNumber.style.border = '';
    }
    
    if (expiryDate.value === '') {
      formIsValid = false;
      expiryDate.style.border = '2px solid red';
    } else {
      expiryDate.style.border = '';
    }
    
    if (cvv.value === '') {
      formIsValid = false;
      cvv.style.border = '2px solid red';
    } else {
      cvv.style.border = '';
    }
    
    if (formIsValid) {
      sendRequest();
    }
  }
  
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
          