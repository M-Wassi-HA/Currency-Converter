const fromAmountELement = document.querySelector(".amount")
const convertedAmountElement = document.querySelector(".convertedAmount")
const fromCurrencyElement = document.querySelector(".fromCurrency")
const toCurrencyElement = document.querySelector(".toCurrency")
const resultElement = document.querySelector(".result")
const container = document.querySelector(".container")


const countries = [
    { name: "Pakistan", code: "PKR" },
    { name: "United States", code: "USD" },
    { name: "Canada", code: "CAD" },
    { name: "United Kingdom", code: "GBP" },
    { name: "Australia", code: "AUD" },
    { name: "Japan", code: "JPY" },
    { name: "China", code: "CNY" },
    { name: "India", code: "INR" },
    { name: "Germany", code: "EUR" },
    { name: "France", code: "EUR" },
    { name: "Russia", code: "RUB" },
    { name: "Brazil", code: "BRL" },
    { name: "Mexico", code: "MXN" },
    { name: "South Africa", code: "ZAR" },
    { name: "Saudi Arabia", code: "SAR" },
    { name: "South Korea", code: "KRW" },
    { name: "Turkey", code: "TRY" },
    { name: "Switzerland", code: "CHF" },
    { name: "Argentina", code: "ARS" },
    { name: "Egypt", code: "EGP" },
    { name: "Nigeria", code: "NGN" },
  ];
countries.forEach(country => {
    const option1 = document.createElement("option")
    const option2 = document.createElement("option")

    option1.value = option2.value = country.code
    option1.textContent = option2.textContent = `${country.code} (${country.name})`

    fromCurrencyElement.appendChild(option1)
    toCurrencyElement.appendChild(option2)

    fromCurrencyElement.value = "USD"
    toCurrencyElement.value = "PKR"
})

const getExchangeRate = async () => {
    const amount = parseFloat(fromAmountELement.value); // Corrected the typo in 'fromAmountElement'
    const fromCurrency = fromCurrencyElement.value;
    const toCurrency = toCurrencyElement.value;
    resultElement.textContent = "Fetching Exchange Rates......."
    // console.log(toCurrency);


    try{
        const response = await fetch(`https://v6.exchangerate-api.com/v6/21592d893bd9e90d0f4c7be5/latest/${fromCurrency}`);
        const data = await response.json();
        const conversionRate = data.conversion_rates[toCurrency]; 
        const convertedAmount = (amount * conversionRate).toFixed(2);
        if(typeof conversionRate === "undefined"){
            resultElement.textContent = "Exchange Rate Is Not Available For Slelected Countries !!!!!"
            convertedAmountElement = ""
        }else{
        convertedAmountElement.value = convertedAmount;
        resultElement.textContent = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`

        }
    }catch(error){
        container.innerHTML = `<h2>Error While Fetching Exchange Rates !!!!</h2>`
    }
}
fromAmountELement.addEventListener("input", getExchangeRate);
fromCurrencyElement.addEventListener("change", getExchangeRate);
toCurrencyElement.addEventListener("change", getExchangeRate);
window.addEventListener("load", getExchangeRate);

