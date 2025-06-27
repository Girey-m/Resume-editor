// import { observer } from "mobx-react-lite";
// import { formStore } from "../store/FormStore";
// import { Box, Typography, List, ListItem, Divider } from "@mui/material";

// export const PublishedSections = observer(() => {
//   const { experience, education, skills, certificates, about } = formStore;

//   return (
//     <Box mt={4} p={2} border="1px solid #999" borderRadius={2}>
//       <Typography variant="h5" gutterBottom>
//         Опубликованное содержимое
//       </Typography>

//       {/* Опыт */}
//       <Typography variant="h6">Опыт</Typography>
//       <List>
//         <ListItem>Должность: {experience.doljnost}</ListItem>
//         <ListItem>Компания: {experience.company}</ListItem>
//         <ListItem>Период: {experience.time}</ListItem>
//         <ListItem>Описание: {experience.description}</ListItem>
//       </List>
//       <Divider sx={{ my: 2 }} />

//       {/* Образование */}
//       <Typography variant="h6">Образование</Typography>
//       <List>
//         <ListItem>Учебное заведение: {education.educational}</ListItem>
//         <ListItem>Специальность: {education.specials}</ListItem>
//         <ListItem>Период: {education.time}</ListItem>
//       </List>
//       <Divider sx={{ my: 2 }} />

//       {/* Навыки */}
//       <Typography variant="h6">Навыки</Typography>
//       <Typography>{skills}</Typography>
//       <Divider sx={{ my: 2 }} />

//       {/* Сертификаты */}
//       <Typography variant="h6">Сертификаты</Typography>
//       <Box display="flex" gap={2} flexWrap="wrap">
//         {certificates.map((file, idx) => (
//           <img
//             key={idx}
//             src={URL.createObjectURL(file)}
//             alt={`cert-${idx}`}
//             width={100}
//             height={100}
//             style={{ objectFit: "cover", borderRadius: 8 }}
//           />
//         ))}
//       </Box>
//       <Divider sx={{ my: 2 }} />

//       {/* О себе */}
//       <Typography variant="h6">О себе</Typography>
//       <Typography>{about}</Typography>
//     </Box>
//   );
// });
