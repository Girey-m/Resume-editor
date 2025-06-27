import { Button } from "@mui/material";
import { sectionStore } from "../store/SectionStore";
import type { SectionType } from "../interfaces/SectionType";

type ButtonType = "DELETE" | "SEND";

interface ButtonProps {
  type: ButtonType;
  section: SectionType;
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

export const Buttons: React.FC<ButtonProps> = ({ type, section }) => {
  const deleteFunc = (section: SectionType) => {
    sectionStore.removeSection(section);
  };
  const sendFunc = (section: SectionType) => {
    console.log(section);
  };
  return (
    <>
      {type === "DELETE" && (
        <DeleteButton onDelete={() => deleteFunc(section)} />
      )}
      {type === "SEND" && <SendButton onSend={() => sendFunc(section)} />}
    </>
  );
};
