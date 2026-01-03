import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";

import state from "../store";
import { download } from "../assets";
import { downloadCanvasToImage, reader } from "../config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../config/constants";
import { fadeAnimation, slideAnimation } from "../config/motion";
import {
  AIPicker,
  ColorPicker,
  CustomButton,
  FilePicker,
  Tab,
} from "../components/import";

const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generatingImg, setGeneratingImg] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  // ---------------------------
  // RESET (FINAL SAFE VERSION)
  // ---------------------------
  const handleReset = () => {
    state.color = "#ffffff";

    // IMPORTANT: DO NOT clear decals
    state.isLogoTexture = false;
    state.isFullTexture = false;

    setActiveFilterTab({
      logoShirt: false,
      stylishShirt: false,
    });

    setActiveEditorTab("");
    setPrompt("");
    setFile("");
  };

  // ---------------------------
  // AI SUBMIT
  // ---------------------------
  const handleSubmit = async (type) => {
    if (!prompt) return alert("Please enter a prompt");

    try {
      setGeneratingImg(true);

      const response = await fetch(
        "https://ai-stitches.onrender.com/api/v1/ai",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        }
      );

      const data = await response.json();

      // ✅ CRITICAL SAFETY CHECK
      if (!data || !data.photo) {
        alert("AI generation failed. Please try again.");
        return;
      }

      handleDecals(type, `data:image/png;base64,${data.photo}`);
    } catch (error) {
      alert("Something went wrong. Try again.");
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  };

  // ---------------------------
  // DECALS
  // ---------------------------
  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];
    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
    }

    setActiveFilterTab((prev) => ({
      ...prev,
      [tabName]: !prev[tabName],
    }));
  };

  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecals(type, result);
      setActiveEditorTab("");
    });
  };

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case "aipicker":
        return <AIPicker prompt={prompt} setPrompt={setPrompt} />;

      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          {/* LEFT PANEL */}
          <motion.div
            key="custom"
            className="absolute top-0 left-0 z-10"
            {...slideAnimation("left")}
          >
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() =>
                      setActiveEditorTab(
                        activeEditorTab === tab.name ? "" : tab.name
                      )
                    }
                    isActive={activeEditorTab === tab.name}
                  />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          {/* TOP RIGHT BUTTONS */}
          <motion.div
            className="absolute z-10 top-5 right-5 flex gap-3"
            {...fadeAnimation}
          >
            <CustomButton
              type="outline"
              title="Reset"
              handleClick={handleReset}
              customStyles="px-4 py-2.5 font-bold text-sm"
            />
            <CustomButton
              type="filled"
              title="Go Back"
              handleClick={() => (state.intro = true)}
              customStyles="px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>

          {/* BOTTOM FILTERS */}
          <motion.div
            className="filtertabs-container"
            {...slideAnimation("up")}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}

            <button className="download-btn" onClick={downloadCanvasToImage}>
              <img
                src={download}
                alt="download"
                className="w-3/5 h-3/5 object-contain"
              />
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
