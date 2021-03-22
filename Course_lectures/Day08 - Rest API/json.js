// The simplest samples of JSON things 
// Create a JSON type mapping kind of object
const bear = {
    name: 'Panda',
    hobbies: ['sneezing', 'singing', 'sleeping']
};

console.log(typeof(bear))
// To convert the json type data to string type
const serializedBear = JSON.stringify(bear);
console.log(typeof(serializedBear));
console.log(serializedBear);

// To convert the string type data to json type
const parse_bear = JSON.parse(serializedBear);
console.log(typeof(parse_bear));
console.log(parse_bear);