import React, { useState } from "react";
import Form from "./components/Form";
import Table from "./components/Table";

const applications = [
  {
    id: 1,
    company: "Google",
    role: "Software Engineer",
    status: "Applied",
    date: "08/09/2026",
    ref: "LinkedIn",
  },
  {
    id: 2,
    company: "Microsoft",
    role: "Frontend Developer",
    status: "Interview",
    date: "07/09/2026",
    ref: "Referral",
  },
  {
    id: 3,
    company: "Amazon",
    role: "SDE-1",
    status: "No Confirmation",
    date: "05/09/2026",
    ref: "Company Website",
  },
  {
    id: 4,
    company: "Infosys",
    role: "Systems Engineer",
    status: "Rejected",
    date: "03/09/2026",
    ref: "Campus",
  },
  {
    id: 5,
    company: "Deloitte",
    role: "Analyst",
    status: "Applied",
    date: "01/09/2026",
    ref: "LinkedIn",
  },
  {
    id: 6,
    company: "Accenture",
    role: "Associate Software Engineer",
    status: "Interview",
    date: "28/08/2026",
    ref: "College Placement",
  },
];

function App() {
  const [form, setForm] = useState({
    id: null,
    company: "",
    role: "",
    status: "Applied",
    date: "",
    ref: "",
  });

  const [list, setList] = useState([]);
  console.log("list", list);

  function allFormsInput(e) {
    const { name, value } = e.target;
    console.log(form);
    setForm((prev) => {
      return {
        ...prev,
        id: Date.now() + Math.random(),
        [name]: value,
      };
    });
  }

  function clearAllFormInputs() {
    setForm({
      id: null,
      company: "",
      role: "",
      status: "Applied",
      date: "",
      ref: "",
    });
  }

  const errorValues = {
    company: "company name required",
    role: "required a valid role",
    date: "applied date required",
    ref: "reference required",
  };

  const [error, setError] = useState({
    company: "",
    role: "",
    date: "",
    ref: "",
  });


      // id: null,
      // company: "",
      // role: "",
      // status: "Applied",
      // date: "",
      // ref: "",
  function errorHandler(form){
        console.log('form data: ', form)
  }


  return (
    <div className="mainPage">
      <Form
        errorValues={errorValues}
        error={error}
        setAllInfos={allFormsInput}
        clearAllFormInputs={clearAllFormInputs}
        form={form}
        errorHandler = {errorHandler}
        setList={setList}
      />
      <Table AllInfos={list} />
    </div>
  );
}

export default App;
