import { db } from "../firebase";

export default async function getCustomerID(user) {
  let customerID = "";
  if (!user) return customerID;
  try {
    const doc = await db.collection("users").doc(user?.uid).get();
    if (doc.exists) {
      customerID = doc.data().customerID;
    }
  } catch (error) {
    alert(error.message);
  }
  return customerID;
}
