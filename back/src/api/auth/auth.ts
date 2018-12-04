import { compareSync, hashSync } from "bcrypt";
import { User } from "../models";

const SALT_FACTOR = 10

function Password(pass:string) {
    return hashSync(pass, SALT_FACTOR)
}

function Compare(pass:string, user:User){
    return compareSync(pass, user.password)
}

export {Password, Compare}