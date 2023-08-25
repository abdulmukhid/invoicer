import React, { useContext } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { State } from "../context/stateContext";
import { Button } from "@mui/material";

export default function DeleteModal({ itemId }) {
  const { setShowModal, deleteRow } = useContext(State);

  return (
    <>
      <div className="inline-block transition-all duration-200 bg-black bg-opacity-25 fixed left-0 right-0 bottom-0 top-0 z-20">
        <div className="w-9/12 max-w-2xl bg-white p-8 rounded shadow fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <h2 className="text-3xl mb-4">Delete Item</h2>
          <p className="text-slate-600 mb-10">
            Are you sure you want to delete this item?
          </p>

          <ul className="flex flex-wrap gap-6 items-start md:items-start justify-between">
            <li>
               <Button
                onClick={() => setShowModal(false)}
                variant="contained"
                color="success"

                >
                  No, go back
                </Button>
            </li>

            <li>
              <Button
                onClick={() => deleteRow(itemId)}
                variant="contained"
                color="error"
              >
                Yes, delete
              </Button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
