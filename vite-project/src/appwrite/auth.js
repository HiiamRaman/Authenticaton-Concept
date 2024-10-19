import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";
export class Authservice {
   client =  new Client(); 
   account;
   constructor(){
    this.client  //client banako
    .setEndpoint('conf.appwriteURL') // Your API Endpoint
    .setProject('conf.appwriteProjectID');                 // Your project ID
   this.account = new Account(this.client);   //account banyo
   }

async createAccount ({email,password,name}) {
    try {
        const userAccount = await this.account.create(ID.unique(), email, password,name );
        //Check gareko if userAccount create vaisakyo ?
        if (userAccount) {
            //yesari banauchau ki account create huna bitti kai login hunae gari
           return this.login({email,password})

        } else {
            return userAccount;
            
        }

    } catch (error) {
        throw error;
        
    }
}
async login({email,password}){
    try {
        return await this.account.createEmailPasswordSession(email,password);
    } catch (error) {
        throw error;
        
    }
}
  
async getCurrentUser(){
    try {
       return await this.account.get();
    } catch (error) {
       console.log("Appwrite service::getCurrentUser::error ",error);
        
    }
    return null;
    
}

async logout(){
    try {
        await this.account.deleteSessions();
    } catch (error) {
        // throw error;
        console.log("Appwrite service::logout::error ",error);
    }
}

}


const authservice = new Authservice();





export default authservice;
