import React from "react";

export default function Alldata({ alldata, cleatItem, editItem }) {
  return (
    <>
      {alldata.map((item, idx) => {
        const { id, title } = item;
        return (
          <div
            key={idx}
            className="px-3 py-1 mx-5 bg-light d-flex justify-content-between "
          >
            <p>{title}</p>
            <div className="icons">
              <i
                className="fa-solid fa-trash text-danger mx-1 cursor"
                onClick={() => {
                  cleatItem(id);
                }}
              ></i>
              <i
                className="fa-solid fa-pen-to-square text-danger mx-1 cursor"
                onClick={() => {
                  editItem(id);
                }}
              ></i>
            </div>
          </div>
        );
      })}
    </>
  );
}
