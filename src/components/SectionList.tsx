import { sectionStore } from "../store/SectionStore";
import { observer } from "mobx-react-lite";
import { Box, Typography, TextField, Stack, Button } from "@mui/material";
import { Buttons } from "./Buttons";
import React from "react";
import type { SectionType } from "../interfaces/SectionType";

const ExperienceForm = () => (
  <Stack spacing={2}>
    <TextField label="Должность" fullWidth />
    <TextField label="Компания" fullWidth />
    <TextField label="Период" fullWidth />
    <TextField label="Описание" fullWidth multiline />
  </Stack>
);

const EducationForm = () => (
  <Stack spacing={2}>
    <TextField label="Учебное заведение" fullWidth />
    <TextField label="Специальность" fullWidth />
    <TextField label="Период" fullWidth />
  </Stack>
);

const SkillsForm = () => (
  <Stack spacing={2}>
    <TextField label="Навыки (через запятую)" fullWidth />
  </Stack>
);
const CertificateForm = () => {
  const [images, setImages] = React.useState<File[]>([]);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setImages(Array.from(event.target.files));
    }
  };

  return (
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

      {images.length > 0 && (
        <Box display="flex" flexWrap="wrap" gap={2}>
          {images.map((file, idx) => (
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
  );
};

const AboutForm = () => {
  const [about, setAbout] = React.useState("");

  return (
    <TextField
      label="О себе"
      multiline
      rows={5}
      fullWidth
      value={about}
      onChange={(e) => setAbout(e.target.value)}
      placeholder="Расскажите о себе: навыки, цели, интересы..."
    />
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
      return <Typography>Форма для «{section}» пока не реализована</Typography>;
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

          <Box mt={2} display="flex" gap={2}>
            <Buttons type="SEND" section={item} />
            <Buttons type="DELETE" section={item} />
          </Box>
        </Box>
      ))}
    </Box>
  );
});
