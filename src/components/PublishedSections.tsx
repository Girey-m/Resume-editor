import { observer } from "mobx-react-lite";
import { sectionStore } from "../store/SectionStore";
import { Box, Typography, List, ListItem, Divider } from "@mui/material";
import type {
  PdfSection,
  ExperienceSection,
  EducationSection,
  SkillsSection,
  CertificateSection,
  AboutSection,
} from "../interfaces/SectionType";
import React from "react";

export const PublishedSections = observer(() => {
  const pdfSections = sectionStore.getPdfSectionItems();

  const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (dropIndex: number) => {
    if (draggedIndex === null || draggedIndex === dropIndex) return;
    sectionStore.movePdfSection(draggedIndex, dropIndex); //
    setDraggedIndex(null);
  };

  function isExperienceSection(
    section: PdfSection
  ): section is ExperienceSection {
    return section.type === "Опыт";
  }

  function isEducationSection(
    section: PdfSection
  ): section is EducationSection {
    return section.type === "Образование";
  }

  function isSkillsSection(section: PdfSection): section is SkillsSection {
    return section.type === "Навыки";
  }

  function isCertificateSection(
    section: PdfSection
  ): section is CertificateSection {
    return section.type === "Сертификаты";
  }

  function isAboutSection(section: PdfSection): section is AboutSection {
    return section.type === "О себе";
  }

  return (
    <Box mt={4} p={2} border="1px solid #999" borderRadius={2}>
      <Typography variant="h5" gutterBottom>
        Опубликованное содержимое
      </Typography>

      {pdfSections.map((section, idx) => (
        <Box
          key={idx}
          mb={3}
          draggable
          onDragStart={() => handleDragStart(idx)}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(idx)}
          sx={{
            opacity: draggedIndex === idx ? 0.5 : 1,
            border: "1px dashed transparent",
            transition: "all 0.2s",
            "&:hover": { borderColor: "#ccc" },
          }}
        >
          {isExperienceSection(section) && (
            <>
              <Typography variant="h6">Опыт</Typography>
              <List>
                <ListItem>Должность: {section.data.doljnost}</ListItem>
                <ListItem>Компания: {section.data.company}</ListItem>
                <ListItem>Период: {section.data.time}</ListItem>
                <ListItem>Описание: {section.data.description}</ListItem>
              </List>
            </>
          )}

          {isEducationSection(section) && (
            <>
              <Typography variant="h6">Образование</Typography>
              <List>
                <ListItem>
                  Учебное заведение: {section.data.educational}
                </ListItem>
                <ListItem>Специальность: {section.data.specials}</ListItem>
                <ListItem>Период: {section.data.time}</ListItem>
              </List>
            </>
          )}

          {isSkillsSection(section) && (
            <>
              <Typography variant="h6">Навыки</Typography>
              <Typography>{section.data.skill}</Typography>
            </>
          )}

          {isCertificateSection(section) && (
            <>
              <Typography variant="h6">Сертификаты</Typography>
              <Box display="flex" gap={2} flexWrap="wrap">
                {section.data.files.map(
                  (file: File | string, index: number) => {
                    if (file instanceof Blob) {
                      const url = URL.createObjectURL(file);
                      return (
                        <img
                          key={index}
                          src={url}
                          alt={`cert-${index}`}
                          width={100}
                          height={100}
                          style={{ objectFit: "cover", borderRadius: 8 }}
                          onLoad={() => URL.revokeObjectURL(url)}
                        />
                      );
                    } else if (typeof file === "string") {
                      return (
                        <img
                          key={index}
                          src={file}
                          alt={`cert-${index}`}
                          width={100}
                          height={100}
                          style={{ objectFit: "cover", borderRadius: 8 }}
                        />
                      );
                    } else {
                      return (
                        <Typography key={index} color="error">
                          Невалидный файл
                        </Typography>
                      );
                    }
                  }
                )}
              </Box>
            </>
          )}

          {isAboutSection(section) && (
            <>
              <Typography variant="h6">О себе</Typography>
              <Typography>{section.data.text}</Typography>
            </>
          )}
          <Divider sx={{ my: 2 }} />
        </Box>
      ))}
    </Box>
  );
});
