import bcrypt from "bcrypt";


export async function hashPassword(PlainPassword) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(PlainPassword, saltRounds);
    return hashedPassword;
}

export async function verifyPassword(PlainPassword, hashedPassword) {
    const match = await bcrypt.compare(PlainPassword, hashedPassword);
    return match;    
}

