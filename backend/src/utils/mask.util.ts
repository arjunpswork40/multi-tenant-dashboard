export const maskEmail = (email: string): string => {
  const [name, domain] = email.split("@");
  return "xxxxxx@" + domain;
};

export const maskPhone = (phone: string): string => {
  if (phone.length < 4) return "xxxxxxxx";
  return phone.slice(0, 2) + "xxxxxxxx" + phone.slice(-2);
};