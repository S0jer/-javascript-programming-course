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


// let db = {
//     product1: { name: "Komputer", productKind: "Komputer", type: "zestaw", url: "https://image.shutterstock.com/image-photo/modern-desktop-computer-wireless-keyboard-260nw-55573504.jpg", price: "4999", description: "Super produkt!", buyer: "Two" },
//     product2: { name: "Laptop", productKind: "Laptop", type: "zestaw", url: "https://image.shutterstock.com/image-photo/modern-laptop-computer-260nw-515227941.jpg", price: "2999", description: "Wygodny laptop!", buyer: "One" }
//   };
  
// sessionStorage.setItem("localDb", JSON.stringify(db));


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

