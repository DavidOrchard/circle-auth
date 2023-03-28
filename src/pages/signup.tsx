import React, { useContext } from 'react';
import axios from 'axios'
import { SessionContext, SessionType } from '@/components/sessionContext';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";

const signup = (url: string, data: Record<string,any>) => {
  axios.post(url, data).then(res => res.data)
}

export default function Login() {
  const router = useRouter();
  const { register, handleSubmit, watch, formState } = useForm();

  const onSubmit = async (data:Record<string,any>) => {
  
    const resp = await signup("/api/user", data);
    console.log('signup', resp);

    // update context
    // setSession({session:cookies.dave});
    router.push("/");
  }
  
  return(
    <div className="login-wrapper">
      <h1>Please Sign up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
      <p>
          <label htmlFor="firstname">First name</label>
          <input id="name" type="text"{...register("firstname", { required: true, minLength: 1 })} />
        </p>
        <p>
          <label htmlFor="lastname">Last name</label>
          <input id="name" type="text"{...register("lastname", { required: true, minLength: 1 })} />
        </p>
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