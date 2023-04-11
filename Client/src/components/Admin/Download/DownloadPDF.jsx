import React, { useState } from "react";
import styles from "./DownloadPDF.module.css";
import { AiFillPrinter } from "react-icons/ai";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
const DownloadPDF = ({ tableColums, data, title, fileName }) => {
  const [paperSize, setPaperSize] = useState("a4");
  const handlePaperSizeChange = (event) => {
    setPaperSize(event.target.value);
  };
  const downloadPdf = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: paperSize,
    });
    doc.setFontSize(16);
    doc.text(title, 20, 10);
    doc.autoTable({
      theme: "grid",
      columns: tableColums.map((col) => ({ ...col, dataKey: col.field })),
      body: data,
      styles: {
        cellPadding: 2,
        fontSize: 10,
        valign: "middle",
        halign: "center",
      },
    });

    doc.save(fileName + ".pdf");
  };
  return (
    <div className={styles.downloadPDF}>
      <p>Export To PDF</p>
      <select
        style={{ padding: "4px", borderRadius: "6px" }}
        id="paper-size"
        value={paperSize}
        onChange={handlePaperSizeChange}
      >
        <option value="a4">A4</option>
        <option value="a3">A3</option>
        <option value="letter">Letter</option>
        <option value="legal">Legal</option>
      </select>
      <AiFillPrinter size={26} className={styles.icon} onClick={downloadPdf} />
    </div>
  );
};

export default DownloadPDF;
