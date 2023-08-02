import React, {useState} from "react";

export default function SignUp() {
  const [SignUp, setSignUp] = useState("")({
  userName: "",
  password: "",
  email: "",
  });

  const handleSignUp = (SignUp)=>{
    const {name, value} = SignUp.target;
    setSignUp({...SignUp, [name]: value});
  };
  const handleSignUpSubmit = () => {
    e.preventDefault();
    console.log("Sign Up: ", SignUp);
  };
  return<div>
  <div className="signUpForm">
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        placeholder="Username"
        value={signUpInfo.username}
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={signUpInfo.email}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={signUpInfo.password}
        onChange={handleChange}
      />
      <button type="submit" className="btn btn-primary">
        Sign Up
      </button>
    </form>
  </div>
</div>
}
