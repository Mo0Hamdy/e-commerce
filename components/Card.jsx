import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
const data = [
  {
    index:1,
    icon: DiamondOutlinedIcon,
    title: "Shop what suits you best",
    paragraph:
      "From fashion to electronics, find products designed for your lifestyle.",
    color: "#F0FDF4",
    border: "#BAE6FD",
  },

  {
    index: 2,
    icon: RocketLaunchOutlinedIcon,
    title: "Quick delivery, zero hassle",
    paragraph: "Enjoy fast shipping and smooth checkout every time you shop.",
    color: "#F0FDFA",
    border: "#99F6E4",
  },

  {
    index:3,
    icon: AutoAwesomeOutlinedIcon,
    title: "Great quality, better value",
    paragraph: "Premium-looking products without the premium price tag",
    color: "#FFF7ED",
    border: "#FFEDD5",
  },
];

const cards = data.map((element) => {
  return (
    <div
      key={element.index}
      className="rounded-2xl flex flex-col items-center lg:items-start lg:flex-row text-gray-700 p-4 lg:p-7 mx-5 md:mx-0 lg:px-3"
      style={{
        backgroundColor: element.color,
        border: `1px solid ${element.border}`,
      }}
    >
      <element.icon
        className="text-accent-dark"
        style={{ fontSize: "32px" }}
      />
      <div className="lg:ps-5 pt-2 lg:pt-0">
        <h3 className="text-xl lg:text-2xl pb-3 text-black text-center md:text-start">
          {element.title}
        </h3>
        <p className="text-lg lg:text-xl text-center md:text-start">{element.paragraph}</p>
      </div>
    </div>
  );
});
export default function Card() {
  return (
    <div className="container m-auto px-2 gap-6 grid md:grid-cols-3 justify-evenly py-20">
      {cards}
    </div>
  );
}
