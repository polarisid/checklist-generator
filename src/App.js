import React, { useState } from "react";
import { PDFDocument, rgb } from "pdf-lib";
import { saveAs } from "file-saver";
import samplePDF from "./Checklist_DTV_CI.pdf";

const App = () => {
  const [formData, setFormData] = useState({
    nome: "",
    modelo: "",
    serial: "",
    os: "",
    observacoes: "",
    tecnico: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generatePDF = async () => {
    const existingPdfBytes = await fetch(samplePDF).then((res) =>
      res.arrayBuffer()
    );
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const { width, height } = firstPage.getSize();

    firstPage.drawText(`3198122 -MSC ARACAJU`, {
      x: 120,
      y: height - 65,
      size: 12,
      color: rgb(0, 0, 0),
    });
    firstPage.drawText(`${formData.nome}`, {
      x: 90,
      y: height - 80,
      size: 12,
      color: rgb(0, 0, 0),
    });
    firstPage.drawText(`${formData.modelo}`, {
      x: 90,
      y: height - 95,
      size: 12,
      color: rgb(0, 0, 0),
    });
    firstPage.drawText(`${formData.serial}`, {
      x: 390,
      y: height - 80,
      size: 12,
      color: rgb(0, 0, 0),
    });
    firstPage.drawText(`${formData.os}`, {
      x: 390,
      y: height - 65,
      size: 12,
      color: rgb(0, 0, 0),
    });
    firstPage.drawText(`${formData.tecnico}`, {
      x: 120,
      y: height - 800,
      size: 12,
      color: rgb(0, 0, 0),
    });
    firstPage.drawText(`${formData.observacoes}`, {
      x: 50,
      y: height - 755,
      size: 12,
      color: rgb(0, 0, 0),
    });

    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    saveAs(blob, "output.pdf");
  };

  return (
    <div>
      <h1>Gerador de CHECKLIST EM PDF</h1>
      <form>
        <label>
          Nome do Cliente:
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Modelo:
          <input
            type="text"
            name="modelo"
            value={formData.modelo}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Serial:
          <input
            type="text"
            name="serial"
            value={formData.serial}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Ordem de Serviço (OS):
          <input
            type="text"
            name="os"
            value={formData.os}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Observações:
          <textarea
            name="observacoes"
            value={formData.observacoes}
            onChange={handleChange}
          ></textarea>
        </label>
        <label>
          Técnico:
          <textarea
            name="tecnico"
            value={formData.tecnico}
            onChange={handleChange}
          ></textarea>
        </label>
        <br />
        <button type="button" onClick={generatePDF}>
          Gerar PDF
        </button>
      </form>
    </div>
  );
};

export default App;
