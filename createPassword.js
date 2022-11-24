const bcrypt = require('bcrypt');

const plainTextPw = process.argv[2];

async function createPassword(unhashedPassword){
    const saltRounds = 10;

    try {
    const hash = await bcrypt.hash(unhashedPassword, saltRounds);
    console.log(hash);
    } catch (error) {
        console.log(error);
        return false;
    }
}

console.log(plainTextPw);

createPassword(plainTextPw);
