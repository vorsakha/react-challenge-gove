function formatDate(date: string, standard: "EN" | "PT") {
  const data = new Date(date),
    day = data.getDate().toString(),
    dayF = day.length === 1 ? "0" + day : day,
    month = (data.getMonth() + 1).toString(),
    monthF = month.length === 1 ? "0" + month : month,
    year = data.getFullYear();

  let formattedDate;

  switch (standard) {
    case "PT":
      formattedDate = dayF + "/" + monthF + "/" + year;
      break;

    case "EN":
      formattedDate = monthF + "/" + dayF + "/" + year;
      break;

    default:
      break;
  }

  return formattedDate;
}

export default formatDate;
