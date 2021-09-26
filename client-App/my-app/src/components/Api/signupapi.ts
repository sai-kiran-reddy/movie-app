import axios from "axios";


export function signupApi(obj:any)
{
    const {firstName,LastName,email,firstPassword} = obj
   axios.post('/AppSignUp',{firstName,LastName,emailId:email,password:firstPassword}).then( x => console.log(x));
}
