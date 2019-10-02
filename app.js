// listen for submit
document.getElementById("loan-form").addEventListener("submit", function(e) {
  // hide result
  document.getElementById("results").style.display = "none";

  // show loader

  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

// calculate results
function calculateResults(e) {
  console.log("listining");
  //   UI vars
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  // fomuals for calculation

  const principal = parseFloat(amount.value);
  const calculateInterest = parseFloat(interest.value) / 100 / 12;
  const calculatePayments = parseFloat(years.value) * 12;

  // monthly payments
  const x = Math.pow(1 + calculateInterest, calculatePayments);
  const monthly = (principal * x * calculateInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatePayments).toFixed(2);
    totalInterest.value = (monthly * calculatePayments - principal).toFixed(2);

    // show results

    document.getElementById("results").style.display = "block";

    // hide loading

    document.getElementById("loading").style.display = "none";
  } else {
    showError("please check your number");
  }
}

// show error
function showError(error) {
  // hide results

  document.getElementById("results").style.display = "none";

  // hide loading

  document.getElementById("loading").style.display = "none";

  // create a div
  const errorDiv = document.createElement("div");
  // get elements
  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // add class
  errorDiv.className = "alert alert-danger";

  // create text to add to div
  errorDiv.appendChild(document.createTextNode(error));

  // insert to dom
  card.insertBefore(errorDiv, heading);

  //   clear error

  setTimeout(clearError, 3000);
}

function clearError() {
  document.querySelector(".alert").remove();
}
