import { NextRequest } from "next/server";
import  jwt  from "jsonwebtoken";


export const getDataFromToken = (request : NextRequest) => {
    try{
        const token = request.cookies.get('token')?.value || '';
        const decodedToken:any = jwt.verify(token,process.env.TOKEN_SECRET!) // jwt takes two arguments to verify the token first is the token itself and the second one is the token secret

        //return the decoded token id
        return decodedToken.id;
    }
    
    catch(error:any){
        throw new Error(error.message)
    }
}