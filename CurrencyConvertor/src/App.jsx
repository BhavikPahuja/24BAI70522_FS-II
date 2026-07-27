import { useState } from "react"
const exchangeRates = {
  USD: 1,
  INR: 83.25,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 157.4,
  AUD: 1.51,
  CAD: 1.37,
  CHF: 0.89,
  SGD: 1.34,
  AED: 3.67,
}

const currencies = Object.keys(exchangeRates)

function formatAmount(amount, currency) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: amount >= 1000 ? 0 : 2,
  }).format(amount)
}

function convertCurrency(amount, fromCurrency, toCurrency) {
  if (fromCurrency === toCurrency) {
    return amount
  }

  return (amount / exchangeRates[fromCurrency]) * exchangeRates[toCurrency]
}

function App() {
  const [amount, setAmount] = useState(120)
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("INR")

  const convertedAmount = convertCurrency(amount, fromCurrency, toCurrency)
  const rate = convertCurrency(1, fromCurrency, toCurrency)

  function swapCurrencies() {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
  }

  return (
    <main className="app-shell">
      <section className="hero-card">
        <div className="hero-copy">
          <span className="eyebrow">Currency convertor</span>
          <h1>Swap between currencies with a fast, local rate table.</h1>
          <p>
            The converter keeps the same hook-based structure as CampusHub and
            works offline with a clear base-currency calculation.
          </p>
        </div>

        <div className="rate-card">
          <span className="rate-label">Live example rate</span>
          <strong>{formatAmount(rate, toCurrency)} per 1 {fromCurrency}</strong>
          <p>
            Built from a static reference table so the app remains reliable even
            without an API key.
          </p>
        </div>
      </section>

      <section className="panel converter-grid">
        <label className="converter-field amount-field">
          Amount
          <input
            type="number"
            min="0"
            step="0.01"
            value={amount}
            onChange={(event) => setAmount(Number(event.target.value))}
          />
        </label>

        <div className="currency-grid">
          <label className="converter-field">
            From
            <select
              value={fromCurrency}
              onChange={(event) => setFromCurrency(event.target.value)}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </label>

          <button type="button" className="swap-button" onClick={swapCurrencies}>
            Swap
          </button>

          <label className="converter-field">
            To
            <select
              value={toCurrency}
              onChange={(event) => setToCurrency(event.target.value)}
            >
              {currencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="result-card">
          <span className="rate-label">Converted amount</span>
          <strong>{formatAmount(convertedAmount, toCurrency)}</strong>
          <p>
            {formatAmount(amount, fromCurrency)} equals {formatAmount(convertedAmount, toCurrency)}
          </p>
        </div>

        <div className="currency-strip">
          {currencies.slice(0, 6).map((currency) => (
            <span key={currency} className="currency-chip">
              {currency}
            </span>
          ))}
        </div>
      </section>
    </main>
  )
}

export default App
