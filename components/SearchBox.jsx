import Link from "next/link";
export default function SearchBox({ searchedProducts }) {
  console.log(searchedProducts);
  const products = searchedProducts.map((element) => {
    return (
      <Link key={element.id} href={`/Allproducts/${element.id}`} className="flex items-center justify-between px-3" >
        <img className="w-20 h-20" src={element.images[0]} alt="" />
        <h3>{element.title}</h3>
      </Link>
    );
  });
  return (
      <div className="bg-teal-200 w-1/3 m-auto">
      <ul>{products}</ul>{" "}
    </div>
  );
}
