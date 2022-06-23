import React, { useState } from "react";

function Calculator() {
  const [passiveIncomeCalc, setPassiveIncomeCalc] = useState({
    passiveIncomeGoal: '',
    fromAge: '',
    toAge: '',
    monthlyPayments: '',
    totalInvestedGoal: '',
  });

  const [dividendRate, setDividendRate] = useState(0.08);

  const calculateInvestmentGoal = () => {
    // Check if this works
    const passiveIncomeGoal = passiveIncomeCalc.passiveIncomeGoal;
    let result = passiveIncomeGoal / dividendRate;
    setPassiveIncomeCalc({
      ...passiveIncomeCalc,
      totalInvestedGoal: result,
    });
  };

  const handleInputChange = (event) => {
    setPassiveIncomeCalc({
      ...passiveIncomeCalc,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle error if text is not string  
    // Add $ to the beginning of input field and make sure to clear it during submit 
    // Add , for every 3 digits  

    console.log("Submit Called")
    console.log(passiveIncomeCalc);
    setPassiveIncomeCalc({
      ...passiveIncomeCalc,
      passiveIncomeGoal: '',
      fromAge: '',
      toAge: '',
    })
    
  };

  return (
    <div>
      <h1 className="text-center text-3xl font-bold">Calculator</h1>
      <form onSubmit={handleSubmit}>
        <label>Passive Income Goal: </label>
        <input
          type="text"
          name="passiveIncomeGoal"
          value={passiveIncomeCalc.passiveIncomeGoal}
          onChange={handleInputChange}
          required
        />
        <label>From Age: </label>
        <input
          type="text"
          name="fromAge"
          value={passiveIncomeCalc.fromAge}
          onChange={handleInputChange}
          required
        />
        <label>To Age: </label>
        <input
          type="text"
          name="toAge"
          value={passiveIncomeCalc.toAge}
          onChange={handleInputChange}
          required
        />
        <button className="btn bg-orange-400 text-white" type="submit">
          Calculate
        </button>
      </form>
    </div>
  );
}

export default Calculator;
