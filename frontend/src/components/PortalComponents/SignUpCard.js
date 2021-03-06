import { Link, useNavigate } from "react-router-dom";
import React, { useState, useContext} from "react";
import { UserContext } from "../../contexts/UserContext";
import { CalculatorContext } from "../../contexts/CalculatorContext";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase-config/firebase-config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { dbCreateUser, dbUserExists } from "../../ApiCalls/calls";
import GooglePng from "../../assets/sign-in-svgs/Google.png";
import validator from "validator";
import CalculatorResults from "../CalculatorComponents/CalculatorResultCard";

function SignUpCard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
    reEnteredPass: "",
  });
  const [isAuth, setAuth] = useState(false);
  const [privacyAgree, setPrivacyAgree] = useState(false);
  const {globalUser, setGlobalUser} = useContext(UserContext);

  async function registerEmail(user) {
    try {
      const email = user.email;
      const password = user.password;
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const uid = result.user.uid;
      setGlobalUser({email: email, uid: uid});
      dbCreateUser(email, uid, "Email");
      window.sessionStorage.setItem("globalUser", JSON.stringify({email: email, uid: uid}));
      setAuth(true);
    }
    catch (err) {
      if (typeof err === "object") {
        alert(`User already exists with the email "${user.email}", please log in to FF land!`);
        navigate("/portal/login");
        return;
      }
      console.log(err);
      alert(err)
    }
  }


  async function registerGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
        
      if (!credential)
        throw "Error: could not connect to Google"

      if (!privacyAgree) {
        alert("Please read and agree with FF-Land's Privacy Policy before proceeding!");
        return;
      }
        
      const uid = result.user.uid;
      const email = result.user.email;
      const userExists = await dbUserExists(uid);

      if (userExists) {
        navigate("/portal/login");
        throw `User already exists with the email "${email}" under a ${userExists} provider, please log in to FF Land!`;
      }

      setGlobalUser({email: email, uid: uid});
      dbCreateUser(email, uid, "Google");
      window.sessionStorage.setItem("globalUser", JSON.stringify({email: email, uid: uid}));
      setAuth(true);
    }
    catch (err) {
      console.log(err);
      alert(err);
    }
  }
    
    
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validator.isEmail(user.email)) {
      alert("Email must be valid.");
      return;
    }

    if (user.password !== user.reEnteredPass) {
      alert("Passwords must match.");
      return;
    }

    if (user.password.length < 6) {
      alert("Password length must be at least 6 characters.");
      return;
    }

    if (!privacyAgree) {
      alert("Please read and agree with FF-Land's Privacy Policy before proceeding!");
      return;
    }

    registerEmail(user);
  };

  const handlePrivacy = (e) => { 
    if (e.target.checked) {
      setPrivacyAgree(true);
    }
    else {
      setPrivacyAgree(false)
    }
  }


  return !isAuth ? (
    <div
      className="flex card-white font-ubuntu sm:ml-4 sm:mr-10 mx-16 px-8
      max-w-sm"
    >
      <div className="justify-center">
        <div className="flex">
          <div className="text-3xl font-medium px-7">Get Started</div>
        </div>
        <form
          className="flex-col pb-4 pt-7 px-7"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div id="signup-form-1" className="relative">
            <input
              placeholder="Email *"
              className="peer input-gray w-full"
              required
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
            <label className="absolute floating-label">Email</label>
          </div>
          <div id="signup-form-2" className="relative">
            <input
              placeholder="Password *"
              className="peer input-gray w-full"
              type="password"
              required
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <label className="absolute floating-label">Password</label>
          </div>
          <div id="signup-form-3" className="relative">
            <input
              placeholder="Re-enter Password *"
              className="peer input-gray w-full"
              type="password"
              required
              value={user.reEnteredPass}
              onChange={(e) =>
                setUser({ ...user, reEnteredPass: e.target.value })
              }
            />
            <label className="absolute floating-label">Re-enter Password</label>
          </div>
          <div className="flex mx-8 pt-2 pb-5 justify-center">
            <div className="flex">
              <input 
              id="checkbox-privacy" 
              type="checkbox" 
              className="mr-3" 
              value={privacyAgree}
              onChange={(e) => handlePrivacy(e)}
              />
              <label
                htmlFor="checkbox-privacy"
                className="cursor-pointer hover:underline text-sm"
              >
                I agree to FF-Land's Privacy Policy
              </label>
            </div>
          </div>
          <div>
            <button type="submit" className="btn-pink w-full mt-1">
              Register
            </button>
          </div>
        </form>
        <div className="px-7 ">
          <button
            onClick={() => {
              registerGoogle();
            }}
            className="btn-white border border-pink inline-flex 
            justify-center items-center w-full px-7 mb-2"
          >
            <img src={GooglePng} alt="Google SVG" className="h-4 mr-3" />
            <span>Register with Google</span>
          </button>
          <div className="font-light text-sm">
            <Link to="/portal/login">
              <button className="hover:underline">
                Already have an account? Log In
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  ) : 
  (
    navigate("/calculator")
  );
}

export default SignUpCard;
