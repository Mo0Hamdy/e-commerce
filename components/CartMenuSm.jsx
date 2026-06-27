import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
export default function CartMenuSm({ cats }) {
  return cats.map((element) => {
    return (
      <Link key={element} href={`/landing/${element}`}>
        <MenuItem disableRipple>{element}</MenuItem>
      </Link>
    );
  });
}
