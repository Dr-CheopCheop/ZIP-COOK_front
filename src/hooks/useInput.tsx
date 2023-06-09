import {useState, useCallback} from "react";

const useInput = (initialValue : any) => {
  const [value, setValue] = useState(initialValue);
  const handler = useCallback((e:any) => {
    setValue(e.target.value);
  },[]);
  return [value,handler];
};

export default useInput;