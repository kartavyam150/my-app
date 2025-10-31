import React, { useState } from "react";

const ShlokaForm = () => {
  const [formData, setFormData] = useState({
    shloka: "",
    meaning: "",
    date: "",
    source: "",
    comment: ""
  });

//   const API_URL = "https://script.google.com/macros/s/YOUR_WEB_APP_ID/exec"; // 👈 Replace this
  const API_URL = "https://script.google.com/macros/s/AKfycbylYV1HT_wTHUB7ZYNsfkWKhVDbhMVIX8V7LWHCpLe7GxXUA90iV5ctJPldO91w_89N-Q/exec"; 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json"
        // },
        headers: {
            "Content-Type": "text/plain;charset=utf-8", // 👈 magic line
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      console.log("Response from Google Sheets:", result);

      if (result.status === "success") {
        alert("✅ Shloka saved successfully!");
        setFormData({
          shloka: "",
          meaning: "",
          date: "",
          source: "",
          comment: ""
        });
      } else {
        alert("⚠️ Failed to save. Try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Error while saving. Check console.");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h2>📜 Add New Shloka</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>🕉️ Shloka:</label><br />
          <textarea
            name="shloka"
            value={formData.shloka}
            onChange={handleChange}
            rows="3"
            required
          />
        </div>
        <div>
          <label>🔍 Meaning/Translation:</label><br />
          <textarea
            name="meaning"
            value={formData.meaning}
            onChange={handleChange}
            rows="3"
            required
          />
        </div>
        <div>
          <label>📅 Date:</label><br />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>📚 Source (Puran/Granth):</label><br />
          <input
            type="text"
            name="source"
            value={formData.source}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>🗣️ Comment:</label><br />
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            rows="2"
          />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>🚀 Submit</button>
      </form>
    </div>
  );
};

export default ShlokaForm;
