'use server'
import { cookies } from "next/headers";
import jwtFilter from "../share/jwtFilter";
import { BusinessError } from "@/model/constants/BusinessError";

export async function getUserInfo(){
    const accessToken = (await cookies()).get('accessToken')?.value
     const cookie = `accessToken=${accessToken}`
     try {
         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getMyDetail`, {
             credentials: "include", 
             headers : {
                 'Content-Type': 'application/json',
                 Cookie: cookie
             },
             next: {tags: ['user']} //1시간마다 재검증

         })
        if(!response.ok){
            jwtFilter(response.status.toString());
        }
 
         const text = await response.text();
 
         if (!text) return null;
         return JSON.parse(text);
     } catch(error) {
        if (error instanceof BusinessError) {
             throw error; // 노출 허용된 오류만 전달
        }
        if (error instanceof Error) {
            throw error;
        }
        throw new Error('알 수 없는 오류가 발생했습니다.');
    }
 }