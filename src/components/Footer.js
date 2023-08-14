import { useContext } from "react";
import { State } from "../context/stateContext";

export default function Footer() {
  const { name, email, website, phone, bankAccount, bankName } =
    useContext(State);

  return (
    <>
      <footer className="footer border-t-2 border-gray-300 pt-5">
        <p>Shop Name and Address</p>
      </footer>

      <p className="text-center px-5 mt-8 text-xs ">
        Invoicer is built by{" "}
        <a
          href="http://www.techweaversystems.com/"
          target="_blank"
          rel="noreferrer"
          className="underline"
        >
          Tech Weaver Pvt. Ltd.
        </a>
      </p>
    </>
  );
}
