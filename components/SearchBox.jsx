import Link from "next/link";
import SearchOffOutlinedIcon from "@mui/icons-material/SearchOffOutlined";
import { useAppSelector } from "../lib/hooks";
import Skeleton from '@mui/material/Skeleton';
export default function SearchBox({ setOpenSearchBox }) {
  const { isSearchLoading, searchProducts } = useAppSelector(
    (state) => state.search,
  );
  const products = searchProducts.map((element) => {
    return (
      <Link
        key={element.id}
        onClick={() => {
          setOpenSearchBox(false);
        }}
        href={`/Allproducts/${element.id}`}
        className="items-center justify-between px-3 my-2 h-16 overflow-hidden bg-white mb-2 last:mb-0 rounded-lg flex cursor-pointer hover:bg-gray-100 transition"
      >
        <h3 className="text-md">{element.title}</h3>
        <img className="w-16 h-16" src={element.images[0]} alt="" />
      </Link>
    );
  });
  return (
    <div className="bg-cyan-100 p-2 rounded-xl shadow-lg max-h-100 overflow-y-auto">
      {isSearchLoading ? (
        <Skeleton animation="wave" />
      ) : searchProducts.length > 0 ? (
        <ul>{products}</ul>
      ) : (
        <div className="flex flex-col items-center justify-center py-6 text-gray-500">
          <SearchOffOutlinedIcon sx={{ fontSize: 50 }} />
          <p className="mt-2 capitalize">no results found</p>
        </div>
      )}
    </div>
  );
}
