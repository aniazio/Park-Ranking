import { ParkDetailed } from "../../types";

function Input({
  namePl,
  nameEng,
  park,
  changeError,
}: {
  namePl: string;
  nameEng: string;
  park: ParkDetailed | null;
  changeError: (increase: boolean) => void;
}) {
  function handleWrongInput(event: React.FocusEvent<HTMLInputElement>) {
    const elem: HTMLInputElement = event.target;
    setInputElemClass(elem, "name", (param) => param.trim().length == 0);
    setInputElemClass(elem, "district", (param) => param.trim().length == 0);
    setInputElemClass(
      elem,
      "rating",
      (param) => isNaN(+param) || +param < 0 || +param > 10
    );
  }

  function setInputElemClass(
    elem: HTMLInputElement,
    searchedName: string,
    conditionForWrong: (param: string) => boolean
  ) {
    if (elem.name && elem.name == searchedName) {
      if (conditionForWrong(elem.value)) {
        if (!elem.classList.contains("wrongInput")) {
          elem.setAttribute("class", "wrongInput");
          changeError(true);
        }
      } else {
        if (elem.classList.contains("wrongInput")) {
          elem.removeAttribute("class");
          changeError(false);
        }
      }
    }
  }

  return (
    <div>
      <label>{namePl}</label>
      <input
        name={nameEng}
        id={nameEng}
        defaultValue={
          park ? park[nameEng as keyof ParkDetailed]?.toString() : ""
        }
        onBlur={handleWrongInput}
      />
    </div>
  );
}

export default Input;
