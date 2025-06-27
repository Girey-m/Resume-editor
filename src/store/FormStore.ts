// import { makeAutoObservable } from "mobx";

// class FormStore {
//   experience = {
//     doljnost: "",
//     company: "",
//     time: "",
//     description: "",
//   };

//   skills: string[] = [];

//   education = {
//     educational: "",
//     specials: "",
//     time: "",
//   };

//   certificates: File[] = [];

//   about = "";

//   constructor() {
//     makeAutoObservable(this);
//   }

//   setExperienceField(field: keyof typeof this.experience, value: string) {
//     this.experience[field] = value;
//   }

//   setSkillsFromString(skills: string) {
//     this.skills = skills.split(",").map((s) => s.trim());
//   }

//   setEducationField(field: keyof typeof this.education, value: string) {
//     this.education[field] = value;
//   }

//   setCertificates(files: File[]) {
//     this.certificates = files;
//   }

//   setAbout(text: string) {
//     this.about = text;
//   }

//   get pdfObject() {
//     return {
//       experience: this.experience,
//       skills: this.skills,
//       education: this.education,
//       certificates: this.certificates,
//       about: this.about,
//     };
//   }
// }

// export const formStore = new FormStore();


