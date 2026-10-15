let array = [];

for(let i = 0; i < 36000; i++) {
    array[i] = ((parseInt(Math.random() * 6)) + 1) + ((parseInt(Math.random() * 6)) + 1);
}

console.log(array);
