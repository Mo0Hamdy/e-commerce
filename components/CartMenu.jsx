import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Link from "next/link";
export default function CartMenu({ cats }) {
  return cats.map((category) => (
    <ListItemButton
      component={Link}
      key={category}
      href={`/landing/${category}`}
    >
      <ListItemText primary={category} />
    </ListItemButton>
  ));
}
