'use server'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function saveToken({ response }: { response: any }) {
  const token = response.data.accessToken;
  const cookie = await cookies();
  cookie.set("token", token, {
    path: "/",
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  });
}

export async function getAuthToken () {
  const cookie = await cookies();
  console.log(cookie.get("token"))
  return cookie.get("token")?.value || ""; 
};

export async function deleteToken() {
  const cookie = await cookies();
  cookie.delete("token");
  redirect('/login')
  
}
