document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById("diabetesForm");
  const resultDiv = document.getElementById("result");

  const smokingMap = {
    "No Info": [1, 0, 0, 0, 0, 0],
    "current": [0, 1, 0, 0, 0, 0],
    "ever": [0, 0, 1, 0, 0, 0],
    "former": [0, 0, 0, 1, 0, 0],
    "never": [0, 0, 0, 0, 1, 0],
    "not current": [0, 0, 0, 0, 0, 1]
  };

  //Proxy za lokalni server
  const ENDPOINT_URL = "http://localhost:3000/api/score";

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    resultDiv.textContent = "Analiziram...";
    resultDiv.className = "";

    try {
      const formData = new FormData(form);
      const smoking_history = formData.get("smoking_history");
      const smokingVector = smokingMap[smoking_history];

      if (!smokingVector) {
        throw new Error("Nevaljan odabir pušenja");
      }

      const payload = {
        "Inputs": {
          "data": [{
            "gender": Number(formData.get("gender")),
            "age": Number(formData.get("age")),
            "hypertension": Number(formData.get("hypertension")),
            "heart_disease": Number(formData.get("heart_disease")),
            "bmi": parseFloat(formData.get("bmi")),
            "HbA1c_level": parseFloat(formData.get("HbA1c_level")),
            "blood_glucose_level": Number(formData.get("blood_glucose_level")),
            "No Info": smokingVector[0],
            "current": smokingVector[1],
            "ever": smokingVector[2],
            "former": smokingVector[3],
            "never": smokingVector[4],
            "not current": smokingVector[5]
          }]
        },
        "GlobalParameters": {
          "method": "predict"
        }
      };

      const response = await fetch(ENDPOINT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const result = await response.json();
      const prediction = result.Results[0]; 

      if (prediction === 1) {
        resultDiv.innerHTML = "Postoji rizik od dijabetesa! Kontaktirajte liječnika što prije.";
        resultDiv.className = "risk";
      } else {
        resultDiv.innerHTML = "Nema indikacija dijabetesa. Nastavite zdravim životnim navikama!";
        resultDiv.className = "safe";
      }
    } catch (error) {
      console.error("Error:", error);
      resultDiv.innerHTML = `Greška: ${error.message}. Pokušajte ponovno ili provjerite unos.`;
      resultDiv.className = "error";
    }
  });
});

