import React, { useContext } from 'react';
import axios from 'axios'
import { SessionContext, SessionType } from '@/components/sessionContext';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';

const checkLogin = (url: string, username: string, password: string) => {
  axios.post(url, {username, password}).then(res => res.data)
}



export default function Login() {
  const sess = useContext(SessionContext);
  const { setSession }:SessionType  = sess;
  const [cookies, setCookie] = useCookies();
  const router = useRouter();

  const onSubmit = async (e) => {
    // get the input values
    e.preventDefault();
    const name = document.getElementById("name")?.value;
    const password = document.getElementById("password")?.value;
    // assume works

    console.log('login call');
  
    const login = await checkLogin("/api/authenticate", name, password);
    // now read from the cookie

    var b = JSON.stringify(document.cookie.match("(^|;)\\s*" + "dave" + "\\s*=\\s*([^;]+)"));

    // check cookies
    console.log('cookies1', b);
    console.log('cookies', cookies);

    // update context
    setSession({session:b});
    router.push("/");
    // redirect to landing page.
    
  }
  
  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form>
        <label>
          <p>Username</p>
          <input id="name" type="text" />
        </label>
        <label>
          <p>Password</p>
          <input id="password" type="password" />
        </label>
        <div>
          <button onClick={onSubmit} type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}