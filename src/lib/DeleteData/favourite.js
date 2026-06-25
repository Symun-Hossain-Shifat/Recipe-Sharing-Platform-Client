export const Deletefavourite = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/favourite/${id}`,
    {
      method: "DELETE",
    }
  );

  return await res.json();
};