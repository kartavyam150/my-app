import React, { useState } from "react";
import Tesseract from "tesseract.js";
import "./ImgToTextPage.css";

// Parse any "Field: Value" pairs into a JSON object
function parseDynamicFields(rawText) {
  const lines = rawText.split("\n");
  const result = {};
  let lastKey = null;

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) return;

    // Match "Field: Value" or "Field - Value" or "Field – Value"
    const match = trimmed.match(/^([\w\s\/\(\)\.\-&]+)\s*[:\-–]\s*(.+)$/i);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim();
      if (key && value) {
        result[key] = value;
        lastKey = key;
      }
    } else if (lastKey) {
      // If the line doesn't match but we have a lastKey, append as multiline value
      result[lastKey] += " " + trimmed;
    }
  });

  return result;
}

const ImgToTextPage = () => {
  const [image, setImage] = useState(null);
  const [jsonResult, setJsonResult] = useState({});
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setJsonResult({});
  };

  const handleConvert = () => {
    if (!image) return;
    setLoading(true);
    Tesseract.recognize(image, "eng", {
      tessedit_pageseg_mode: Tesseract.PSM.SINGLE_BLOCK,
    })
      .then(({ data: { text } }) => {
        const parsed = parseDynamicFields(text);
        setJsonResult(
          parsed && Object.keys(parsed).length
            ? parsed
            : { raw: text.trim() }
        );
        setLoading(false);
      })
      .catch(() => {
        setJsonResult({ error: "Failed to extract text." });
        setLoading(false);
      });
  };

  // Get object URL for the image
  const imageUrl = image ? URL.createObjectURL(image) : null;

  return (
    <div className="img-to-text-page">
      <h1>Image to Text (OCR)</h1>
      <div className="img-to-text-page-actions">
        <label className="file-label">
          <span className="file-label-text">Choose Image</span>
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        <button onClick={handleConvert} disabled={!image || loading}>
          {loading ? "Converting..." : "Convert to Text"}
        </button>
      </div>
      {image && (
        <div className="preview">
          <img
            src={imageUrl}
            alt="Preview"
            className="preview-img"
          />
          <div>
            <a
              href={imageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="view-full-img-link"
            >
              View Full Image
            </a>
          </div>
        </div>
      )}
      <textarea
        id="output"
        className="ocr-result"
        value={
          Object.keys(jsonResult).length
            ? JSON.stringify(jsonResult, null, 2)
            : ""
        }
        readOnly
        placeholder="Extracted JSON will appear here..."
        rows={10}
        style={{ fontFamily: "monospace" }}
      />
      <script>
        {`
          function performOCR() {
              const file = document.getElementById('imageUpload').files[0];
              if (!file) {
                  alert("Please upload an image first.");
                  return;
              }
              document.getElementById('loader').style.display = 'block';
              const reader = new FileReader();
              reader.onload = function () {
                  document.getElementById('preview').src = reader.result;
                  document.getElementById('preview').style.display = 'block';

                  Tesseract.recognize(
                      reader.result,
                      'eng+hin+mar',
                      {
                          logger: m => console.log(m)
                      }
                  ).then(({ data: { text } }) => {
                      document.getElementById('output').value = text;
                  }).catch(error => {
                      console.error("OCR Error:", error);
                  }).finally(() => {
                      document.getElementById('loader').style.display = 'none';
                  });
              };
              reader.readAsDataURL(file);
          }
        `}
      </script>
    </div>
  );
};

export default ImgToTextPage;