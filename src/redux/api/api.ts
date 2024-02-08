//Query and  mutation   fom this application

import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const urlShortAPI = createApi({
    reducerPath: 'urlShort',
    baseQuery : fetchBaseQuery({
        baseUrl:'http://localhost:3000/api',
        credentials: 'include'
       
    }),
    endpoints:(builder)=>({

  getUrls: builder.query({query:
    ()=>({
       
      url: 'url',
      method:'GET'
   }),
   
}) ,

getUsers: builder.query({query:
  ()=>({
    
    url: 'user',
    method:'GET'
 }),
 
}) ,
getSearchedUsers: builder.query({query:
    (searchTerm)=>({
       
      url: `users/search/${searchTerm}`,
      method:'GET'
   }),
   
}) ,
     
          
   }),
    
});

export const {
useGetUsersQuery,
useGetUrlsQuery,
useGetSearchedUsersQuery

}=urlShortAPI;

