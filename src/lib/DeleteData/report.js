export const Deletereport = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/report/${id}`,
    {
      method: "DELETE",
    }
  );

  return await res.json();
};