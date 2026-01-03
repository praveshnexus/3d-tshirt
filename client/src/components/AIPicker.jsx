import React from "react";
import CustomButton from "./CustomButton";

const AIPicker = ({ prompt, setPrompt }) => {
  return (
    <div className="aipicker-container">
      <textarea
        className="aipicker-textarea opacity-60 cursor-not-allowed"
        placeholder="AI service temporarily unavailable"
        rows={5}
        value={prompt}
        disabled
        onChange={(e) => setPrompt(e.target.value)}
      />

      <div className="flex flex-wrap gap-3">
        <CustomButton
          type="outline"
          title="AI service unavailable"
          disabled
          customStyles="text-xs opacity-60 cursor-not-allowed"
        />
      </div>
    </div>
  );
};

export default AIPicker;
