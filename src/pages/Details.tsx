import { useEffect, useRef, useState } from "react";
import { useParams, useHistory, useLocation } from "react-router-dom";
import { RiCloseLine as CloseIcon } from "@react-icons/all-files/ri/RiCloseLine";
import { DetailedData } from "../../types";
import { useAppSelector } from "../redux/hooks";
import formatDate from "../utils/formatDate";
import handleBlockScroll from "../utils/handleBlockScroll";
import useClickOutside from "../utils/useClickOutside";
import { motion } from "framer-motion";
import LoadingSpinner from "../components/LoadingSpinner";

const Details = () => {
  const [detailed, setDetailed] = useState<DetailedData | null>(null);

  const { searchData } = useAppSelector((state) => state.searchReducer);

  const { id } = useParams<{ id: string }>();

  const history = useHistory();

  const location: any = useLocation();

  // Handle close modal
  const ref = useRef(null);
  const handleCloseButton = () => {
    handleBlockScroll(false);

    // If user came from within the dashboard goBack
    // If user came from URL push page 1
    location.state ? history.goBack() : history.push(`/page/1`);
  };
  useClickOutside(ref, handleCloseButton);

  // Filter the data that the params is requesting
  const filterData = () => {
    const newData = searchData.filter((item) => item.login.salt === id)[0];

    newData !== undefined && setDetailed(newData);
  };

  useEffect(() => {
    filterData();
  });

  // Block scroll on render
  useEffect(() => {
    handleBlockScroll(true);
  }, []);

  const name = `${detailed?.name.first} ${detailed?.name.last}`;
  const url = window.location.href;
  const gender = detailed?.gender === "male" ? "Male" : "Female";

  return (
    <motion.div
      key={detailed?.login.salt}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed left-0 top-0 flex items-center justify-center h-screen w-screen bg-opacity-50 bg-gray-700 blur-lg"
    >
      {detailed !== null ? (
        <div
          ref={ref}
          className="p-8 min-h-420 shadow-lg bg-gray-100 mt-20 pt-16 relative opacity-100"
        >
          <div className="flex items-center mx-auto rounded-full w-36 h-36 -mt-36 shadow-sm bg-gray-300">
            <img
              className="rounded-full w-36 text-center mx-auto self-center shadow-sm"
              src={detailed?.picture.large}
              alt={name}
            />
          </div>
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
            {formatDate(detailed?.dob.date || "", "EN")}
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
        <LoadingSpinner />
      )}
    </motion.div>
  );
};

export default Details;
