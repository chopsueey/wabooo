import GeneralStore from "../store/GeneralContext";

export default function SortByMenu() {
    const {sortBy, setSortBy} = GeneralStore()
  return (
    <div style={{ maxWidth: "600px" }} className="flex justify-end mx-auto">
      <select
        className="blubb p-1 py-2 focus:outline-none rounded-lg text-cyan-500 font-bold h-15 w-15 text-center"
        value={sortBy}
        onChange={(event) => setSortBy(event.target.value)}
      >
        <option value="latest">latest</option>
        <option value="lastHour">one hour</option>
        <option value="last12Hours">12 hours</option>
        <option value="last24Hours">24 hours</option>
      </select>
    </div>
  );
}
