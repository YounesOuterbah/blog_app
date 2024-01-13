"use client";
import Pagination from "@/app/(components)/Pagination";
import PostList from "@/app/(components)/PostList";
import PostSidebar from "@/app/(components)/PostSidebar";

export default function page() {
  return (
    <div className="container mt-6">
      <div className="wrapper flex">
        <div className="main md:basis-9/12">
          <PostList />
        </div>
        <div className="side hidden md:basis-1/4 md:flex">
          <PostSidebar />
        </div>
      </div>
      <Pagination />
    </div>
  );
}
