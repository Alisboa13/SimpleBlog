import { compareSync, hashSync } from "bcrypt";
import { User } from "../models";
import { getConnection } from "typeorm";

const SALT_FACTOR = 10

function Password(pass:string) {
    return hashSync(pass, SALT_FACTOR)
}

function Compare(pass:string, user:User){
    return compareSync(pass, user.password)
}

async function Auth(req: Request, res : Response) {
    if(!req.body['password'] || !req.body['user']){
        return false;
    }
    let username = req.body['user']
    let password = req.body['password']
    let usr = await getConnection().getRepository(User).findOne({user_name: username})
    if (!usr){
        return false
    }
    return Compare(password, usr);
}

export {Password, Compare, Auth}