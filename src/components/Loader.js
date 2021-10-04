
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";


const LoadingIndicator = props => {
  const { promiseInProgress } = usePromiseTracker();
  
  return (
    promiseInProgress && 
    <div
      style={{
        width: "100%",
        height: "100",
        display: "flex",

      }}
    >
    <Loader type="ThreeDots" color="#3399ff" height="10" width="60" />
    </div>
  );  
}

export default LoadingIndicator