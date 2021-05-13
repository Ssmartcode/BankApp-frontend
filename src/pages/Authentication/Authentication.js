import React, { useState } from "react";
import Input from "../../components/shared/Input/Input";

const Authentication = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userPassword, setUserPassword] = useState("");

  return (
    <div>
      <Input type="text" id="userName" />
    </div>
  );
};

export default Authentication;
