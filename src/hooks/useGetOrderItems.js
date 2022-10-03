import { useLayoutEffect, useState } from "react";
import { db } from "../firebase";

const useGetOrderItems = (user) => {
  const [orderItems, setOrderItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const resetOrderItems = () => {
    setOrderItems([]);
  };

  useLayoutEffect(() => {
    const observer = db
      .collection("users")
      .doc(user?.uid)
      .collection("orders")
      .orderBy("created", "desc")
      //using onsnapshot for get all updated documents in the collection
      .onSnapshot(
        (snapshot) => {
          if (snapshot.empty) {
            setOrderItems([]);
          } else {
            setOrderItems(
              snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
              }))
            );
          }
          setLoading(false);
        },
        (err) => {
          alert(err);
          setLoading(false);
        }
      );
    return observer;
  }, [user]);
  return { orderItems, resetOrderItems, orderItemsLoading: loading };
};
export default useGetOrderItems;
