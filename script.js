const temperatureInput = document.getElementById("temperature");
const unitSelect = document.getElementById("unit");
const convertButton = document.getElementById("convertButton");
const errorMessage = document.getElementById("error");

function convertTemperature() {
    const input = temperatureInput.value.trim();
    const unit = unitSelect.value;

    errorMessage.textContent = "";

    if (input === "") {
        showError("Please enter a temperature.");
        return;
    }

    const temperature = Number(input);

    if (!Number.isFinite(temperature)) {
        showError("Please enter a valid temperature.");
        return;
    }

    let celsius;
    let fahrenheit;
    let kelvin;

    // Convert the input into all three units
    if (unit === "C") {
        celsius = temperature;
        fahrenheit = (temperature * 9 / 5) + 32;
        kelvin = temperature + 273.15;
    } else if (unit === "F") {
        celsius = (temperature - 32) * 5 / 9;
        fahrenheit = temperature;
        kelvin = celsius + 273.15;
    } else {
        kelvin = temperature;
        celsius = temperature - 273.15;
        fahrenheit = (celsius * 9 / 5) + 32;
    }

    // Reject temperatures below absolute zero
    if (celsius < -273.15) {
        showError("Temperature cannot be below absolute zero.");
        return;
    }

    // Display converted values
    document.getElementById("celsius").textContent =
        celsius.toFixed(2) + " °C";

    document.getElementById("fahrenheit").textContent =
        fahrenheit.toFixed(2) + " °F";

    document.getElementById("kelvin").textContent =
        kelvin.toFixed(2) + " K";
}

function showError(message) {
    errorMessage.textContent = message;

    document.getElementById("celsius").textContent = "--";
    document.getElementById("fahrenheit").textContent = "--";
    document.getElementById("kelvin").textContent = "--";
}

convertButton.addEventListener("click", convertTemperature);

// Allow conversion by pressing Enter
temperatureInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        convertTemperature();
    }
});