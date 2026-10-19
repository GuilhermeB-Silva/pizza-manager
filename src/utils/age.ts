export const personAge = (data: string): number => {
  const [dd, mm, yy] = data.split("/");

  const validDate = `${mm}/${dd}/${yy}`;

  const currentDate = new Date();
  const birthdate = new Date(validDate);

  let age = currentDate.getFullYear() - birthdate.getFullYear();
  const month = currentDate.getMonth() - birthdate.getMonth();

  if (
    month < 0 ||
    (month === 0 && currentDate.getDate() < birthdate.getDate())
  ) {
    age--;
  }

  return age;
};
