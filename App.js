import React, { useEffect, useState } from "react";
import Form from "./components/Form";
import Table from "./components/Table";

function App() {
  const [form, setForm] = useState({
    id: null,
    company: "",
    role: "",
    status: "Applied",
    date: "",
    ref: "",
  });
    const [btn, setBtn] = useState(false);
 
  function sayHello({ name }) {
    console.log(`Hello, ${name}!`);
    return `Successfully greeted ${name}.`;
  }

  // 2. The definition the model reads
  const tools = [
    {
      type: "function",
      function: {
        name: "sayHello",
        description: "Greets a person by name.",
        parameters: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "The name of the person to greet",
            },
          },
          required: ["name"],
        },
      },
    },
  ];

  const toolRegistry = {
    sayHello:sayHello
  };

  async function fetchData() {

    try{
    let response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${key}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "liquid/lfm-2.5-2.6b:free",
        "messages": [
          {
            "role": "user",
            // "content": "Please say hello to Reyhan using tools provided "
            "content": "Please Say hello to Reyhan 3 times "
          }
        ],
        "tools": tools,
        "reasoning": { "effort": "medium" }
      })
    });



    const result = await response.json();
    response = result.choices[0].message;
    console.log('orrginal rest', result)
    console.log('orrginal responseObjn', response)

    if(response.tool_calls){
      console.log('going inside tool call func')
      for(const toolCall of response.tool_calls){
        const args = JSON.parse(toolCall.function.arguments);
        const fnName = toolCall.function.name;
        console.log('arg and fnName are:', args, fnName);

        if(toolRegistry[fnName]){
          const op = toolRegistry[fnName](args);
          console.log('func returned val: ', op)
        }
      }
    }
    else{
      console.log('model resp', response.content)
    }

  }
  catch(e){
    console.log(e)
  }
  }
  // const toolRegistry = [toolRegistry];

  useEffect(()=>{
    fetchData();

  }, [btn])
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

  //       [
  //     "id",
  //     "company",
  //     "role",
  //     "status",
  //     "date",
  //     "ref"
  // ]

  function errorHandler(form) {

    const errorTemp = {
      length: 0
    }

    console.log("form data: ", form);
    console.log(Object.keys(form));



    Object.keys(errorValues).forEach((key) => {
      if (form[key].trim() == '') {
        errorTemp['length'] = errorTemp['length'] + 1;
        errorTemp[key] = errorValues[key];
      }
    })
    setError(errorTemp)
    console.log('temp error we designed is: ', errorTemp);
    if (errorTemp.length > 0) {
      return true;
    }
    return false;

  }

  return (
    <div className="mainPage">
      <Form
        errorValues={errorValues}
        error={error}
        setAllInfos={allFormsInput}
        clearAllFormInputs={clearAllFormInputs}
        form={form}
        errorHandler={errorHandler}
        setList={setList}
      />
      <Table AllInfos={list} />
      <button onClick={()=>setBtn(true)}>click</button>
    </div>
  );
}

export default App;
