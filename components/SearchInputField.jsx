import { useAppDispatch } from "../lib/hooks";
import SearchBox from "./SearchBox";
import { fetchSearchProduct } from "@/lib/features/SearchSlice";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
export default function SearchInputField({ setOpenSearchBox, openSearchBox }) {
  const dispatch = useAppDispatch();
  return (
    <div
      className="fixed lg:relative top-13 md:top-15 lg:top-0 lg:left-0 lg:translate-x-0 left-1/2 -translate-x-1/2 w-[90%] md:w-100 z-50"
    >
      <div className="h-10 lg:h-9 flex items-center text-white lg:text-gray-600 bg-primary lg:bg-white rounded-xl px-2 lg:me-3 py-3 border-gray-500">
        <button className="cursor-pointer">
          <SearchOutlinedIcon style={{ color: "#d1d5dc" }} />
        </button>
        <input
          placeholder="search for products"
          type="text"
          onBlur={() => {
            setOpenSearchBox(false);
          }}
          onFocus={(e) => {
            if (!e.target.value.trim()) {
              setOpenSearchBox(false);
            } else {
              setOpenSearchBox(true);
              dispatch(
                fetchSearchProduct({ productName: e.target.value.trim() }),
              );
            }
          }}
          onChange={(e) => {
            if (!e.target.value.trim()) {
              setOpenSearchBox(false);
            } else {
              setOpenSearchBox(true);
              dispatch(
                fetchSearchProduct({ productName: e.target.value.trim() }),
              );
            }
          }}
          className="placeholder:text-gray-300 outline-0 w-full ps-2"
        />
        {openSearchBox && (
          <div className="absolute top-full left-0 z-50 mt-2 w-full">
            <SearchBox setOpenSearchBox={setOpenSearchBox} />
          </div>
        )}
      </div>
    </div>
  );
}
