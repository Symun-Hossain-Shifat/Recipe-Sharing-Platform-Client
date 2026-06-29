

const Baseurl = process.env.NEXT_PUBLIC_SERVER_URL;

export const Getallrecipes = async (
  category = "all",
  page = 1,
  perPage = 5
) => {
  let url = `${Baseurl}/api/recipes?page=${page}&perPage=${perPage}`;

  if (category !== "all") {
    url = `${Baseurl}/api/recipes?page=${page}&perPage=${perPage}&category=${category}`;
  }

  const res = await fetch(url, {
    cache: "no-store",
  });

  return await res.json();
};


export const Getspecificrecipes = async (id) => {
  const res = await fetch(`${Baseurl}/api/recipes?id=${id}` );
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
