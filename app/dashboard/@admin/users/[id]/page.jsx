import UserForm from "@/components/(users)/UserForm";

export default async function singleUserPage(props) {
 
  const params = await props.params;
  const id = await params.id;
  const res = await fetch(`http://localhost:3000/users/${id}`)
  const user = await res.json();
  if (!user) {
    return <p className="text-red-500">User not found!</p>;
  }
  
  return (
    <>
      <UserForm userId={id} userData={user} />
    </>
  );
}
