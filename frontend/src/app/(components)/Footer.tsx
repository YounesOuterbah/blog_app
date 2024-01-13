export default function Footer() {
  const date = new Date();
  return <div className="text-center w-full bg-[#284c8e] text-white py-2">Copyright reserved &copy; {date.getFullYear()}</div>;
}
