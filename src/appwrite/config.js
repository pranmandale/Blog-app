import Conf from "../conf/Conf.js"
import {Client, Databases, Storage, Query, ID} from "appwrite"

export class Service {
    client = new Client()
    databases;
    bucket;

    constructor () {
        this.client
        .setEndpoint(Conf.appWriteUrl)
        .setProject(Conf.appwriteProjectId)

        this.databases = new databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async getPost() {
        try {
           return await this.databases.getDocument(Conf.appwriteDatabaseId, Conf.appwriteCollectionId,slug)
        } catch (error) {
            console.log("appwrite service :: getPost() :: ", getPost());
            return false;
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
           return await this.databases.listDocuments(Conf.appwriteDatabaseId, Conf.appwriteCollectionId,queries)
        } catch (error) {
            console.log("appwrite service :: getPosts() :: ", getPosts());
            return false;
        }
    }

    async createPost({title, slug, content, featuredImage, status, userId}) {
            try {
                return await this.databases.createDocument
                (Conf.appwriteDatabaseId,
                 Conf.appwriteCollectionId,
                 slug, 
                 {
                    title, content, featuredImage, status, userId,
                 }
                )
            } catch (error) {
                console.log("appwrite service :: createPost() :: ", createPost());
            return false;
            }
    }

    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            return await this.databases.updateDocument(
                Conf.appwriteDatabaseId,
                Conf.appwriteCollectionId,
                slug,
                {
                    title, content, featuredImage, status, 
                }
            )
        } catch (error) {
            console.log("appwrite service :: updatePost() :: ", updatePost());
            return false;
        }
    }

    async deletePost(slug) {
        try {
             await this.databases.deleteDocument(
                Conf.appwriteDatabaseId,
                Conf.appwriteCollectionId,
                slug,   
            )
            return true;
        } catch (error) {
            console.log("appwrite service :: deleteDocument() :: ", error);
            return false;
        }
    }

    // storage service
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                Conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("appwrite service :: uploadFile() :: ", error);
            return false;
        }
    }

    async deleteFile(fileID) {
        try {
            return await this.bucket.deleteFile(
                Conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("appwrite service :: deleteFile() :: ", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.bucket.getFilePreview(
            Conf.appwriteBucketId,
            fileId
        ).href
    }
}

const service = new Service()

export default service;






