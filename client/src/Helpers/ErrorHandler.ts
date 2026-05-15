import axios from "axios"

export const handleError = (error: any)=>{
    if(axios.isAxiosError(error)){
        var err = error.response;
        if(Array.isArray(err?.data.errors)){
            console.log(1)
            for(let val of err?.data.errors)
                console.log(val.description);}
        else if (typeof err?.data.errors === "object"){
            console.log(2)
            for (let e in err?.data.errors)
                console.log(err.data.errors[e][0]);}
        else if (err?.data){
            console.log(3)
            if(Array.isArray(err?.data))
                for(const e of err?.data)
                    console.log(e.description)
            else
            console.log(err.data);}
        else if (err?.status === 401){
            console.log(4)
            console.log("Please login");
            window.history.pushState({}, "LoginPage", "/login");
        }
        
        else if (err){
                console.log(5)
            console.log(err?.data)}


        
    }
}