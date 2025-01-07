import { Oval } from "react-loader-spinner";

function Waiting() {
  return (
    <Oval
      visible={true}
      height="80"
      width="80"
      ariaLabel="oval-loading"
      wrapperStyle={{ margin: "auto", width: "fit-content" }}
      wrapperClass=""
    />
  );
}

export default Waiting;
