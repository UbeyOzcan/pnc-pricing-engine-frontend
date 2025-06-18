// Fetch the JSON data
fetch('unique.json')
    .then(response => response.json())
    .then(data => {
        // Populate all dropdowns with sorted values
        populateDropdown('vehPower', data.VehPower.sort((a, b) => a - b));
        populateDropdown('vehAge', data.VehAge.sort((a, b) => a - b));
        populateDropdown('drivAge', data.DrivAge.sort((a, b) => a - b));
        populateDropdown('bonusMalus', data.BonusMalus.sort((a, b) => a - b));
        populateDropdown('vehBrand', data.VehBrand.sort());
        populateDropdown('vehGas', data.VehGas.sort());
        populateDropdown('area', data.Area.sort());
        populateDropdown('density', data.Density.sort((a, b) => a - b));
        populateDropdown('region', data.Region.sort());
        
        // Set default values for demo purposes
        document.getElementById('vehPower').value = 90;
        document.getElementById('vehAge').value = 3;
        document.getElementById('drivAge').value = 30;
        document.getElementById('vehGas').value = 'Regular';
        document.getElementById('area').value = 'D';
    })
    .catch(error => console.error('Error loading JSON data:', error));

// Function to populate dropdown
function populateDropdown(elementId, options) {
    const dropdown = document.getElementById(elementId);
    dropdown.innerHTML = '';
    
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = '-- Please select --';
    defaultOption.disabled = true;
    defaultOption.selected = true;
    dropdown.appendChild(defaultOption);
    
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.textContent = option;
        dropdown.appendChild(optionElement);
    });
}

// Form submission handler
document.getElementById('insuranceForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const calculateBtn = document.getElementById('calculateBtn');
    const resultContainer = document.getElementById('resultContainer');
    
    // Set loading state
    calculateBtn.classList.add('loading');
    calculateBtn.disabled = true;
    resultContainer.style.display = 'none';
    
    try {
        const formData = {
            power: document.getElementById('vehPower').value,
            vehage: document.getElementById('vehAge').value,
            drivage: document.getElementById('drivAge').value,
            bm: document.getElementById('bonusMalus').value,
            vhgas: document.getElementById('vehGas').value,
            area: document.getElementById('area').value,
            density: document.getElementById('density').value,
            brand: document.getElementById('vehBrand').value
        };

        // Validate all fields are selected
        if (!formData.power || !formData.vehage || !formData.drivage || !formData.vhgas || !formData.area || !formData.bm || !formData.density || !formData.brand) {
            throw new Error('Please fill in all required fields');
        }

        const premiumData = await getPremium(formData);
        displayResult(premiumData);
    } catch (error) {
        console.error('Error:', error);
        displayError(error.message);
    } finally {
        // Reset button state
        calculateBtn.classList.remove('loading');
        calculateBtn.disabled = false;
    }
});

// API call function with CORS handling
async function getPremium(formData) {
    const url = new URL('https://pnc-pricing-engine-backend.onrender.com/motor');
    url.searchParams.append('power', formData.power);
    url.searchParams.append('VehAge', formData.vehage);
    url.searchParams.append('DrivAge', formData.drivage);
    url.searchParams.append('VehGas', formData.vhgas);
    url.searchParams.append('Area', formData.area);
    url.searchParams.append('BonusMalus', formData.bm);
    url.searchParams.append('Density', formData.density);
    url.searchParams.append('VhBrand', formData.brand);

    const response = await fetch(url, {
        mode: 'cors',
        headers: {
            'Accept': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
    }

    return await response.json();
}

// Display result based on your API response format
function displayResult(premiumData) {
    const resultContainer = document.getElementById('resultContainer');
    const premiumAmount = document.getElementById('premiumAmount');
    const severity = document.getElementById('severity');
    const freq = document.getElementById('freq');
    //const vehicleSurcharge = document.getElementById('vehicleSurcharge');
    //const driverDiscount = document.getElementById('driverDiscount');
    
    // Format currency values
    const formatCurrency = (value) => `€${value.toFixed(2)}`;
    
    // Update the UI with the API response
    premiumAmount.textContent = formatCurrency(premiumData['Risk Premium'][0]);
    severity.textContent = formatCurrency(premiumData['Predicted Severity'][0]); // Example calculation
    freq.textContent = premiumData['Predicted Frequency'][0].toFixed(4);
    //vehicleSurcharge.textContent = formatCurrency(premiumData['Predicted Severity'][0] * 0.1); // Example
    //driverDiscount.textContent = formatCurrency(premiumData['Predicted Severity'][0] * 0.05); // Example
    
    // Show the result container
    resultContainer.style.display = 'block';
    resultContainer.scrollIntoView({ behavior: 'smooth' });
}

function displayError(message) {
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = `
        <div class="error-message">
            <strong><i class="fas fa-exclamation-triangle"></i> Error:</strong><br>
            ${message.replace('\n', '<br>')}
        </div>
    `;
    resultContainer.style.display = 'block';
    resultContainer.scrollIntoView({ behavior: 'smooth' });
}