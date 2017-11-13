console.log('arrow-function')

const add = (a, b) => {
// console.log(arguments); //displays all given arguments
// can pass more than needed
    return a + b;
}

console.log(add(1, 1, 1))


const user = {

    name: 'Einas',
    cities: ['Egypt', 'Canada', 'Libya'],
    printPlacesLived(){
        this.cities.forEach((city) => console.log('City: ' + city));
    }
}

user.printPlacesLived();

const multiplier = {
    numbers: [10, 20, 30],
    multiplyBy: 3,
    multiply(){
        return this.numbers.map((number) => number * this.multiplyBy);
    }
}

console.log(multiplier.multiply())

//------------------------------------------------------
// const square = function(x){
//     return x * x;
// }

// console.log(square())

// // const squareArrow = (x) => {
// //     return x * x;
// // }

// const squareArrow = (x) => x * x;

// console.log(squareArrow(5))

// const getFirstNameLong = (fullName) => {
//     return fullName.split(' ')[0];
// };

// const getFirstName = (fullName) => fullName.split(' ')[0];

//console.log(getFirstName('Einas Madi'));