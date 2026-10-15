let numerosYLetras = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()_+-=[]{}|;:,.<>?";

let contraseña = "";

for(let i = 0; i < 128; i++) {
    contraseña += numerosYLetras.charAt(parseInt(Math.random() * numerosYLetras.length));
}

console.log(contraseña);
