import React from "react";
import Link from "next/link";
import { deleteToken } from "@/commons/token";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-blue-600 text-white flex flex-col justify-between">
        <div>
          <div className="p-6 text-xl font-semibold">Dashboard</div>
          <nav className="flex flex-col space-y-2 px-4">
            <Link
              href="/admin"
              className="block py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Admin
            </Link>
            <Link
              href="/employees"
              className="block py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Karyawan
            </Link>
            <Link
              href="/leave-requests"
              className="block py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Pengajuan Cuti
            </Link>
          </nav>
        </div>
        <div className="p-4">
          <button
            className="w-full py-2 px-4 bg-red-500 text-white rounded hover:bg-red-600 transition"
            onClick={deleteToken}
          >
            Logout
          </button>
        </div>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default Layout;
