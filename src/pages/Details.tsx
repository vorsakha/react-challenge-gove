import { useEffect, useRef, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { RiCloseLine as CloseIcon } from "@react-icons/all-files/ri/RiCloseLine";
import { DetailedData } from "../../types";
import { useAppSelector } from "../redux/hooks";
import formatDate from "../utils/formatDate";
import handleBlockScroll from "../utils/handleBlockScroll";
import useClickOutside from "../utils/useClickOutside";

const Details = () => {
  const [detailed, setDetailed] = useState<DetailedData | null>(null);

  const { searchData } = useAppSelector((state) => state.searchReducer);

  const { id } = useParams<{ id: string }>();

  const history = useHistory();

  // Handle close modal
  const ref = useRef(null);
  const handleCloseButton = () => {
    handleBlockScroll(false);

    //history.push(`/page/1`);
    history.goBack();
  };
  useClickOutside(ref, handleCloseButton);

  // Filter the data that the params is requesting
  const filterData = () => {
    const newData = searchData.filter((item) => item.login.salt === id)[0];

    setDetailed(newData);
  };

  useEffect(() => {
    filterData();
  });

  useEffect(() => {
    handleBlockScroll(true);
  }, []);

  const name = `${detailed?.name.first} ${detailed?.name.last}` || "";
  const url = window.location.href;
  const gender = detailed?.gender === "male" ? "Male" : "Female";

  return (
    <div className="fixed left-0 top-0 flex items-center justify-center h-screen w-screen bg-opacity-50 bg-gray-700 blur-lg">
      {detailed !== null ? (
        <div
          ref={ref}
          className="p-8 shadow-lg bg-gray-100 mt-20 pt-16 relative opacity-100"
        >
          <img
            className="rounded-full w-36 -mt-36 mx-auto shadow-sm"
            src={detailed?.picture.large}
            alt={name}
          />
          <button
            className="font-bold absolute right-0 top-0 p-2 text-2xl hover:text-gray-700"
            onClick={() => handleCloseButton()}
          >
            <CloseIcon />
          </button>
          <p className="py-1 mr-1">
            <span className="font-bold">Name:</span> {name}
          </p>
          <p className="py-1 mr-1">
            <span className="font-bold">Email:</span> {detailed?.email}
          </p>
          <p className="py-1 mr-1">
            <span className="font-bold">Gender:</span> {gender}
          </p>
          <p className="py-1 mr-1">
            <span className="font-bold">Date of birth:</span>{" "}
            {formatDate(detailed?.dob.date || "")}
          </p>
          <p className="py-1 mr-1">
            <span className="font-bold">Phone number:</span> {detailed?.phone}
          </p>
          <p className="py-1 mr-1">
            <span className="font-bold">Nationality:</span> {detailed?.nat}
          </p>
          <p className="py-1 mr-1">
            <span className="font-bold">Address:</span>{" "}
            {detailed?.location.street.name}-{detailed?.location.street.number},{" "}
            {detailed?.location.city}, {detailed?.location.state},{" "}
            {detailed?.location.country}
          </p>
          <p className="py-1 mr-1">
            <span className="font-bold">ID:</span> {detailed?.login.salt}
          </p>
          <p className="py-1 mr-1">
            <span className="font-bold">URL:</span> {url}
          </p>
        </div>
      ) : (
        <div>
          404 Not found.{" "}
          <Link className="font-bold" to="/">
            Voltar
          </Link>
        </div>
      )}
    </div>
  );
};

export default Details;
