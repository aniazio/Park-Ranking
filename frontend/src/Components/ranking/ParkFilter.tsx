import { useRef } from "react";

function ParkFilter({
  filter,
  setFilter,
}: {
  filter: string | null;
  setFilter: (value: string | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleChange() {
    if (inputRef.current) {
      if (inputRef.current.value.trim().length == 0) {
        setFilter(null);
      } else {
        setFilter(inputRef.current.value.toLowerCase());
      }
    }
  }

  return (
    <>
      <form>
        <label>Filtruj po nazwie lub dzielnicy</label>
        <input
          type="text"
          defaultValue={filter ? filter : ""}
          ref={inputRef}
        ></input>
        <button type="button" onClick={handleChange}>
          Zastosuj filtr
        </button>
      </form>
    </>
  );
}

export default ParkFilter;
