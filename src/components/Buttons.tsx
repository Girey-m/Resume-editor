import { Button } from "@mui/material";
import { sectionStore } from "../store/SectionStore";
import type { SectionType, PdfSection } from "../interfaces/SectionType";

type ButtonType = "DELETE" | "SEND";

interface ButtonProps {
  btnType: ButtonType;
  section: SectionType;
  pdfSection: PdfSection;
}
interface DeleteButtonProps {
  onDelete: () => void;
}
interface SendButtonProps {
  onSend: () => void;
}
const DeleteButton: React.FC<DeleteButtonProps> = ({ onDelete }) => {
  return <Button onClick={onDelete}>Удалить</Button>;
};

const SendButton: React.FC<SendButtonProps> = ({ onSend }) => {
  return <Button onClick={onSend}>Публиковать</Button>;
};

export const Buttons: React.FC<ButtonProps> = ({
  btnType,
  section,
  pdfSection,
}) => {
  const deleteFunc = (section: SectionType) => {
    sectionStore.removeSection(section);
  };
  const sendFunc = (pdfSection: PdfSection) => {
    sectionStore.addPdfSection(pdfSection);
  };
  return (
    <>
      {btnType === "DELETE" && (
        <DeleteButton onDelete={() => deleteFunc(section)} />
      )}
      {btnType === "SEND" && <SendButton onSend={() => sendFunc(pdfSection)} />}
    </>
  );
};
