const Baseurl = process.env.NEXT_PUBLIC_SERVER_URL

export const Getspecificuser = async (role) => {
  const res = await fetch(`${Baseurl}/api/user?role=${role}`);
  const result = await res.json();
  return result;
};


export const Getspecificuserbystatus = async (isPremium) => {
  const res = await fetch(`${Baseurl}/api/user?isPremium=${isPremium}`);
  const result = await res.json();
  return result;
};