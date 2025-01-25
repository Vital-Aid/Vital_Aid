import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


const isAdminRoute=(route:string)=>{
    
    route.startsWith('/admin')&&route !=='/login'
}

const isuserProtectedRoute=(route:string)=>{
    route.startsWith('/user') &&route !=='/login'
}

const isDoctorProtectedRoute=(route:string)=>{
    route.startsWith('/doctor') &&route !=='/login'
}

export function middleware(req:NextRequest){
    const userType=req.cookies.get('user')?.value
    const url=req.nextUrl.clone()
    const pathName=url.pathname

    if(userType !=='admin'&&isAdminRoute(pathName)){
        url.pathname('/404')
        return NextResponse.redirect(url)
    }
}