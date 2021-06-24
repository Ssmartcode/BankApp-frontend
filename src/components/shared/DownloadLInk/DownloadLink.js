import React, { useRef, useContext } from "react";
import useFetch from "use-http";
import AuthContext from "../../../context/AuthContext";

const DownloadLink = (props) => {
  const anchor = useRef();
  const authContext = useContext(AuthContext);
  const { get } = useFetch(process.env.REACT_APP_BACKEND, {
    responseType: "arrayBuffer",
    headers: { Authorization: `Bearer ${authContext.token}` },
  });

  const handleAnchorClick = async () => {
    if (anchor.current.href) return;

    const data = await get(props.link);
    const blob = new Blob([data], { type: "application/pdf" });
    const href = window.URL.createObjectURL(blob);

    // open the file in the browser
    window.open(href);

    // download the file
    // anchor.current.href = href;
    // anchor.current.download = props.fileName;
    // anchor.current.click();
  };

  return (
    <div>
      <a className={props.className} ref={anchor} onClick={handleAnchorClick}>
        {props.children}
      </a>
    </div>
  );
};

export default DownloadLink;
