import React, { useState } from "react";

function App() {
  const [jsonData, setJsonData] = useState("");
  const [sum, setSum] = useState(0);
  const [sumNotTie, setSumNotTie] = useState(0);
  const [ok, setOk] = useState(false);
  const [error, setError] = useState(false);

  const handleJsonChange = (event) => {
    setJsonData(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      const dataParse = JSON.parse(jsonData);
      let calSum = 0;
      let calSumNotTie = 0;

      for (const item of dataParse?.data) {
        calSum += Number(item.realBetAmt);
        if (!item?.gameInfoJson?.includes("TIE")) {
          calSumNotTie += Number(item.realBetAmt);
        }
      }
      setSum(calSum);
      setSumNotTie(calSumNotTie);
      setOk(true);
      setError(false);
    } catch (error) {
      console.log(error);
      setOk(false);
      setError(true);
    }
  };

  return (
    <div
      style={
        ok
          ? {
              width: "100vw",
              height: "100vh",
              backgroundImage: 'url("./logo.JPG")',
              backgroundSize: "contain",
            }
          : {}
      }
    >
      <div
        className="container"
        style={{
          marginTop: "50px",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          width: "fit-content",
        }}
      >
        <label
          style={{
            marginTop: "20px",
            fontWeight: "bold",
            color: "blue",
            fontSize: "20px",
          }}
        >
          Dán dữ liệu vô đây:
        </label>
        <textarea
          style={{ width: "500px", height: "300px" }}
          value={jsonData}
          onChange={handleJsonChange}
        />
        {error && (
          <p style={{ color: "red", marginBottom: "10px" }}>
            lỗi dữ liệu, làm lại đi.
          </p>
        )}

        <button
          onClick={handleSubmit}
          type="submit"
          style={{
            width: "fit-content",
            margin: "auto",
            fontWeight: "bold",
            color: "green",
            fontSize: "20px",
            padding: "5px 10px",
          }}
        >
          Lụm
        </button>
        <p style={{ fontWeight: "bold", color: "blue", fontSize: "20px" }}>
          Tổng bao gồm hoà: {sum}
        </p>
        <p style={{ fontWeight: "bold", color: "blue", fontSize: "20px" }}>
          Tổng không bao gồm hoà:{sumNotTie}
        </p>
        {/* <img src="./logo.JPG" /> */}
      </div>
    </div>
  );
}

export default App;
