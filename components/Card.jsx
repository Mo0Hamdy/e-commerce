import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";

const data = [
  {
    icon: DiamondOutlinedIcon,
    title: "Shop what suits you best",
    paragraph:
      "From fashion to electronics, find products designed for your lifestyle.",
  },
  {
    icon: RocketLaunchOutlinedIcon,
    title: "Quick delivery, zero hassle",
    paragraph: "Enjoy fast shipping and smooth checkout every time you shop.",
  },
  {
    icon: AutoAwesomeOutlinedIcon,
    title: "Great quality, better value",
    paragraph: "Premium-looking products without the premium price tag",
  },
];

const cards = data.map((element, index) => {
  return (
    <div
      key={index}
      className="flex flex-col items-center md:items-start md:flex-row text-gray-700 w-2/3 md:w-80 py-7 md:p-0"
    >
      <element.icon style={{ fontSize: "32px", margin: "0 0 10px 5px" }} />
      <div className="text md:ps-5">
        <h3 className="text-xl pb-3 text-black text-center md:text-start">
          {element.title}
        </h3>
        <p className="text-lg text-center md:text-start">{element.paragraph}</p>
      </div>
    </div>
  );
});
export default function Card() {
  return (
    <div className="flex flex-col md:flex-row justify-evenly items-center md:items-start py-20">
      {cards}
    </div>
  );
}
