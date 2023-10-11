import { serverURL } from "./serverURL";
import { commomAPI } from "./commonApi";

// upload a video
export const uploadVideo = async (reqBody)=>{
    // make a post http request to http://localhost:4000/video to add video in json server and return response to add component
    return await commomAPI("POST",`${serverURL}/video`,reqBody)
} 

// get allvdeos from json server
export const getAllVideo = async ()=>{
    // make a get http request to http://localhost:4000/video to get all video from json server and return response to View component
    return await commomAPI("GET",`${serverURL}/video`,"")
} 

// get allvdeos from json server
export const getAVideo = async (id)=>{
    // make a get http request to http://localhost:4000/video to get a video from json server and return response to VideoCard component
    return await commomAPI("GET",`${serverURL}/video/${id}`,"")
} 
// get allvdeos from json server
export const deleteAVideo = async (id)=>{
    // make a get http request to http://localhost:4000/video to get a video from json server and return response to VideoCard component
    return await commomAPI("DELETE",`${serverURL}/video/${id}`,{})
} 
// store Watching history to json server
export const addToHistory = async (videoDetails)=>{
    // make a post http request to http://localhost:4000/history to POST video history form json server and return response to videoCard component
    return await commomAPI("POST",`${serverURL}/history`,videoDetails)
} 

// get all waching video history form json server
export const getAllHistory = async ()=>{
    // make a post http request to http://localhost:4000/history to grt video history form json server and return response to watch History component
    return await commomAPI("GET",`${serverURL}/history`,"")
} 
// add Category
export const addCategory = async (reqBody)=>{
    // make a post http request to http://localhost:4000/categories to add video in json server and return response to categories component
    return await commomAPI("POST",`${serverURL}/categories`,reqBody)
} 

// getAllCategory
export const getAllCategory = async ()=>{
    // make a get http request to http://localhost:4000/categories to get all video from json server and return response to categories component
    return await commomAPI("GET",`${serverURL}/categories`,"")
} 


// get allvdeos from json server
export const deleteCategory = async (id)=>{
    // make a get http request to http://localhost:4000/categories to get a video from json server and return response to categories component
    return await commomAPI("DELETE",`${serverURL}/categories/${id}`,{})
} 