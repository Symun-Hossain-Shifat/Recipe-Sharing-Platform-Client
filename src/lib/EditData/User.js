export const EditUserInfo = async (data, email) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user/${email}`,
    {
      method: "PATCH", 
      cache : "no-store" ,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  return await res.json();
}; 
