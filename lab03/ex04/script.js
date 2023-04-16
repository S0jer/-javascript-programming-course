let textArea = document.getElementById("textArea");


class ProductData {
    constructor(name, productKind, type, url, price, description, buyer) {
        this.name = name;
        this.productKind = productKind;
        this.type = type;
        this.url = url;
        this.price = price;
        this.description = description;
        this.buyer = buyer;
    }
}


const productList = [
    {
      id: 1,
      name: "Zestaw komputerowy 1",
      category: "Komputery",
      subcategory: "Zestawy",
      imageURL: "https://image.shutterstock.com/image-photo/modern-desktop-computer-wireless-keyboard-260nw-55573504.jpg",
      properties: ["karta graficzna", "plyta glowna", "procesor", "pamiec ram"],
    },
    {
        id: 2,
        name: "Zestaw komputerowy 1",
        category: "Komputery",
        subcategory: "Zestawy",
        imageURL: "https://image.shutterstock.com/image-photo/modern-desktop-computer-wireless-keyboard-260nw-55573504.jpg",
        properties: ["karta graficzna", "plyta glowna", "procesor", "pamiec ram"],
      },
    {
      id: 3,
      name: "Słuchawki",
      category: "Akcesoria",
      subcategory: "Sluchawki",
      imageURL: "https://www.shutterstock.com/image-photo/wireless-…ear-headphones-black-leather-260nw-1199089237.jpg",
      properties: [],
    },
    {
        id: 4,
        name: "Mysz",
        category: "Akcesoria",
        subcategory: "Myszki",
        imageURL: "https://www.pngall.com/wp-content/uploads/2016/04/PC-Mouse-Free-Download-PNG.png",
        properties: [],
      },
      {
        id: 5,
        name: "Mysz",
        category: "Akcesoria",
        subcategory: "Myszki",
        imageURL: "https://www.pngall.com/wp-content/uploads/2016/04/PC-Mouse-Free-Download-PNG.png",
        properties: [],
      },
      {
        id: 6,
        name: "Słuchawki",
        category: "Akcesoria",
        subcategory: "Sluchawki",
        imageURL: "https://www.shutterstock.com/image-photo/wireless-…ear-headphones-black-leather-260nw-1199089237.jpg",
        properties: [],
      },
  ];


// let db = {
//     product1: { name: "Komputer", productKind: "Komputer", type: "zestaw", url: "https://image.shutterstock.com/image-photo/modern-desktop-computer-wireless-keyboard-260nw-55573504.jpg", price: "4999", description: "Super produkt!", buyer: "Two" },
//     product2: { name: "Laptop", productKind: "Laptop", type: "zestaw", url: "https://image.shutterstock.com/image-photo/modern-laptop-computer-260nw-515227941.jpg", price: "2999", description: "Wygodny laptop!", buyer: "One" }
//   };
  
// sessionStorage.setItem("localDb", JSON.stringify(db));


function createProductElement(product) {
  const productWrapper = document.createElement('div');
  productWrapper.classList.add('w3-border', 'animation', 'object-wrapper', 'w3-col', 'w3-half', 'w3-center');

  const productImage = document.createElement('img');
  productImage.src = product.imageURL;
  productImage.alt = product.category === 'Komputery' ? 'Zdjęcie komputera.' : 'Zdjęcie myszy.';
  productImage.classList.add(product.category === 'Komputery' ? 'bigger' : 'mouse-img');
  productWrapper.appendChild(productImage);

  const productTitle = document.createElement('h3');
  productTitle.innerText = product.name;
  productWrapper.appendChild(productTitle);

  if (product.properties.length > 0) {
    const productProperties = document.createElement('ul');
    product.properties.forEach(property => {
      const propertyItem = document.createElement('li');
      propertyItem.innerText = property;
      productProperties.appendChild(propertyItem);
    });
    productWrapper.appendChild(productProperties);
  }

  return productWrapper;
}


function filterProducts(category, subcategory) {
  const filteredProducts = productList.filter(
    (product) => product.category === category && product.subcategory === subcategory
  );
  renderProducts(filteredProducts);
}


function renderProducts(products) {
  const productContainer = document.getElementById('productContainer');
  productContainer.innerHTML = '';

  products.forEach((product) => {
    const productElement = createProductElement(product);
    productContainer.appendChild(productElement);
  });
}


function addEventListeners() {
  document.getElementById("menuZestawy").addEventListener("click", () => filterProducts('Komputery', 'Zestawy'));
  document.getElementById("menuLaptopy").addEventListener("click", () => filterProducts('Komputery', 'Laptopy'));
  document.getElementById("menuZestawy").addEventListener("click", () => filterProducts('Komputery', 'Zestawy'));
  document.getElementById("menuMyszki").addEventListener("click", () => filterProducts('Akcesoria', 'Myszki'));
  document.getElementById("menuKlawiatury").addEventListener("click", () => filterProducts('Akcesoria', 'Klawiatury'));
  document.getElementById("menuSluchawki").addEventListener("click", () => filterProducts('Akcesoria', 'Sluchawki'));
  document.getElementById("home").addEventListener("click", () =>   renderProducts(productList));

  
  // Add event listeners to sidebar buttons
  document.getElementById("demo").querySelector("#menuZestawy").addEventListener("click", () => filterProducts('Komputery', 'Zestawy'));
  document.getElementById("demo").querySelector("#menuLaptopy").addEventListener("click", () => filterProducts('Komputery', 'Laptopy'));
  document.getElementById("demo").querySelector("#menuMyszki").addEventListener("click", () => filterProducts('Akcesoria', 'Myszki'));
  document.getElementById("demo").querySelector("#menuKlawiatury").addEventListener("click", () => filterProducts('Akcesoria', 'Klawiatury'));
  document.getElementById("demo").querySelector("#menuSluchawki").addEventListener("click", () => filterProducts('Akcesoria', 'Sluchawki'));
  document.getElementById("demo").querySelector("#home").addEventListener("click", () =>   renderProducts(productList));
}


window.addEventListener('load', function() {
  renderProducts(productList);
  addEventListeners();

});


function handleCommand() {
  let input = document.getElementById("textArea").value;

  let words = input.split("\n");

  let command = words[0];

  if (command === "add") {
      let newProduct = createProduct(words);
      let productName = newProduct.name;

      sessionStorage.setItem(productName, JSON.stringify(newProduct));
      console.log("Product added to sessionStorage:", productName);
  } else if (command === "sell") {
      let newProduct = createProduct(words);
      let productName = newProduct.name;
      let personName = newProduct.buyer;

      sessionStorage.setItem(productName, JSON.stringify(newProduct));
      console.log("Product sold to:", personName);
  } else if (command === "info") {
      let keys = Object.keys(sessionStorage);

      let soldProducts = keys.filter(function(key) {
      return JSON.parse(sessionStorage.getItem(key)).buyer !== "none";
      });
      let price = 0

      soldProducts.forEach(function(product) {
      let p = JSON.parse(sessionStorage.getItem(product));
      if (p.name != undefined){
          price += parseInt(p.price);
          console.log("Product: " + p.name + ", Sold to: " + p.buyer);
      } 
      });
      console.log("Sum: " + price);
  } else {
      console.log("Invalid command");
  }
}


function createProduct(words) {
  let defaultProduct = ["empty", "Komputer", "Komputer", "zestaw", "https://image.shutterstock.com/image-photo/modern-desktop-computer-wireless-keyboard-260nw-55573504.jpg", "4999", "Super produkt!", "none"];
  let defaultProductSell = ["empty", "Komputer", "Komputer", "zestaw", "https://image.shutterstock.com/image-photo/modern-desktop-computer-wireless-keyboard-260nw-55573504.jpg", "4999", "Super produkt!", "Tomasz N"];

  let wordsLength = words.length;

  if (wordsLength <= 8) {
      for (let i = wordsLength; i <= 8; i++) {
          if (words[0] === "add") {
              words.push(defaultProduct[i]);
          } else {
          words.push(defaultProductSell[i]);
          }
      }
  }

  return new ProductData(words[1], words[2], words[3], words[4], words[5], words[6], words[7]);
}
