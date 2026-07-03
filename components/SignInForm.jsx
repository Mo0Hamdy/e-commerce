import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAppDispatch } from "@/lib/hooks";
import { restore } from "@/lib/features/CartSlice";
import { useRouter } from "next/navigation";
export default function SignInForm({ setSnackbar }) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
      const res = await fetch(
        "https://e-commerce-backend-nine-olive.vercel.app/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.userName,
            password: data.password,
          }),
        },
      );
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
      }, 2000);
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
        handleSignIn(e);
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
        className="cursor-pointer bg-accent rounded-md p-2 mt-3 hover:scale-110 transition-all duration-300"
      >
        Sign in
      </button>
    </form>
  );
}
