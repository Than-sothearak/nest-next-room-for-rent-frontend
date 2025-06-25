"use server"
export async function requestService (prevState, formData) {
    try {
         const session = await auth();
          if (!session) {
            return console.log("Access denied! you are not login");
          }
        
        return {sucess: "Request has been sent"}

    } catch (err) {
return {err: 'Fieled to requesting service!'}
    }
}