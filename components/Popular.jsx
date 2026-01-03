async function getBestSelling() {
  const data = await fetch("https://fakestoreapi.com/products", {
    next: {
      revalidate: 60,
    },
  });
  if (!data.ok) {
    throw new Error("couldn't find any element")
  }
  let response = await data.json();
    return response.filter((element) => {
     return element.category === "jewelery"
  });
}

export default async function Popular() {
  const products = await getBestSelling();
  const data = products.map((element, index) => {
    return (
      <div key={index}>
        <img src={element.image} alt="" />
      </div>
    );
  });

  return <div className="grid grid-cols-2">{data}</div>;
}
