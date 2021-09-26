/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import "../App.css";
import { Validator } from "./validator";
import { useSelector, useDispatch } from "react-redux";
import { signupAction } from "../store/slices/authentication";
import { loginAction  , setTokenAction } from "../store/slices/authorization";
import { RootState } from "../store/store";
import axios, { AxiosResponse } from "axios";

export function AuthenticationPage() {
  const dispatch = useDispatch();
  const loginHome = useSelector(
    (state: RootState) => state.authenticationReducer.loginHome
  );
  const signupHome = useSelector(
    (state: RootState) => state.authenticationReducer.SignUpHome
  );
  const signup = useSelector(
    (state: RootState) => state.authenticationReducer.SignUp
  );
  const accessToken = useSelector(
    (state: RootState) => state.authorizationReducer.AccessToken
  );

  const [firstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [login, setlogin] = useState(false);
  const [errorLogin, seterrorLogin] = useState(false);
  const [email, setemail] = useState("");
  const [firstPassword, setfirstPassword] = useState("");
  const [secondPassword, setsecondPassword] = useState("");
  const [validatorValues, setvalidatorValues] = useState([""]);
  const [loginData , setLoginData] = useState<AxiosResponse | null | void>(null);
  const [signupData , setsignupData] = useState<AxiosResponse | null | void>(null);
  const [message,setMessage] = useState("please sign up if you dont have account and double click to login");
  const didMount = useRef(false);

  useEffect( () => {
    if (didMount.current) {
      setvalidatorValues(
        Validator({ firstName, LastName, email, firstPassword, secondPassword })
      );

      if (signup) {
        signupApi({
          firstName,
          LastName,
          email,
          firstPassword,
          secondPassword,
        });
        dispatch(signupAction(false));
      }
      if (login) {
        LoginApi({ email, firstPassword });
        if(loginData && loginData.status === 200 )
        {
          dispatch(setTokenAction(loginData.data.accesstoken))
          setMessage(loginData.data.message);
          dispatch(loginAction(true));
        }
       else
        {
          setMessage('login un successfull');
        }
      }
    } else didMount.current = true;
  }, [firstName, LastName, email, firstPassword, secondPassword, validatorValues.length, signup, login, dispatch, loginData, accessToken]);

  return (
    <div className="LoginPage">
      {(loginHome) && (
        <>
          <p> {login && message}</p>
          <p> {!login && 'login un successfull'}</p>
          <form>
            <input
              type="text"
              placeholder="Enter email id"
              required={true}
              onChange={(event) => setemail(event.target.value)}
            />
            <input
              type="password"
              placeholder="password"
              required={true}
              onChange={(event) => setfirstPassword(event.target.value)}
            />
            <br />
            <button
              onClick={(e) => {
                e.preventDefault();
                setlogin(true);
              }}
            >
              Log In
            </button>
          </form>
        </>
      )}
      {signupHome && (
        <>
          <form>
            Enter first name:{" "}
            <input
              type="text"
              placeholder="first name"
              onChange={(event) => setFirstName(event.target.value)}
            />
            <br />
            Enter last name:{" "}
            <input
              type="text"
              placeholder="last name"
              onChange={(event) => setLastName(event.target.value)}
            />
            <br />
            Enter Email Id:{" "}
            <input
              type="text"
              placeholder="username"
              onChange={(event) => setemail(event.target.value)}
            />
            <br />
            Enter password :{" "}
            <input
              type="password"
              placeholder="please enter password"
              onChange={(event) => setfirstPassword(event.target.value)}
            />
            <br />
            Reenter password:{" "}
            <input
              type="password"
              placeholder="please enter password"
              onChange={(event) => setsecondPassword(event.target.value)}
              enterKeyHint="next"
            />
            <br />
            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch(signupAction(true));
              }}
            >
              {" "}
              Sign up
            </button>
            {validatorValues &&
              validatorValues.map((x) => <p style={{ color: "red" }}>{x}</p>)}
          </form>
        </>
      )}
    </div>
  );
  function LoginApi(obj:any)
{
    const {email,firstPassword} = obj
    if(email !=="" && firstPassword!=="")
    {
    return axios.post('/AppLogin',{emailId:email,password:firstPassword}).then( response => {setLoginData(response); seterrorLogin(false);}).catch(() =>{
      seterrorLogin(true);
    });
  }
  else
  {
    dispatch(loginAction(false));
    seterrorLogin(true);
  }
}

function signupApi(obj:any)
{
    const {firstName,LastName,email,firstPassword} = obj
   axios.post('/AppSignUp',{firstName,LastName,emailId:email,password:firstPassword}).then( response => setsignupData(response));
}
}

