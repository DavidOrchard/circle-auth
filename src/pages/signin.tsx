import React, { useContext } from 'react';
import axios from 'axios'
import { SessionContext, SessionType } from '@/components/sessionContext';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";

const checkLogin = (url: string, email: string, password: string) => {
  axios.post(url, {email, password}).then(res => res.data)
}

export default function Login() {
  const { setSession } = useContext(SessionContext);
  const [cookies] = useCookies(["dave"]);
  const router = useRouter();
  const { register, handleSubmit, watch, formState } = useForm();

  const onSubmit = async (data:Record<string,any>) => {
  
    const login = await checkLogin("/api/authenticate", data.email, data.password);

    const session = cookies.dave === "authedAndAwesome";
    // update context
    setSession(session);
    router.push("/");

  }
  
  return(
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>
          <label htmlFor="email">Username</label>
          <input id="name" type="text"{...register("email", { required: true, minLength: 1 })} />
        </p>
        <p>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" {...register("password", { required: true, minLength: 1})}/>
        </p>
        <div>
          <button>Submit</button>
        </div>
      </form>
    </div>
  )
}