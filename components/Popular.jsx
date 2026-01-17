async function getBestSelling() {
  const data = await fetch("https://dummyjson.com/products", {
    next: {
      revalidate: 60,
    },
  });
  if (!data.ok) {
    throw new Error("couldn't find any element");
  }
  let response = (await data.json()).products;
  return response.filter((element) => element.rating >= 4.5);
}

export default async function Popular() {
  const products = await getBestSelling();
  console.log(products);
  const data = products.map((element) => {
    return (
      <div key={element.id}>
        <img src={element.images[0]} alt="" />
      </div>
    );
  });

  return <div className="grid grid-cols-2">{data}</div>;
}
      