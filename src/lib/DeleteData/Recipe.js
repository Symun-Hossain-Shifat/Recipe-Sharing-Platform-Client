export const DeleteRecipe = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/recipes/${id}`,
    {
      method: "DELETE",
    }
  );

  return await res.json();
};