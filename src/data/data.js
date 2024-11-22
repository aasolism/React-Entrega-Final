const products = [
  {
    id: "lap001",
    name: "Laptop ASUS ZenBook",
    description: "Laptop ultra-ligera y de alto rendimiento para profesionales.",
    price: 799000,
    stock: 5,
    image: "/img/laptop-asus.webp",
    category: "laptops"
  },
  {
    id: "lap002",
    name: "MacBook Air M1",
    description: "Portátil Apple con chip M1 y batería de larga duración.",
    price: 899000,
    stock: 3,
    image: "/img/macbook-air.webp",
    category: "laptops"
  },
  {
    id: "pho001",
    name: "iPhone 13",
    description: "Smartphone Apple con cámara avanzada y gran rendimiento.",
    price: 699000,
    stock: 10,
    image: "/img/iphone-13.webp",
    category: "smartphones"
  },
  {
    id: "pho002",
    name: "Samsung Galaxy S21",
    description: "Smartphone de Samsung con pantalla AMOLED de alta definición.",
    price: 750000,
    stock: 8,
    image: "/img/samsung-s21.webp",
    category: "smartphones"
  },
  {
    id: "tab001",
    name: "iPad Pro 11\"",
    description: "Tableta Apple con pantalla Retina para profesionales creativos.",
    price: 1000000,
    stock: 7,
    image: "/img/ipad-11.jpg",
    category: "tablets"
  },
  {
    id: "tab002",
    name: "Samsung Galaxy Tab S7",
    description: "Tableta de Samsung ideal para trabajo y entretenimiento.",
    price: 650000,
    stock: 6,
    image: "/img/tab-s7.jpg",
    category: "tablets"
  },
  {
    id: "head001",
    name: "Sony WH-1000XM4",
    description: "Audífonos con cancelación de ruido líder en la industria.",
    price: 200000,
    stock: 12,
    image: "/img/sony-a1.webp",
    category: "headphones"
  },
  {
    id: "head002",
    name: "AirPods Pro",
    description: "Audífonos inalámbricos Apple con cancelación de ruido.",
    price: 250000,
    stock: 15,
    image: "/img/airpods.jpeg",
    category: "headphones"
  },
  {
    id: "head003",
    name: "Bose QuietComfort 35 II",
    description: "Audífonos con cancelación de ruido de alta calidad.",
    price: 300.000,
    stock: 10,
    image: "/img/bose-1.jpeg",
    category: "headphones"
  },
]
//Obtener productos
const getProducts = () => {
  return new Promise((resolve, reject) => {
    setTimeout( ()=>{
      resolve(products)
    }, 200 )
  })
}

export { getProducts }