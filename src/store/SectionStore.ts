import { makeAutoObservable } from "mobx";
import type { SectionType, PdfSection } from "../interfaces/SectionType";

class SectionStore {
  sectionItems: SectionType[] = [];
  pdfSectionItems: PdfSection[] = [];

  constructor() {
    const saved = localStorage.getItem("section-items");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          this.sectionItems = parsed;
        }
      } catch (error) {
        console.log("Ошибка при загрузке секций из localStorage:", error);
      }
    }

    const savedPdf = localStorage.getItem("pdf-items");
    if (savedPdf) {
      try {
        const parsed = JSON.parse(savedPdf);
        if (Array.isArray(parsed)) {
          this.pdfSectionItems = parsed;
        }
      } catch (error) {
        console.log("Ошибка при загрузке pdf секций из localStorage:", error);
      }
    }

    makeAutoObservable(this);
  }

  addSection(section: SectionType) {
    if (!this.sectionItems.includes(section)) {
      this.sectionItems.push(section);
      this.saveToStorage();
    }
  }

  removeSection(section: SectionType) {
    this.sectionItems = this.sectionItems.filter((dItem) => dItem !== section);
    this.saveToStorage();
  }

  saveToStorage() {
    localStorage.setItem("section-items", JSON.stringify(this.sectionItems));
  }

  getSectionItems() {
    return this.sectionItems || "";
  }

  moveSection(fromIndex: number, toIndex: number) {
    const updated = [...this.sectionItems];
    const [movedItem] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, movedItem);
    this.sectionItems = updated;
    this.saveToStorage();
  }

  addPdfSection(pdfSection: PdfSection) {
    const index = this.pdfSectionItems.findIndex(
      (section) => section.type === pdfSection.type
    );

    if (index !== -1) {
      this.pdfSectionItems[index] = pdfSection;
    } else {
      this.pdfSectionItems.push(pdfSection);
    }
    this.savePdfToStorage();
  }

  removePdfSection(pdfSection: PdfSection) {
    const index = this.pdfSectionItems.findIndex(
      (section) => section.type === pdfSection.type
    );

    if (index !== -1) {
      this.pdfSectionItems.splice(index, 1);
      this.savePdfToStorage();
    } else {
      console.log(`Секция с типом ${pdfSection.type} не найдена для удаления.`);
    }
  }
  movePdfSection(fromIndex: number, toIndex: number) {
    const updated = [...this.pdfSectionItems];
    const [movedItem] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, movedItem);
    this.pdfSectionItems = updated;
  }

  savePdfToStorage() {
    localStorage.setItem("pdf-items", JSON.stringify(this.pdfSectionItems));
  }

  getPdfSectionItems() {
    return this.pdfSectionItems || "";
  }
}

export const sectionStore = new SectionStore();
