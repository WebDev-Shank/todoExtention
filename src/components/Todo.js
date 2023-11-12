import React, { useEffect, useState } from "react";

const Todo = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
  });

  const [list, setList] = useState(() => {
    return JSON.parse(localStorage.getItem("list")) || [];
  });

  const handleChange = (e) => {
    if (e.target.name === "name") {
      setData({ ...data, name: e.target.value });
    } else {
      setData({ ...data, email: e.target.value });
    }
  };

  const handleListData = () => {
    if (data.name === "" || data.email === "") {
      alert("Please fill all details");
      return;
    }
    console.log(data);
    setList([...list, { id: Math.ceil(Math.random() * 1000), data }]);
    console.log(list);
    setData({ name: "", email: "" });
  };

  const handleBtn = (id, name) => {
    const newList = list.filter((ele) => {
      return ele.id !== id;
    });
    setList(newList);
    setData("");
    alert("You deleted " + name + " item");
  };

  const removeAll = () => {
    localStorage.clear("list");
    window.location.reload();
    console.log("asa");
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <div className="App mt-2">
      <header className="App-header">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 bg-primary-subtle rounded">
              <h3 className="text-success mt-1">Task Manager</h3>
              <div className="p-2 rounded">
                <input
                  className="form-control mb-1"
                  type="text"
                  placeholder="Title"
                  value={data.name}
                  name="name"
                  onChange={handleChange}
                />
                <textarea
                  cols={15}
                  rows={5}
                  className="form-control mb-1"
                  type="email"
                  placeholder="Description"
                  value={data.email}
                  name="email"
                  onChange={handleChange}
                />
                <button
                  className="btn bg-success text-white mt-1"
                  onClick={handleListData}
                >
                  Save
                </button>
              </div>
            </div>
          </div>

          <div className="row mt-2">
            {list.length >= 1 ? (
              <>
                <h2 className="text-success">Your Tasks 😊</h2>
                <button
                  className="btn btn-primary py-1 px-0"
                  onClick={removeAll}
                >
                  Remove All
                </button>
              </>
            ) : (
              ""
            )}
            <div className="col-lg-12 bg-traparent px-1 py-0 rounded text-start">
              {list.map((item, i) => {
                return (
                  <dl className="bg-danger px-2 py-1 m-1 rounded-1" key={i}>
                    <dt className="text-white">{item.data.name}</dt>
                    <dd className="text-white">
                      {item.data.email}{" "}
                      <span
                        className="ms-5 btn p-0 bg-dark"
                        onClick={() => handleBtn(item.id, item.data.name)}
                      >
                        ❌
                      </span>
                    </dd>
                  </dl>
                );
              })}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Todo;
