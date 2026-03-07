"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";

const SocialButton = () => {
    const params = useSearchParams()
    const callbackUrl = params.get("callbackUrl") || "/"

  const handleSignIn = async () => {
    const result = await signIn("google", { redirect: false, callbackUrl });

    console.log(result);

    if (!result.ok) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid credentials",
        timer: 2000,
        showConfirmButton: false,
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "You are now logged in",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div>
      <button
        onClick={handleSignIn}
        className="btn btn-outline w-full h-14 rounded-xl border-base-300 gap-3 hover:bg-base-300 hover:text-base-content transition-all"
      >
        <FcGoogle size={24} />
        <span>Login with Google</span>
      </button>
    </div>
  );
};

export default SocialButton;
