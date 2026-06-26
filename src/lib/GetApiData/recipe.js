const Baseurl = process.env.NEXT_PUBLIC_SERVER_URL


export const Getallrecipes = async () => {
 const res = await fetch(`${Baseurl}/api/recipes`)
 const result = await res.json()
 return result
}


export const Getspecificrecipes = async (id) => {
  const res = await fetch(`${Baseurl}/api/recipes?id=${id}`);
  const result = await res.json();
  return result;
};


export const Getspecificrecipesbylikes = async (likesCount) => {
  const res = await fetch(`${Baseurl}/api/recipes?likesCount=${likesCount}`);
  const result = await res.json();
  return result;
};


export const GetspecificrecipesByuserEmail = async (email) => {
  const res = await fetch(`${Baseurl}/api/recipes?email=${email}`);
  const result = await res.json();
  return result;
};
