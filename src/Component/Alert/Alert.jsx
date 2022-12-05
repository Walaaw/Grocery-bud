import React, { useEffect } from "react";

export default function Alert({ alert, showAlert, alldata }) {
  useEffect(() => {
    const timeout = setTimeout(() => {
      showAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [alldata]);
  return (
    <div className={`alert alert-${alert.type} p-1 mx-5 text-center`}>
      {" "}
      {alert.msg}
    </div>
  );
}
