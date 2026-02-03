document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("diabetesForm");
    const resultDiv = document.getElementById("result");

    // Smoking history one-hot encoding map
    const smokingMap = {
        "No Info": [1, 0, 0, 0, 0, 0],
        "current": [0, 1, 0, 0, 0, 0],
        "ever":    [0, 0, 1, 0, 0, 0],
        "former":  [0, 0, 0, 1, 0, 0],
        "never":   [0, 0, 0, 0, 1, 0],
        "not current": [0, 0, 0, 0, 0, 1]
    };

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
            const prediction = Array.isArray(result.Results) ? result.Results[0] : result.Results;

            if (prediction === 1 || prediction[0] === 1) {
                resultDiv.innerHTML = "<strong>Postoji rizik od dijabetesa!</strong><br>Kontaktirajte liječnika što prije.";
                resultDiv.className = "risk";
            } else {
                resultDiv.innerHTML = "<strong>Nema indikacija dijabetesa.</strong><br>Nastavite zdravim životnim navikama!";
                resultDiv.className = "safe";
            }

        } catch (error) {
            console.error("Error:", error);
            resultDiv.innerHTML = ` <strong>Greška:</strong> ${error.message}<br>Pokušajte ponovno ili provjerite unos.`;
            resultDiv.className = "error";
        }
    });
});
