import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { DetailedData } from "../../types";
import { useAppSelector } from "../redux/hooks";
import formatDate from "../utils/formatDate";

const Details = () => {
  const [detailed, setDetailed] = useState<DetailedData | null>(null);

  const { id } = useParams<{ id: string }>();

  const { data } = useAppSelector((state) => state.apiReducer);

  const filterData = () => {
    const newData = data.filter((item) => item.login.salt === id)[0] || null;

    setDetailed(newData);
  };

  useEffect(() => {
    filterData();
  });

  const name = `${detailed?.name.first} ${detailed?.name.last}` || "";
  const url = window.location.href;
  const gender = detailed?.gender === "male" ? "Masculino" : "Feminino";

  return (
    <div className="absolute top-0 flex items-center justify-center h-screen w-screen bg-opacity-40 bg-gray-700 blur-lg">
      {detailed !== null ? (
        <div className="p-8 rounded shadow-md bg-gray-300 mt-20 pt-16 relative opacity-100">
          <img
            className="rounded-full w-36 -mt-36 mx-auto shadow-sm"
            src={detailed?.picture.large}
            alt={name}
          />
          <Link className="font-bold absolute right-0 top-0 p-4 py-2" to="/">
            X
          </Link>
          <p className="py-1 mr-1">
            <span className="font-bold">Nome:</span> {name}
          </p>
          <p className="py-1 mr-1">
            <span className="font-bold">Email:</span> {detailed?.email}
          </p>
          <p className="py-1 mr-1">
            <span className="font-bold">Gênero:</span> {gender}
          </p>
          <p className="py-1 mr-1">
            <span className="font-bold">Data de nascimento:</span>{" "}
            {formatDate(detailed?.dob.date || "")}
          </p>
          <p className="py-1 mr-1">
            <span className="font-bold">Telefone:</span> {detailed?.phone}
          </p>
          <p className="py-1 mr-1">
            <span className="font-bold">Nacionalidade:</span> {detailed?.nat}
          </p>
          <p className="py-1 mr-1">
            <span className="font-bold">Endereço:</span>{" "}
            {detailed?.location.street.name}-{detailed?.location.street.number},{" "}
            {detailed?.location.city}, {detailed?.location.state},{" "}
            {detailed?.location.country}
          </p>
          <p className="py-1 mr-1">
            <span className="font-bold">ID:</span> {id}
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
