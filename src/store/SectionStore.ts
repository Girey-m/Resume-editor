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
    localStorage.setItem("section-items", JSON.stringify(this.sectionItems));
  }
}

export const sectionStore = new SectionStore();
