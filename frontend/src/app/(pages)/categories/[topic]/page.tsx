"use client";
import { useParams } from "next/navigation";

export default function PageCall() {
  const { topic } = useParams();

  const decodedTopic = (topic as string).replace(/%20/g, " ");

  return <div>{decodedTopic}</div>;
}
