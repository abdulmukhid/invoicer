import { useContext } from "react";
import { State } from "../context/stateContext";
import dayjs from 'dayjs';

export default function ClientDetails() {
  const { customerName, phoneNumber , address, invoiceNumber, invoiceDate, gstNumber } =
    useContext(State);

  return (
    <>
      <div>
        <div>
          <article className="mt-2 mb-2 flex" style={{justifyContent: "space-between"}}>
            <ul>
              <li>
                <span className="font-bold">Customer Name:</span> {customerName}
              </li>
              <li>
                <span className="font-bold">Mobile Number:</span> {phoneNumber}
              </li>
              <li>
                <span className="font-bold">Address:</span> {address}
              </li>
            </ul>
            <ul>
              <li>
                <span className="font-bold">Invoice date:</span> {dayjs(invoiceDate).format('DD/MM/YYYY')}
              </li>
              <li>
                <span className="font-bold">Invoicer number:</span> {invoiceNumber}
              </li>
              <li>
                <span className="font-bold">GST Number:</span> {gstNumber}
              </li>
            </ul>
          </article>
        </div>
      </div>
    </>
  );
}
