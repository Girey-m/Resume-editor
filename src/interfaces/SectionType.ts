export type SectionType =
  | "Опыт"
  | "Образование"
  | "Навыки"
  | "Сертификаты"
  | "О себе";

// export type PdfSections = [
//   {
//     type: "experience";
//     data: {
//       doljnost: string;
//       company: string;
//       time: string;
//       description: string;
//     };
//   },
//   {
//     type: "education";
//     data: { educational: string; specials: string; time: string };
//   },
//   { type: "skills"; data: { skill: string } },
//   { type: "certificates"; data: { files: File[] } },
//   { type: "about"; data: { text: string } }
// ];

export type PdfSection =
  | {
      type: "experience";
      data: {
        doljnost: string;
        company: string;
        time: string;
        description: string;
      };
    }
  | {
      type: "education";
      data: { educational: string; specials: string; time: string };
    }
  | { type: "skills"; data: { skill: string } }
  | { type: "certificates"; data: { files: File[] } }
  | { type: "about"; data: { text: string } };
