import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";   //Or useing react router dom
// import { useAuthContext } from "../../context/AuthProvider";    // using for auth

export default function SubMenuClickHandler() {

  const router = useRouter();   //Or useing react router dom

  // const [auth] = useAuthContext(); >>> can be used if auth changed, close submenu

  // open & close Panel sub menu
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  // for closing SubMenu if click other target And also dont close if if click on items in sub menu
  let menuRef = useRef();
  useEffect(() => {
    // if (!auth) {
    //   setOpen(false);
    // }
    let handler = (e) => {
      if (!menuRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.addEventListener("mousedown", handler);
    };
  }, []);

  // close submenu if router changed
  useEffect(() => {
    setOpen(false)
  }, [router])

  return {
    menuRef,
    open,
    handleOpen,
  };
}
