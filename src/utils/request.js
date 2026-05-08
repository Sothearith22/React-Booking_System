import axios from "axios"

export const repuest = (url = "", method = "get" ,data = {}) => {
    return axios ({
        url :url,
        method : method,
        data: data,
    })
    .then((res) => {
        console.log("api :",res)
        return res?.data;
    })
    .catch((res) => {
        console.log("Error : " , res);

        const Error = res?.response;

    // if(Error){
    //     const status = err?Error.response;
    //     if(status == 500){
    //         console.log("internal Server");
            
    //     }
    // }
    },[repuest])
    
}