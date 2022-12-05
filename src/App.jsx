import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import Alldata from "./Component/Alldata/Alldata";
import Alert from "./Component/Alert/Alert";

function App() {
  const getLocalStorage = () => {
    const list = localStorage.getItem("list");
    if (list) {
      return JSON.parse(list);
    } else {
      return [];
    }
  };
  const [alldata, setalldata] = useState(getLocalStorage);
  const [name, setname] = useState("");
  const [isIditing, setisIditing] = useState(false);
  const [alert, setalert] = useState({ show: false, msg: "", type: "" });
  const [editId, seteditId] = useState(null);
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(alldata));
  }, [alldata]);
  const handlesubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "fillname first", "danger");
    } else if (name && isIditing) {
      setalldata(
        alldata.map((item) => {
          if (editId === item.id) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      seteditId(null);
      setisIditing(false);
      setname("");
      showAlert(true, "item is updating", "success");
    } else {
      const item = { id: new Date().getTime().toString(), title: name };
      setalldata([...alldata, item]);
      setname("");
      showAlert(true, "item added", "success");
    }
  };
  const clearList = () => {
    setalldata([]);
    showAlert(true, "Empty list", "danger");
  };
  const cleatItem = (id) => {
    const newlist = alldata.filter((item) => item.id !== id);
    setalldata(newlist);
    showAlert(true, "item Deleted", "danger");
  };
  const editItem = (id) => {
    alldata.map((item) => {
      if (item.id === id) {
        setname(item.title);
        setisIditing(true);
        seteditId(id);
      }
    });
  };
  const showAlert = (show = false, msg = "", type = "") => {
    setalert({ show, type, msg });
  };

  return (
    <>
      <div className="w-50 m-auto bg-white shadow-sm rounded my-5 py-5">
        <h3 className="text-center ">Grocery Bud </h3>
        <Alert alert={alert} showAlert={showAlert} alldata={alldata} />
        <form
          onSubmit={handlesubmit}
          className=" p-5  d-flex justify-content-between align-items-center"
        >
          <input
            type="text"
            className=" form-control"
            placeholder=" ex.Egg"
            value={name}
            onChange={(e) => {
              setname(e.target.value);
            }}
          />
          <button className="ms-3 btn btn-outline-info">
            {isIditing ? "Edit" : "Add"}
          </button>
        </form>
        <Alldata alldata={alldata} cleatItem={cleatItem} editItem={editItem} />
        <button
          className="btn btn-outline-danger m-auto d-block my-3"
          onClick={clearList}
        >
          {" "}
          clearitems
        </button>
      </div>
    </>
  );
}

export default App;
