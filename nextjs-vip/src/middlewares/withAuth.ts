import { getToken } from "next-auth/jwt";
import {
  NextRequest,
  NextMiddleware,
  NextFetchEvent,
  NextResponse,
} from "next/server";

const onlyAdminPage = ["/dashboard"];

export default function withAuth(
  middleware: NextMiddleware,
  requireAuth: Array<string> = [],
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;

    if (requireAuth.includes(pathname)) {
      const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET,
      });

      if (!token) {
        const url = new URL("/login", req.url);
        url.searchParams.set("callbackUrl", encodeURI(req.url)); //
        return NextResponse.redirect(url);
      }

      if (onlyAdminPage.includes(pathname) && token.role !== "admin") {
        return NextResponse.redirect(new URL("/", req.url));
      }
    }

    return middleware(req, next);
  };
}
