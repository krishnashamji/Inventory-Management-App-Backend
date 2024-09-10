import bcrypt from 'bcrypt';
const saltRounds = 10;

async function hashPassword(plaintextPassword) {
    const generatedSalt = await bcrypt.genSalt(saltRounds)
    const generatedHash = await bcrypt.hash(plaintextPassword, generatedSalt)
    return generatedHash
}
 
export default hashPassword