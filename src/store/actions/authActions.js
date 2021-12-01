import * as Api from "../../services/api";

export const signup = async(data, callBack) =>  {
    try {
      const result = await Api.post("/signup", data);
      console.log('res', result)
      callBack(true,result);
    } catch (err) {
        console.log('err', err.response)
      callBack(false,err.response);
    }
  };

  export const signin = async(data, callBack) =>  {
    try {
      const result = await Api.post("/signin", data);
      console.log('res', result)
      callBack(true,result);
    } catch (err) {
        console.log('err', err.response)
      callBack(false,err.response);
    }
  };

  export const getUser = async(callBack) =>  {
    try {
      const result = await Api.get("/");
      console.log('res', result)
      callBack(true,result);
    } catch (err) {
        console.log('err', err.response)
      callBack(false,err.response);
    }
  };