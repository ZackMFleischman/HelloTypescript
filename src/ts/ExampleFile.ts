// Intro to Generic Types

const x: Array<number> = [];
x.push(0);
// x.push("a_string"); // Doesn't work. Compiler yells at you because "a_string" is not a number


// THESE ARE THE SAME THING
const y: number[] = [0, 5, 55, 100, 567];
const z: Array<number> = [0, 5, 55, 100, 567];

// These are also the same thing
const stringArray1: string[] = ["abc", "def"];
const stringArray2: Array<string> = ["abc", "def"];


// Generic Type Declared
class MyClass<T> { // 'T' can be anything. It's just a variable name for this type, but 'T' is most commonly used.
    myVariable: T;

    constructor(variableValue: T) {
        this.myVariable = variableValue;
    }
}

// Here we are using it with T === string
const stringStorer: MyClass<string> = new MyClass<string>("myString");
const stringVariable: string = stringStorer.myVariable; // "myString"

// Here we are using it with T === number
const numberStorer: MyClass<number> = new MyClass<number>(19);
const numberVariable: number = numberStorer.myVariable; // 19


// Another example where we are basically wrapping a "generic list" of type "T"
class MyArray<T> {
    arrayValue: T[] = [];
}

const myArrayInstance: MyArray<number> = new MyArray<number>(); // Here we use a number for T
myArrayInstance.arrayValue.push(0);
// class MyArray<number> {
//     arrayValue: number[] = [];
// }

const myArrayInstance2: MyArray<string> = new MyArray<string>(); // Here we use a string for T
myArrayInstance2.arrayValue.push("hello");
// class MyArray<string> {
//     arrayValue: string[] = [];
// }


// You can use more than one type too. Here we are using two different types.
class MyClass2<T, K> {
    myVariable: T;
    myVariable2: K

    constructor(variableValue: T, secondVariable: K) {
        this.myVariable = variableValue;
        this.myVariable2 = secondVariable;
    }
}
const myClass2Instance: MyClass2<number, string> = new MyClass2<number, string>(44, "hello");


// Here we show off the built in Map class, which takes 2 type parameters
// (Map calls them K and V, e.g. Map<K, V>, for Key and Value)
const nameToAgeMap = new Map<string, number>(); // K === string, and V === number
nameToAgeMap.set("Zack", 32); // "Zack" is the key, "32" is the value
const zacksAge: number | undefined = nameToAgeMap.get("Zack"); // 32

nameToAgeMap.set("Dee", 51);
const deesAge: number | undefined = nameToAgeMap.get("Dee"); // 32

const yulsAge: number | undefined = nameToAgeMap.get("Yul"); // undefined, We haven't set Yul yet in the Map
nameToAgeMap.set("Yul", 18);
const yulsRealAge: number | undefined = nameToAgeMap.get("Yul"); // 18


// We can use a map in a more practical use case where we map an ID (like a row id in a database)
// To a Person object we define in an interface.
interface Person {
    name: string;
    age: number;
    numberOfKids: number;
    momsMaidenName: string;
}

const idToPersonMap = new Map<number, Person>();
idToPersonMap.set(55, {
    name: "Zack",
    age: 32,
    numberOfKids: 0,
    momsMaidenName: "wouldn't you like to know"
});

const person55sData: Person = idToPersonMap.get(55)!; // The ! here means, "Hey Compiler, I'm positive this isn't 'undefined'"
console.log(person55sData.name + "'s age is " + person55sData.age); // "Zack's age is 32"



























// Interface definition
interface IExampleInterface {
    title: string;
    usersname: string;
}

// Defining untyped variable
let userData;

// Assigning untyped variable to a Plain Old Javascript Object (POJO)
userData = [
    {
        title: "Title1",
        usersname: "Dee",
    },
    {
        title: "Title2",
        usersname: "Zack",
    }
];

// 2 different ways to cast to a variable of type "IExampleInterface Array"
const typedUserData: IExampleInterface[] = userData as IExampleInterface[];
const typedUserData2: IExampleInterface[] = <IExampleInterface[]>userData;

/*  YAML Representation of the above data
"userData:
  - title: Title1
    usersname: Dee    
  - title: Title2
    usersname: Zack"
*/
// You could pass the above YAML as a string into the `yamlJS.safeLoad` function
// to create a POJO (plain old javascript object)
// e.g.: const userData = yamlJS.safeLoad(yamlString);

// Function Definition that takes an IExampleInterface object as a paramater.
function printExampleInterface(data: IExampleInterface) {
    console.log("Example Interface:");
    console.log(data.title);
    console.log(data.usersname);
}

const data = {
    title: "This is the title",
    usersname: "Zack",
    age: 31 // This is legal right now, as we are assigning this to an untyped variable.
};
// This function expects an IExampleInterface as a parameter, which means we need
// `data` to AT LEAST have the fields "title" and "usersname". It can have more than that
// if its stored in a variable.
printExampleInterface(data);

// If you pass the object literal directly, it will yell at you if you
// don't pass EXACTLY the IExampleInterface.
printExampleInterface({ // Called Twice
    title: "This is the title",
    usersname: "Dee",
    // age: 31     // <--- uncommenting this would result in a compiler error
});
