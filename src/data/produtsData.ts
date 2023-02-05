export interface IProductsData {
  id: number;
  name: string;
  description: string;
  image: string;
}

export const productsData: IProductsData[] = [
  //   {
  //     id: 1,
  //     name: "Product 1",
  //     description: `1Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
  //         iure quidem fuga magnam molestias placeat quisquam itaque vitae
  //         minus tenetur, unde possimus sapiente vel cumque rerum quae ea iusto
  //         impedit. Lorem ipsum dolor sit amet consectetur adipisicing elit.
  //         Nobis, harum. Ea sunt nemo corrupti repellendus, quidem officiis
  //         placeat nam, commodi libero obcaecati totam at ipsa cupiditate
  //         soluta numquam mollitia quos.`,
  //     image: "../assets/img/products/product-5.jpg",
  //   },
  //   {
  //     id: 2,
  //     name: "Product 2",
  //     description: `1Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
  //         iure quidem fuga magnam molestias placeat quisquam itaque vitae
  //         minus tenetur, unde possimus sapiente vel cumque rerum quae ea iusto
  //         impedit. Lorem ipsum dolor sit amet consectetur adipisicing elit.
  //         Nobis, harum. Ea sunt nemo corrupti repellendus, quidem officiis
  //         placeat nam, commodi libero obcaecati totam at ipsa cupiditate
  //         soluta numquam mollitia quos.`,
  //     image: "../assets/img/products/product-1.jpg",
  //   },
  {
    id: 3,
    name: "Product 3",
    description: `1Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
        iure quidem fuga magnam molestias placeat quisquam itaque vitae
        minus tenetur, unde possimus sapiente vel cumque rerum quae ea iusto
        impedit. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Nobis, harum. Ea sunt nemo corrupti repellendus, quidem officiis
        placeat nam, commodi libero obcaecati totam at ipsa cupiditate
        soluta numquam mollitia quos.`,
    image:
      "https://fishmart.com.bd/wp-content/uploads/2019/09/Bele-Medium-1kg-750tk-copy.jpg",
  },
  {
    id: 4,
    name: "Product 4",
    description: `1Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
        iure quidem fuga magnam molestias placeat quisquam itaque vitae
        minus tenetur, unde possimus sapiente vel cumque rerum quae ea iusto
        impedit. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Nobis, harum. Ea sunt nemo corrupti repellendus, quidem officiis
        placeat nam, commodi libero obcaecati totam at ipsa cupiditate
        soluta numquam mollitia quos.`,
    image:
      "https://fishmart.com.bd/wp-content/uploads/2019/10/Deshi-Katol-1.5kg-2kg-450tk-per-kg-1-600x582.jpg",
  },
  {
    id: 5,
    name: "Product 5",
    description: `1Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque
          iure quidem fuga magnam molestias placeat quisquam itaque vitae
          minus tenetur, unde possimus sapiente vel cumque rerum quae ea iusto
          impedit. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Nobis, harum. Ea sunt nemo corrupti repellendus, quidem officiis
          placeat nam, commodi libero obcaecati totam at ipsa cupiditate
          soluta numquam mollitia quos.`,
    image:
      "https://images.pexels.com/photos/3731945/pexels-photo-3731945.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=256&w=256",
  },
];

export const productsCategoryData = [
  {
    id: 1,
    name: "Chilian Seabass",
    image: require("../assets/img/productCategory/Seabass-1.jpg"),
  },
  {
    id: 2,
    name: "Fish",
    image: require("../assets/img/productCategory/Fish-2.jpg"),
  },
  {
    id: 3,
    name: "Fish",
    image: require("../assets/img/productCategory/Fish-3.jpg"),
  },
  {
    id: 4,
    name: "Fish",
    image: require("../assets/img/productCategory/Fish-4.jpg"),
  },
  {
    id: 5,
    name: "Fish",
    image: require("../assets/img/productCategory/Fish-5.jpg"),
  },
];
