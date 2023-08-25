import React, { useContext } from "react";
import { State } from "../context/stateContext";

export default function Table() {
  const { list, total } = useContext(State);

  return (
    <>
      <table width="100%" className="custom-print-table">
        <thead>
          <tr className="bg-gray-100 p-1">
            <td className="font-bold">Sr</td>
            <td className="font-bold">Item Name</td>
            <td className="font-bold">Quantity</td>
            <td className="font-bold">Price</td>
            <td className="font-bold">Amount</td>
          </tr>
        </thead>
        {list.map(({ id, itemName, quantity, price, amount }, index) => (
          <React.Fragment key={id}>
            <tbody>
              <tr className="h-6">
                <td>{index + 1}</td>
                <td>{itemName}</td>
                <td>{quantity}</td>
                <td>{price}</td>
                <td>{amount}</td>
              </tr>
            </tbody>
          </React.Fragment>
        ))}
      </table>

      <div>
        <h2 className="flex items-end justify-end text-gray-800 font-bold">
          TOTAL AMOUNT: {total.toLocaleString()}
        </h2>
      </div>
    </>
  );
}
