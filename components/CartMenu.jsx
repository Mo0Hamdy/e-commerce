import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Link from "next/link";
export default function CartMenu({ cats }) {
  return cats.map((category) => (
    <ListItemButton
      component={Link}
      key={category}
      href={`/${category}`}
      sx={{
        "&:hover":{backgroundColor:"#00d5be"}}}
    >
      <ListItemText primary={category} />
    </ListItemButton>
  ));
}
