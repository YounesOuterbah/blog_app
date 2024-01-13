export default function Pagination() {
  return (
    <div className="pagination flex pb-10 mx-auto justify-center">
      <div className="page prev bg-[#284c8e] text-white p-3 rounded-s-full border-r cursor-pointer">
        Previous
      </div>
      {[1, 2, 3, 4, 5].map((page) => (
        <div key={page} className="bg-[#284c8e] text-white p-3 border-r border-l cursor-pointer">
          {page}
        </div>
      ))}
      <div className="page next bg-[#284c8e] text-white p-3 rounded-e-full border-l cursor-pointer">
        Next
      </div>
    </div>
  );
}
