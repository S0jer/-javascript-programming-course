
interface IProduct {
  category: string;
  subcategory: string;
  name: string;
  imageURL: string;
  properties: string[];
}

class ProductData {
  name: string;
  productKind: string;
  type: string;
  url: string;
  price: string;
  description: string;
  buyer: string;

  constructor(name: string, productKind: string, type: string, url: string, price: string, description: string, buyer: string) {
      this.name = name;
      this.productKind = productKind;
      this.type = type;
      this.url = url;
      this.price = price;
      this.description = description;
      this.buyer = buyer;
  }
}

let productList: IProduct[] = [];

fetch('/buyer/products')
  .then((response) => response.json())
  .then((data) => {
    productList = data;
    renderProducts(productList);
    addEventListeners();
  });



function createProductElement(product: IProduct): HTMLDivElement {
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


function filterProducts(category: string, subcategory: string): void {
  const filteredProducts = productList.filter(
    (product) => product.category === category && product.subcategory === subcategory
  );
  renderProducts(filteredProducts);
}

function renderProducts(products: IProduct[]): void {
  const productContainer = document.getElementById('productContainer');
  if (productContainer) {
    productContainer.innerHTML = '';

    products.forEach((product) => {
      const productElement = createProductElement(product);
      productContainer.appendChild(productElement);
    });
  } else {
    console.error('Product container not found');
  }
}


function addEventListeners(): void {
  const menuZestawy = document.getElementById("menuZestawy");
  const menuLaptopy = document.getElementById("menuLaptopy");
  const menuMyszki = document.getElementById("menuMyszki");
  const menuKlawiatury = document.getElementById("menuKlawiatury");
  const menuSluchawki = document.getElementById("menuSluchawki");
  const home = document.getElementById("home");
  const demo = document.getElementById("demo");

  if(menuZestawy) menuZestawy.addEventListener("click", () => filterProducts('Komputery', 'Zestawy'));
  if(menuLaptopy) menuLaptopy.addEventListener("click", () => filterProducts('Komputery', 'Laptopy'));
  if(menuMyszki) menuMyszki.addEventListener("click", () => filterProducts('Akcesoria', 'Myszki'));
  if(menuKlawiatury) menuKlawiatury.addEventListener("click", () => filterProducts('Akcesoria', 'Klawiatury'));
  if(menuSluchawki) menuSluchawki.addEventListener("click", () => filterProducts('Akcesoria', 'Sluchawki'));
  if(home) home.addEventListener("click", () => renderProducts(productList));
  
  // Add event listeners to sidebar buttons
  if(demo){
    const demoMenuZestawy = demo.querySelector("#menuZestawy");
    const demoMenuLaptopy = demo.querySelector("#menuLaptopy");
    const demoMenuMyszki = demo.querySelector("#menuMyszki");
    const demoMenuKlawiatury = demo.querySelector("#menuKlawiatury");
    const demoMenuSluchawki = demo.querySelector("#menuSluchawki");
    const demoHome = demo.querySelector("#home");

    if(demoMenuZestawy) demoMenuZestawy.addEventListener("click", () => filterProducts('Komputery', 'Zestawy'));
    if(demoMenuLaptopy) demoMenuLaptopy.addEventListener("click", () => filterProducts('Komputery', 'Laptopy'));
    if(demoMenuMyszki) demoMenuMyszki.addEventListener("click", () => filterProducts('Akcesoria', 'Myszki'));
    if(demoMenuKlawiatury) demoMenuKlawiatury.addEventListener("click", () => filterProducts('Akcesoria', 'Klawiatury'));
    if(demoMenuSluchawki) demoMenuSluchawki.addEventListener("click", () => filterProducts('Akcesoria', 'Sluchawki'));
    if(demoHome) demoHome.addEventListener("click", () => renderProducts(productList));
  }
}



window.addEventListener('load', function() {
  renderProducts(productList);
  addEventListeners();

});


function handleCommand(): void {
  let textArea = document.getElementById("textArea") as HTMLTextAreaElement;
  
  if (!textArea) {
    console.error("textArea not found");
    return;
  }
  
  let input = textArea.value;

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
      let item = sessionStorage.getItem(key);
      if (!item) {
        return false;
      }
      
      return JSON.parse(item).buyer !== "none";
    });

    let price = 0

    soldProducts.forEach(function(product) {
      let item = sessionStorage.getItem(product);
      
      if (!item) {
        return;
      }
      
      let p = JSON.parse(item);
      
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



function createProduct(words: string[]): ProductData {
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
