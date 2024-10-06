import conf from "../conf.js";
import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client //client banako
      .setEndpoint("conf.appwriteURL") // Your API Endpoint
      .setProject("conf.appwriteProjectID"); // Your project ID
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImages, status, userID }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImages,
          status,
          userID,
        }
      );
    } catch (error) {
      console.log("APP WRITE service :: Create post ERROR", error);
    }
  }
  async updatePost(slug, { title, content, featuredImages, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug,
        {
          title,
          content,
          featuredImages,
          status,
        }
      );
    } catch (error) {
      console.log("APP WRITE service :: updatePost ERROR", error);
    }
  }

  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseID,
        conf.appwriteCollectionID,
        slug
      );
      return true;
    } catch (error) {
      console.log("APPWRITE DELETE POST ERROR", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseID, // databaseId
        conf.appwriteCollectionID, // collectionId
        slug // documentId
      );
    } catch (error) {
      console.log("APPWRITE DELETE GETPOST ERROR", error);
      return false;
    }
  }
  async getPost(
    queries = Query.equal("status", ["Active"]) //yesma chai document lai selectgarera search, garna milnae banako search garda
  ) {
    try {
        return await this.databasesdatabases.listDocuments(
            conf.appwriteDatabaseID, // databaseId
            conf.appwriteCollectionID // collectionId
            [
                queries
            ]
          );
    } catch (error) {
        console.log("APPWRITE DELETE GETPOSTs ERROR", error);
        return false;
    }
  }

  //File upload services 
  async uploadFile(file){
    try {
    return await this.bucket.createFile(
        conf.appwriteBucketID,
        ID.unique(),
        file
    )
    } catch (error) {
        console.log("APPWRITE UPLOAD ERROR", error);
        return false;
    }

  }
  async deleteFile(fileId){
    try {
        await this.bucket.deleteFile(
            conf.appwriteBucketID,
            fileId
        )
        return true
    } catch (error) {
        console.log("APPWRITE DELETE ERROR", error);
        return false
    }
  }
  async getFilePreview(fileID){
    return this.bucket.getFilePreview
    ( conf.appwriteBucketID,
      fileID);
  }
  async downloadFile(fileID){
    return this.bucket.getFileDownload(
      conf.appwriteBucketID,
       fileID);

  }
}

const service = new Service();

export default service;
