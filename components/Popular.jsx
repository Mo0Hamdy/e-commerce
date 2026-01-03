async function getBestSelling() {
  try {
    const data = await fetch("https://fakestoreapi.com/products", {
      next: {
        revalidate: 60,
      },
    });
    if (!data.ok) return [];
    let response = await data.json();
    return response.filter((element) => {
      return element.category === "jewelery";
    });
  } catch (err) {
    return [];
  }
}

export default async function Popular() {
  const products = await getBestSelling();
  const data = products.map((element, index) => {
    return (
      <div
        key={index}
        // className={`${index == 0 ? "row-span-2" : "bg-teal-300"}`}
      >
        <img src={element.image} alt="" />
      </div>
    );
  });

  if (!data.length) return <div className="py-10">No popular products available.</div>;

  return <div className="grid grid-cols-2">{data}</div>;
}
