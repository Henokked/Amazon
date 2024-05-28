import React, { useContext, useState, useEffect} from 'react'
import Header from '../../Components/Header/Header'
import LayOut from '../../Components/Layout/LayOut'
import { db } from '../../Utility/firebase'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import classes from "./Orders.module.css"
import ProductCard from '../../Components/product/ProductCard'


function Orders() {

  const [{user}, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([])
  useEffect(()=>{
    if (user) {
      const unsubscribe = db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data()
            }))
          );
        });

    }else{
        setOrders([])
    }

  },[])

  return (
    <>
    <LayOut>
    <section className={classes.container}>
      <div className={classes.orders_container}>
        <h2>Your Orders</h2>
        {
          orders?.length == 0 && <div style={{padding: "20px"}}>You don't have orders yet</div>
        }
        <div>
      {orders?.map((eachOrder, i) => {
        return (
          <div key={i}>
            <hr />
            <p>Order Id: {eachOrder?.id}</p>
            {eachOrder?.data?.basket?.map((order) => (
              <ProductCard
                flex={true}
                product={order}
                key={order.id}
              />
            ))}
          </div>
        );
      })}
    </div>
      </div>
    </section>
    </LayOut>
    </>
    
  )
}

export default Orders