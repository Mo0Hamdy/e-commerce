import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

export default async function ProductDetails({ params }) {
  let Id = (await params).productDetails;
  let response = await fetch("https://dummyjson.com/products", {
    next: { revalidate: 60 },
  });
  if (!response.ok) {
    throw new Error("there's an error!");
  }
  let data = (await response.json()).products;
  let product = data.find((element) => element.id == Id);
  return (
    <div className="py-24 px-2">
      <div className="container m-auto flex flex-col lg:flex-row gap-10 lg:gap-0">
        <aside className="bg-gray-300 lg:w-1/2 rounded-4xl p-14 lg:p-28">
          <img src={product.images[0]} alt={product.title} />
        </aside>
        <aside className="lg:w-1/2 rounded-4xl px-10 lg:ml-10">
          <Accordion className="py-2">
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              <Typography sx={{ fontWeight: "bold" }} component="span">
                Product
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <p>{product.description}</p>
            </AccordionDetails>
          </Accordion>
          <Accordion className="py-2">
            <AccordionSummary
              expandIcon={<ArrowDownwardIcon />}
              aria-controls="panel2-content"
              id="panel2-header"
            >
              <Typography sx={{ fontWeight: "bold" }} component="span">
                Details
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <table className="w-full">
                <tbody>
                  <tr className="grid grid-cols-2 gap-1 pb-2">
                    <td>Price</td>
                    <td>{product.price}</td>
                  </tr>
                  <tr className="grid grid-cols-2 gap-1 pb-2">
                    <td>Brand</td>
                    <td>{product.brand}</td>
                  </tr>
                  <tr className="grid grid-cols-2 gap-1 pb-2">
                    <td>Availability</td>
                    <td>{product.availabilityStatus}</td>
                  </tr>
                  <tr className="grid grid-cols-2 gap-1 pb-2">
                    <td>Minimum order quantity</td>
                    <td>{product.minimumOrderQuantity}</td>
                  </tr>
                  <tr className="grid grid-cols-2 gap-1 pb-2">
                    <td>Warranty Information</td>
                    <td>{product.warrantyInformation}</td>
                  </tr>
                  <tr className="grid grid-cols-2 gap-1 pb-2">
                    <td>QR Code</td>
                    <td>
                      <img src={product.meta.qrCode} alt={product.title} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </AccordionDetails>
          </Accordion>
        </aside>
      </div>
    </div>
  );
}
