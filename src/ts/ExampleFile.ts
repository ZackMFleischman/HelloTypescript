
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