"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client"; //import the auth client
import { useState } from "react";
import { session } from "@/db/schema";

export default function Home() {
  const {data:session}=authClient.useSession()
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const onSubmit=()=>{
    authClient.signUp.email({
        email, // user email address
        password, // user password -> min 8 characters by default
        name, // user display name
        callbackURL: "/" // A URL to redirect to after the user verifies their email (optional)
    },
  {
        onRequest: () => {
           
        },
        onSuccess: () => {
            window.alert("Sucess")
        },
        onError: (ctx) => {
            // display the error message
            alert(ctx.error.message);
        }})
  }
  
  const onLogin=()=>{
    authClient.signIn.email({
        /**
         * The user email
         */
        email,
        /**
         * The user password
         */
        password,
        /**
         * A URL to redirect to after the user verifies their email (optional)
         */
        callbackURL: "/",
        /**
         * remember the user session after the browser is closed. 
         * @default true
         */
        rememberMe: true
}, {
    
})
  }
 
  if(session){
    return (
      <div>
        Hey there
        <Button onClick={()=>authClient.signOut()}>Signout</Button>
      </div>
    )
  }
  

  return (
    <>
    <div className="p-4 flex flex-col gap-1">
      <Input
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={onSubmit}>Continue</Button>
    </div>
    <div className="p-4 flex flex-col gap-1">
      
      <Input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={onLogin}>Login</Button>
    </div></>
  );
}
