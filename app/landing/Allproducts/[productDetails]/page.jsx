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
            <AccordionDetails className="grid grid-cols-2 gap-1">
              <section className="font-bold">
                <h3 className="pb-2">Price</h3>
                <h3 className="pb-2">Brand</h3>
                <h3 className="pb-2">Availability</h3>
                <h3 className="pb-2">Minimum order quantity</h3>
                <h3 className="pb-2">Warranty Information</h3>
                <h3 className="pb-2">QR Code</h3>
              </section>
              <section>
                <p className="pb-2">{product.price}</p>
                <p className="pb-2">{product.brand}</p>
                <p className="pb-2">{product.availabilityStatus}</p>
                <p className="pb-2">{product.minimumOrderQuantity}</p>
                <p className="pb-2">{product.warrantyInformation}</p>
                <img src={product.meta.qrCode} alt={product.title} />
              </section>
            </AccordionDetails>
          </Accordion>
        </aside>
      </div>
    </div>
  );
}
