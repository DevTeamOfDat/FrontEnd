export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imgUrl: string;

  constructor(
    id,
    name,
    description = "",
    price = 0,
    imgUrl = "https://salt.tikicdn.com/ts/product/fa/57/2e/7ddf687dbf125653be6259ec9eeefb57.jpg"
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.imgUrl = imgUrl;
  }
}
