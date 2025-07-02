import React, { useEffect, useRef, useState } from "react";
import { PiExportBold } from "react-icons/pi";

function ExportData({ tasks, collection_title }) {
  const [isShowingDownloadPanel, setIsShowingDownloadPanel] = useState(false);
  const downloadLink = useRef(null);
  const downloadPanel = useRef(null);

  const handleJsonDownload = () => {
    const jsonString = JSON.stringify(tasks, null, 2);

    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const fileName = `${collection_title[0].title
      .trim()
      .split(" ")
      .join("-")}.json`;

    downloadLink.current.href = url;
    downloadLink.current.download = fileName;
    downloadLink.current.click();
    downloadLink.current.href = "";
  };

  const handleCsvDownload = () => {
    const headers = Object.keys(tasks[0]);
    const csvRows = [headers.join(",")];

    tasks.forEach((row) => {
      const values = headers.map((header) => {
        let value = row[header];
        value = value.replaceAll(",", "'");
      });
      csvRows.push(values.join(","));
    });

    const csvString = csvRows.join("\n");

    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const fileName = `${collection_title[0].title
      .trim()
      .split(" ")
      .join("-")}.csv`;

    downloadLink.current.href = url;
    downloadLink.current.download = fileName;
    downloadLink.current.click();
    downloadLink.current.href = "";
  };

  useEffect(() => {
    const handleOuterClick = (e) => {
      if (downloadPanel.current && !downloadPanel.current.contains(e.target)) {
        setIsShowingDownloadPanel(false);
      }
    };

    document.addEventListener("mousedown", handleOuterClick);
    return () => {
      document.removeEventListener("mousedown", handleOuterClick);
    };
  }, []);

  return (
    <div className="inline-block w-fit h-fit relative">
      <PiExportBold
        title="Export"
        onClick={() => {
          setIsShowingDownloadPanel((prev) => !prev);
        }}
        size={40}
        className="bg-surface-light dark:bg-surface-dark p-2 rounded-full cursor-pointer text-text-muted-light dark:text-text-muted-dark border-2 border-border-light dark:border-border-dark z-50"
      />
      {isShowingDownloadPanel && (
        <div
          ref={downloadPanel}
          className="w-fit h-fit absolute bottom-full right-full flex flex-col justify-center items-center border-2 border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark max-sm:scale-80"
        >
          <button
            onClick={handleJsonDownload}
            className="px-4 py-2 tracking-tighter text-nowrap cursor-pointer border-b-2 border-b-border-light dark:border-b-border-dark "
          >
            As JSON
          </button>
          <button
            onClick={handleCsvDownload}
            className="px-4 py-2 tracking-tighter text-nowrap cursor-pointer "
          >
            As CSV
          </button>
          <a ref={downloadLink} className="hidden"></a>
        </div>
      )}
    </div>
  );
}

export default ExportData;
