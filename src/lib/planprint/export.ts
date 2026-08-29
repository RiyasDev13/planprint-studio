/** Export helpers for the printable sheet. Browser-only. */

const A4 = { width: 210, height: 297 };

async function renderCanvas(node: HTMLElement): Promise<HTMLCanvasElement> {
  const { default: html2canvas } = await import("html2canvas-pro");
  return html2canvas(node, {
    scale: Math.min(3, Math.max(2, window.devicePixelRatio || 1)),
    backgroundColor: getComputedStyle(node).backgroundColor || "#ffffff",
    useCORS: true,
    logging: false,
  });
}

export function printSheet() {
  window.print();
}

export async function downloadPNG(node: HTMLElement, filename: string) {
  const canvas = await renderCanvas(node);
  const url = canvas.toDataURL("image/png");
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filename}.png`;
  a.click();
}

export async function downloadPDF(node: HTMLElement, filename: string) {
  const canvas = await renderCanvas(node);
  const { jsPDF } = await import("jspdf");
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const margin = 8;
  const maxW = A4.width - margin * 2;
  const maxH = A4.height - margin * 2;
  const ratio = canvas.height / canvas.width;

  let w = maxW;
  let h = w * ratio;
  if (h > maxH) {
    h = maxH;
    w = h / ratio;
  }
  const x = (A4.width - w) / 2;
  const y = margin;

  pdf.addImage(canvas.toDataURL("image/jpeg", 0.98), "JPEG", x, y, w, h);
  pdf.save(`${filename}.pdf`);
}

export function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "planprint"
  );
}
