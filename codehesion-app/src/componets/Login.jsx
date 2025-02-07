//need to make this global some how so i dont have to keep repeating this 
import { Formik, Field, Form } from "formik"
import axios from "axios"
import { useState, useEffect } from 'react'

//why refurse to use unsafe cookie on load
//must put client_id and _secret in .env cant let everyone see it 
export const Login = () => {
  const [token_o, setToken_o] = useState("")
  
  let data = ({
    //register these come from the form 
    'grant_type': 'password',
    'client_id': 'web-dashboard',
    'client_secret': 'SuperSecretPassword',
    'scope': 'openid profile role email offline_access adminApi mobileApi',
    'username': 'admin@codehesion.co.za',
    'password': 'P@ssword1'
  });

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://edeaf-api-staging.azurewebsites.net/connect/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': 'ARRAffinity=c03b4673f6f23ebd4ee8b0530ffb43a9bf80e737379a4092ddb472e0648d0a07; ARRAffinitySameSite=c03b4673f6f23ebd4ee8b0530ffb43a9bf80e737379a4092ddb472e0648d0a07'
    },
    data: data
  };
  //trying useState and use effect
  useEffect(()=>{
      console.log(token_o)
    },[token_o])

  const login = () => {
    //do login validation here then part means that correct 
    //local storage check if something correct 

    //do error handlink 
    axios.request(config)
      .then((response) => {
        setToken_o(response.data.access_token)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <div className="login-container">
        <h1>Login</h1>
        <Formik
          initialValues={{ uname: "", pword: "" }}
          onSubmit={async (values) => {
            //call axios 
            //shouldnt be here must b in separate use the layers to make it look good 
            if (values.uname === data.username && values.pword === data.password) {
              console.log(values,"correct",token_o)
              //ehat does this code do?
              login()
              await new Promise((resolve) => setTimeout(resolve, 5000));
              }else{
                  console.log(values,'incorrect')
              }
          }}
        >
          <Form>
            <Field name="uname" type="email" />
            <Field name="pword" type="text" />
            {/* it will then go into showing the categories if credentials correct*/}
            <button type="submit">Submit</button>
          </Form>
        </Formik>
      </div>
    </div>
  )
}
//why is my github not commiting my changes 