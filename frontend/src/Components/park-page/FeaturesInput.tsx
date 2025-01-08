import { useRef } from "react";
import styles from "./FeatureInput.module.css";

function FeaturesInput({
  isPositive,
  inputsCount,
  set,
  changeCount,
}: {
  isPositive: boolean;
  inputsCount: number;
  set: string[];
  changeCount: (sign: number, newSet: string[]) => void;
}) {
  const itemsRef = useRef<Array<HTMLInputElement | null>>([]);

  function modifySet(event: React.FocusEvent) {
    let newSet = set;
    const idx: number = +event.currentTarget.id;
    newSet[idx] = itemsRef.current[idx] ? itemsRef.current[idx].value : "";
    changeCount(0, newSet);
  }

  return (
    <>
      {isPositive ? <label>Plusy: </label> : <label>Minusy: </label>}

      <div className={styles.features}>
        {Array.from({ length: inputsCount }, (_, idx) => (
          <li key={[idx, set[idx]].join(" ")}>
            <input
              id={idx.toString()}
              defaultValue={set[idx]}
              onBlur={modifySet}
              ref={(el) => (itemsRef.current[idx] = el)}
            />
            <button
              type="button"
              id={idx.toString()}
              onClick={() =>
                changeCount(
                  -1,
                  set.filter((_, id) => id !== idx)
                )
              }
            >
              Usuń
            </button>
          </li>
        ))}
      </div>
      <button type="button" onClick={() => changeCount(1, set.concat(""))}>
        Dodaj pole
      </button>
    </>
  );
}

export default FeaturesInput;
