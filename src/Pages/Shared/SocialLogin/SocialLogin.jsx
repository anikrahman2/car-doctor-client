import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthProvider";

const SocialLogin = () => {
  const { googleSignIn } = useContext(AuthContext);
  const handelGoogleSignIn = () => {
    googleSignIn()
    .then(result => {
      const loggedUser = result.user;
      console.log(loggedUser)
    })
    .catch(err => {
      console.log(err.message)
    })
  }
  return (
    <div>
      <div className="divider">OR</div>
      <div className="text-center">
        <button onClick={handelGoogleSignIn} className="btn btn-circle btn-outline">
          G
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;