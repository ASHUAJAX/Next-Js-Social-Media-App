"use client";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

function AuthChecker({ Children }: any) {

  const [IS_AUTH, set_IS_AUTH]: any = useState(false);

  useEffect(() => {
    let isAuth = localStorage.getItem("user_ID");
    set_IS_AUTH(isAuth);
    if (!isAuth) {
      redirect("/login");
    }
  }, [])


  return <>
    {
      IS_AUTH && Children
    }
  </>;
}

export default AuthChecker;
