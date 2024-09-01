import { withAuth, NextRequestWithAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(request) {
        console.log(request.nextUrl.pathname)
        console.log(request.nextauth.token)

        if (request.nextUrl.pathname.startsWith("/extra")
            && request.nextauth.token?.isAdmin != true) {
            return NextResponse.rewrite(
                new URL("/denied", request.url)
            )
        }
        if (request.nextUrl.pathname.startsWith("/dashboard")
            && request.nextauth.token?.isStaff != true) {
            return NextResponse.rewrite(
                new URL("/denied", request.url)
            )
        }

    }, {
    callbacks: {
        authorized: ({ token }) => !!token
    },
}

)

export const config = { matcher: ["/extra", "/dashboard"] }