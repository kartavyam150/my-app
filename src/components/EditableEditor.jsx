import React, { useRef, useEffect } from "react";

const EditableEditor = () => {
  const editorRef = useRef(null);

  // Load saved content on mount
  useEffect(() => {
    const savedContent = localStorage.getItem("savedContent");
    if (savedContent && editorRef.current) {
      editorRef.current.innerHTML = savedContent;
    }
  }, []);

  const handleCommand = (command) => {
    document.execCommand(command, false, null);
    editorRef.current.focus();
  };

  const handleSave = () => {
    const content = editorRef.current.innerHTML;
    localStorage.setItem("savedContent", content);
    alert("Content Saved!");
  };

  const handleLoad = () => {
    const savedContent = localStorage.getItem("savedContent");
    if (savedContent) {
      editorRef.current.innerHTML = savedContent;
      alert("Content Loaded!");
    } else {
      alert("No saved content found.");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white/80 rounded-xl shadow-lg border border-gray-200">
      <div className="flex gap-2 mb-4">
        <button
          className="px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
          onClick={() => handleCommand("bold")}
        >
          Bold
        </button>
        <button
          className="px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
          onClick={() => handleCommand("italic")}
        >
          Italic
        </button>
        <button
          className="px-4 py-2 rounded bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
          onClick={() => handleCommand("underline")}
        >
          Underline
        </button>
        <button
          className="px-4 py-2 rounded bg-green-500 text-white font-semibold hover:bg-green-600 transition"
          onClick={handleSave}
        >
          Save
        </button>
        <button
          className="px-4 py-2 rounded bg-yellow-500 text-white font-semibold hover:bg-yellow-600 transition"
          onClick={handleLoad}
        >
          Load
        </button>
      </div>
      <div
        id="editor"
        ref={editorRef}
        contentEditable={true}
        role="textbox"
        className="min-h-[150px] border border-gray-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white shadow-inner"
        suppressContentEditableWarning={true}
      >
        Start Editing...
      </div>
    </div>
  );
};

export default EditableEditor;