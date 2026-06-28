

export const EditRecipeInfo = async ( NewData, id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/recipes/${id}`,
    {
      method: "PATCH",
      headers: {
        "content-type": "application/json", 
         
      },
      body: JSON.stringify(NewData),
    }
  );

  return await res.json();
};