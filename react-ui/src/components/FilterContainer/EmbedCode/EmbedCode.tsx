import { useAppSelector } from "../../../hooks/rtkHooks";
import Button from "@mui/material/Button";
import { useState } from "react";
import styles from "./EmbedCode.module.css";
import AdvancedSettings from "../../AdvancedSettings/AdvancedSettings";

const EmbedCode = () => {
  const [open, setOpen] = useState(false);

  const { filters } = useAppSelector((state) => state);

  const copyToClipBoard = () => {
    // Find the code block
    const code = document.getElementById("code");

    // Copy code to clipboard
    navigator.clipboard.writeText(code!.innerText);

    // Find the copy button
    const btn = document.getElementById("copyBtn");

    // Safety check..
    if (btn) {
      // Set text and set it back to original after 1.5s
      btn.innerText = "Kopioitu!";
      setTimeout(() => {
        btn.innerText = "Kopioi leikepöydälle";
      }, 1500);
    }
  };

  return (
    <div className={styles.container}>
      <Button
        className={styles.btn}
        variant={"outlined"}
        onClick={() => setOpen(!open)}
      >
        {"< >"}
      </Button>
      {open && (
        <div className={styles.advancedSettings}>
          <div className={styles.innerContainer}>
            <div id={"code"}>
              <pre>
                {`<script src="${process.env.REACT_APP_EMBED_URL}" type="text/javascript" defer></script>\n`}
                {`<div\n`}
                {`    class="event-calendar-embed"\n`}
                {filters.search && `    data-search="${filters.search}"\n`}
                {!!filters.eventTypes.length &&
                  `    data-keywords="${filters.eventTypes.join()}"\n`}
                {!!filters.audiences.length &&
                  `    data-audiences="${filters.audiences.join()}"\n`}
                {filters.startTime &&
                  filters.endTime &&
                  `   data-start-time="${filters.startTime}\n`.concat(
                    `   data-end-time="${filters.endTime}"\n`
                  )}
                {filters.eventFeatures &&
                  `    data-features="${filters.eventFeatures}"\n`}
                {`    data-title="${filters.embedTitle}"\n`}
                {`    data-description="${filters.embedDesc}"\n`}
                {`    data-style="${filters.style}"\n`}
                {`    data-listview="${filters.listView}"\n`}
                {`    data-numofview="${filters.viewNum}"\n`}
                {`    data-hidesearchcriteria="${filters.searchCriteria}"\n`}
                {`></div>\n`}
              </pre>
            </div>
            <Button
              sx={{ m: 2 }}
              variant={"contained"}
              id={"copyBtn"}
              onClick={() => copyToClipBoard()}
            >
              Kopioi leikepöydälle
            </Button>
          </div>
          <div className={styles.advancedSettings}>
            <AdvancedSettings />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmbedCode;
