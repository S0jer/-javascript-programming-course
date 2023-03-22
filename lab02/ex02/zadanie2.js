"use strict";
var expect = chai.expect;

function sum(x,y) {
    return x+y;
}


function cyfry(napis) {
    let sumOddNumbers = 0;
    let sumEvenNumbers = 0;

    for (let letter of napis) {
        let num = parseInt(letter);
        if(!isNaN(num)) {
            if (num % 2 === 0) { 
                sumEvenNumbers += num;
              } else {
                sumOddNumbers += num;
              }
        }
    }

    return [sumEvenNumbers,sumOddNumbers];
}



function litery(napis) {
    let sumBigNumbers = 0;
    let sumSmallNumbers = 0;

    for (let letter of napis) {
        if (letter.match(/[a-z]/)) { 
            sumSmallNumbers += 1;
        } else if (letter.match(/[A-Z]/)) {
            sumBigNumbers += 1;
        }
    }

    return [sumSmallNumbers,sumBigNumbers];
}


function suma(napis) {
    let sumNumbers = 0;

    if(isNaN(parseInt(napis[0]))) return sumNumbers;
 
    for (let letter of napis) {
        let num = parseInt(letter);
        if (isNaN(num)) return sumNumbers;
        sumNumbers *= 10;
        sumNumbers += num;
    }

    return sumNumbers;
}

function getData() {
    let res = window.prompt("Wczytaj napis");
    let prev = 0;
    while (res != null) {
      console.log(res);
      let r1 = cyfry(res);
      let r2 = litery(res);
      let r3 = prev + suma(res);
      prev = r3;
      console.log("\t" + r1 + "\t" + r2 + "\t" + r3);
      res = window.prompt("Wczytaj napis");
    }
  }


  
describe('The sum() function', function() {
    it('Returns 4 for 2+2', function() {
      expect(sum(2,2)).to.equal(4);
    });
    it('Returns 0 for -2+2', function() {
      expect(sum(-2,2)).to.equal(0);
    });
   });


   
describe('cyfry(), litery(), suma() test on "ONLY DIGITS', function() {
    it('cyfry("1234") = [6,4] -> [1+3,+2+4] ', function () {
        expect(cyfry("1234")).to.deep.equal([6,4]);
      });
      it('litery("1234") = [0,0] -> no letters ', function () {
        expect(litery("1234")).to.deep.equal([0,0]);
      });
      it('suma("1234") = 1234 -> 1234 ', function () {
        expect(suma("1234")).to.equal(1234);
      });
   });


   describe('cyfry(), litery(), suma() test on "ONLY LETTERS"', function () {
    it('cyfry("abcD") = [0,0] -> no digits ', function () {
      expect(cyfry("abcD")).to.deep.equal([0,0]);
    });
    it('litery("abcD") = [3,1] -> 3 small letters 1 capital', function () {
      expect(litery("abcD")).to.deep.equal([3,1]);
    });
    it('suma("abcD") = 0 -> does not start with digit ', function () {
      expect(suma("abcD")).to.equal(0);
    });
  });
  
  describe('cyfry(), litery(), suma() test on "LETTERS THEN NUMBERS"', function () {
    it('cyfry("abcd1234") = [6,4] -> [1+3,+2+4] ', function () {
      expect(cyfry("abcd1234")).to.deep.equal([6,4]);
    });
    it('litery("abcd1234") = [4,0] -> 4 small letters', function () {
      expect(litery("abcd1234")).to.deep.equal([4,0]);
    });
    it('suma("abcd1234") = 0 -> does not start with digit ', function () {
      expect(suma("abcd1234")).to.equal(0);
    });
  });
  
  describe('cyfry(), litery(), suma() test on "DIGITS THEN LETTERS"', function () {
    it('cyfry("1234aBBcdX") = [6,4] -> [1+3,+2+4] ', function () {
      expect(cyfry("1234aBBcdX")).to.deep.equal([6,4]);
    });
    it('litery("1234aBBcdX") = [4,0] -> 3 small letters 3 capital', function () {
      expect(litery("1234aBBcdX")).to.deep.equal([3,3]);
    });
    it('suma("1234aBBcdX") = 1234 -> starts with 1234 ', function () {
      expect(suma("1234aBBcdX")).to.equal(1234);
    });
  });
  
  describe('cyfry(), litery(), suma() test on "EMPTY STRING"', function () {
    it('cyfry("") = [0,0] -> [0,0] ', function () {
      expect(cyfry("")).to.deep.equal([0,0]);
    });
    it('litery("1234abcd") = [0,0] -> [0,0], 0 letters', function () {
      expect(litery("")).to.deep.equal([0,0]);
    });
    it('suma("") = 0 -> nothing to add ', function () {
      expect(suma("")).to.equal(0);
    });
  });