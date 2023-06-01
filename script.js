function toggleCurrencySelection() {
    var currencySelection = document.getElementById("currency-selection");
    var overlay = document.getElementById("overlay");
    var main = document.getElementsByTagName("main")[0];
  
    if (currencySelection.style.display === "block") {
      currencySelection.style.display = "none";
      overlay.style.display = "none";
      main.classList.remove("currency-selection-open");
    } else {
      currencySelection.style.display = "block";
      overlay.style.display = "block";
      main.classList.add("currency-selection-open");
    }
  
    var currencyOptions = document.querySelectorAll("#currency-selection li");
    currencyOptions.forEach(function(option) {
      option.addEventListener("click", function() {
        localStorage.setItem("currency", this.id);
        location.reload();
      });
    });
  }

const iconContainer = document.getElementById('icon-container');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 1000) {
    iconContainer.classList.add('hidden');
  } else {
    iconContainer.classList.remove('hidden');
  }
});

const footer = document.querySelector('.footer');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 1000) {
    footer.classList.add('hidden');
  } else {
   footer.classList.remove('hidden');
  }
});

document.addEventListener('click', function(event) {
    const clickedElement = event.target;
    const mutedElement = document.getElementById('navbar__menu__dropdown-content');
    const mutedElement2 = document.getElementById('navbar__menu__dropbtn')
    console.log(mutedElement.classList.contains("visible"))
    if (clickedElement !== mutedElement &&
        clickedElement !== mutedElement2 &&
        !mutedElement.contains(clickedElement)) {
      hideDropdownContent();
    }
  });
  
  function hideDropdownContent() {
    const dropdownContent = document.getElementById('navbar__menu__dropdown-content');
    dropdownContent.classList.remove('visible');
  }
  
  


