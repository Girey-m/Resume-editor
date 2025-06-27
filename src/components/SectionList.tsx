import { sectionStore } from "../store/SectionStore";
import { observer } from "mobx-react-lite";
import { Box, Typography, TextField, Stack, Button } from "@mui/material";
import { Buttons } from "./Buttons";
import React from "react";
import type {
  SectionType,
  ExperienceSection,
  EducationSection,
  SkillsSection,
  CertificateSection,
  AboutSection,
} from "../interfaces/SectionType";

const ExperienceForm: React.FC = () => {
  const [experience, setExperience] = React.useState<ExperienceSection>({
    type: "Опыт",
    data: { doljnost: "", company: "", time: "", description: "" },
  });

  const handleChange =
    (field: keyof ExperienceSection["data"]) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setExperience((prev) => ({
        ...prev,
        data: { ...prev.data, [field]: e.target.value },
      }));
    };
  return (
    <>
      <Stack spacing={2}>
        <TextField
          label="Должность"
          fullWidth
          value={experience.data.doljnost}
          onChange={handleChange("doljnost")}
        />
        <TextField
          label="Компания"
          fullWidth
          value={experience.data.company}
          onChange={handleChange("company")}
        />
        <TextField
          label="Период"
          fullWidth
          value={experience.data.time}
          onChange={handleChange("time")}
        />
        <TextField
          label="Описание"
          fullWidth
          multiline
          value={experience.data.description}
          onChange={handleChange("description")}
        />
      </Stack>
      <Box mt={2} display="flex" gap={2}>
        <Buttons btnType="SEND" section={"Опыт"} pdfSection={experience} />
        <Buttons btnType="DELETE" section={"Опыт"} pdfSection={experience} />
      </Box>
    </>
  );
};

const EducationForm: React.FC = () => {
  const [education, setEducation] = React.useState<EducationSection>({
    type: "Образование",
    data: { educational: "", specials: "", time: "" },
  });

  const handleChange =
    (field: keyof EducationSection["data"]) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEducation((prev) => ({
        ...prev,
        data: { ...prev.data, [field]: e.target.value },
      }));
    };

  return (
    <>
      <Stack spacing={2}>
        <TextField
          label="Учебное заведение"
          fullWidth
          value={education.data.educational}
          onChange={handleChange("educational")}
        />
        <TextField
          label="Специальность"
          fullWidth
          value={education.data.specials}
          onChange={handleChange("specials")}
        />
        <TextField
          label="Период"
          fullWidth
          value={education.data.time}
          onChange={handleChange("time")}
        />
      </Stack>
      <Box mt={2} display="flex" gap={2}>
        <Buttons btnType="SEND" section="Образование" pdfSection={education} />
        <Buttons
          btnType="DELETE"
          section="Образование"
          pdfSection={education}
        />
      </Box>
    </>
  );
};

const SkillsForm: React.FC = () => {
  const [skills, setSkills] = React.useState<SkillsSection>({
    type: "Навыки",
    data: { skill: "" },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSkills({ ...skills, data: { skill: e.target.value } });
  };

  return (
    <>
      <Stack spacing={2}>
        <TextField
          label="Навыки (через запятую)"
          fullWidth
          value={skills.data.skill}
          onChange={handleChange}
        />
      </Stack>
      <Box mt={2} display="flex" gap={2}>
        <Buttons btnType="SEND" section="Навыки" pdfSection={skills} />
        <Buttons btnType="DELETE" section="Навыки" pdfSection={skills} />
      </Box>
    </>
  );
};

const CertificateForm: React.FC = () => {
  const [certificates, setCertificates] = React.useState<CertificateSection>({
    type: "Сертификаты",
    data: { files: [] },
  });

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const fileArray = Array.from(event.target.files);
      setCertificates((prev) => ({
        ...prev,
        data: { files: fileArray },
      }));
    }
  };

  return (
    <>
      <Stack spacing={2}>
        <Button variant="outlined" component="label">
          Загрузить сертификаты
          <input
            type="file"
            hidden
            multiple
            accept="image/*"
            onChange={handleUpload}
          />
        </Button>

        {certificates.data.files.length > 0 && (
          <Box display="flex" flexWrap="wrap" gap={2}>
            {certificates.data.files.map((file, idx) => (
              <img
                key={idx}
                src={URL.createObjectURL(file)}
                alt={`certificate-${idx}`}
                style={{
                  width: 100,
                  height: 100,
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
            ))}
          </Box>
        )}
      </Stack>
      <Box mt={2} display="flex" gap={2}>
        <Buttons
          btnType="SEND"
          section="Сертификаты"
          pdfSection={certificates}
        />
        <Buttons
          btnType="DELETE"
          section="Сертификаты"
          pdfSection={certificates}
        />
      </Box>
    </>
  );
};

const AboutForm: React.FC = () => {
  const [about, setAbout] = React.useState<AboutSection>({
    type: "О себе",
    data: { text: "" },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAbout({ ...about, data: { text: e.target.value } });
  };

  return (
    <>
      <TextField
        label="О себе"
        multiline
        rows={5}
        fullWidth
        value={about.data.text}
        onChange={handleChange}
        placeholder="Расскажите о себе: навыки, цели, интересы..."
      />
      <Box mt={2} display="flex" gap={2}>
        <Buttons btnType="SEND" section="О себе" pdfSection={about} />
        <Buttons btnType="DELETE" section="О себе" pdfSection={about} />
      </Box>
    </>
  );
};

const renderFormBySection = (section: SectionType) => {
  switch (section) {
    case "Опыт":
      return <ExperienceForm />;
    case "Образование":
      return <EducationForm />;
    case "Навыки":
      return <SkillsForm />;
    case "Сертификаты":
      return <CertificateForm />;
    case "О себе":
      return <AboutForm />;
    default:
      return <Typography>Nope</Typography>;
  }
};

export const SectionList: React.FC = observer(() => {
  const localItems = sectionStore.sectionItems;
  const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (dropIndex: number) => {
    if (draggedIndex === null || draggedIndex === dropIndex) return;
    sectionStore.moveSection(draggedIndex, dropIndex);
    setDraggedIndex(null);
  };

  return (
    <Box display="flex" flexDirection="column" gap={4} mt={2}>
      {localItems.map((item, index) => (
        <Box
          key={`${item}-${index}`}
          p={2}
          border="1px solid #ccc"
          borderRadius={2}
          boxShadow={1}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(index)}
          sx={{
            opacity: draggedIndex === index ? 0.5 : 1,
            cursor: "grab",
            transition: "opacity 0.2s ease",
          }}
        >
          <Typography variant="h6" mb={2}>
            {item}
          </Typography>

          {renderFormBySection(item)}
        </Box>
      ))}
    </Box>
  );
});
