import { useContext } from "react";
import { State } from "../context/stateContext";
import dayjs from 'dayjs';

export default function ClientDetails() {
  const { clientName, clientPhoneNumber , clientAddress, invoiceNumber, invoiceDate } =
    useContext(State);

  return (
    <>
      <div>
        <div>
          <article className="mt-10 mb-14 flex">
            <ul>
              <li className="p-1 ">
                <span className="font-bold">Customer Name:</span>{clientName}
              </li>
              <li className="p-1 ">
                <span className="font-bold">Mobile Number:</span>{clientPhoneNumber}
              </li>
              <li className="p-1 ">
                <span className="font-bold">Address:</span> {clientAddress}
              </li>
              <li className="p-1 ">
                <span className="font-bold">Invoicer number:</span>{invoiceNumber}
              </li>
              <li className="p-1">
                <span className="font-bold">Invoice date:</span>{dayjs(invoiceDate).format('DD/MM/YYYY')}
              </li>
            </ul>
          </article>
        </div>
      </div>
    </>
  );
}
