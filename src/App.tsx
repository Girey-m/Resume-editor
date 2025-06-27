import "./App.css";
import { Box } from "@mui/material";
import type { SectionType } from "./interfaces/SectionType";
import AddSectionButton from "./components/AddSectionButton";
import { sectionStore } from "./store/SectionStore";
import { SectionList } from "./components/SectionList";
// import { PublishedSections } from "./components/PublishedSections";

function App() {
  const handleAddSection = (section: SectionType) => {
    console.log("Выбрана секция:", section);
    sectionStore.addSection(section);
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: "20px",
        width: "1200px",
      }}
    >
      <Box>
        <AddSectionButton onSelect={handleAddSection} />
        <SectionList />
      </Box>
      <Box sx={{ flexGrow: "1" }}></Box>
    </Box>
  );
}

export default App;
