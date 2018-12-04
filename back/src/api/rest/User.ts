
async function CreateNewUser(req: Request, res: Response){
    if( !req.body['username'] || !req.body['password'] || !req.body['screenname'] || !req.body['email'])
        return false
    let username = req.body['username']
    if( username.length < 8 )
        return false
    let password = req.body['password']
    if( password.lenght < 6 )
      return false
    let email
    
}
