export type SectionType =
  | "Опыт"
  | "Образование"
  | "Навыки"
  | "Сертификаты"
  | "О себе";

export type ExperienceSection = {
  type: "Опыт";
  data: {
    doljnost: string;
    company: string;
    time: string;
    description: string;
  };
};
export type EducationSection = {
  type: "Образование";
  data: {
    educational: string;
    specials: string;
    time: string;
  };
};

export type SkillsSection = {
  type: "Навыки";
  data: {
    skill: string;
  };
};
export type CertificateSection = {
  type: "Сертификаты";
  data: {
    files: File[];
  };
};

export type AboutSection = {
  type: "О себе";
  data: {
    text: string;
  };
};
export type PdfSection =
  | {
      type: SectionType;
      data: {
        doljnost: string;
        company: string;
        time: string;
        description: string;
      };
    }
  | {
      type: SectionType;
      data: { educational: string; specials: string; time: string };
    }
  | { type: SectionType; data: { skill: string } }
  | { type: SectionType; data: { files: File[] } }
  | { type: SectionType; data: { text: string } };
