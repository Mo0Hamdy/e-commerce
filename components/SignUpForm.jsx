import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAppDispatch } from "@/lib/hooks";
import { fetchUserRegister } from "@/lib/features/FormSlice";
import { useRouter } from "next/navigation";
import { restore } from "@/lib/features/CartSlice";
export default function SignUpForm({ setSignUp, setSnackbar }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
      const res = await dispatch(fetchUserRegister({ data })).unwrap();
      const result = await res.json();

      if (!res.ok) {
        setSnackbar({
          message: result.message,
          severity: "warning",
          open: true,
        });
        return;
      }
      localStorage.setItem("token", result.token);
      dispatch(restore({ firstName: result.firstName }));
      setSnackbar({
        message: result.message,
        severity: "success",
        open: true,
      });
      setTimeout(() => {
        router.push("/landing");
      }, 3000);
    } catch (error) {
      setSnackbar({
        message: "Network Error",
        severity: "error",
        open: true,
      });
    }
  };
  return (
    <form
      onSubmit={(e) => {
        handleSignUp(e);
      }}
      className="flex flex-col bg-stone-100 items-center py-10 px-5 shadow-gray-500 shadow-lg rounded-xl"
    >
      <AccountCircleIcon
        sx={{
          width: "100px",
          height: "100px",
          color: "gray",
        }}
      />
      <input
        required
        type="text"
        name="firstName"
        placeholder="first name"
        className="border border-lime-500 p-1 rounded-md my-3 w-72 outline-0"
      />
      <input
        required
        type="text"
        name="lastName"
        placeholder="last name"
        className="border border-lime-500 p-1 rounded-md my-3 w-72 outline-0"
      />
      <input
        required
        type="email"
        name="userName"
        className="border border-lime-500 p-1 rounded-md my-3 w-72 outline-0"
        placeholder="email"
      />
      <input
        required
        type="password"
        name="password"
        className="border border-lime-500 p-1 rounded-md my-3 w-72 outline-0"
        placeholder="password"
      />
      <button
        type="submit"
        className="cursor-pointer bg-accent rounded-md p-2 my-3 hover:scale-110 transition-all duration-300 text-white"
      >
        Sign up
      </button>
      <p>
        Already have an account?{" "}
        <span
          className="text-accent-dark cursor-pointer"
          onClick={() => {
            setSignUp(false);
          }}
        >
          sign in
        </span>
      </p>
    </form>
  );
}
