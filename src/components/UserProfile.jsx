import React from 'react';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from '../firebase/firebase.config';
import avatarImg from '../assets/avatar.png';
import { useGetOrderByEmailQuery } from '../redux/features/orders/ordersApi';
import { useFetchRealUserByUidQuery } from '../redux/features/real-users/realUsersApi';
import SmallBookDisplay from './SmallBookDisplay';
import UserProfileCard from './UserProfileCard';

function getMostCommonAddress(orders) {
    const addressCount = {};
    

    if (orders.length == 0) {
        return null
    }
    
    for (const order of orders) {
      
      const { city, country, state, zipcode } = order.address;
      
      const addressString = `${city}, ${state}, ${zipcode}, ${country}`;
  
      if (!addressCount[addressString]) {
        addressCount[addressString] = 0;
      }
      addressCount[addressString]++;
    }
  
    let mostCommon = null;
    let maxCount = 0;
  
    for (const addr in addressCount) {
      if (addressCount[addr] > maxCount) {
        maxCount = addressCount[addr];
        mostCommon = addr;
      }
    }
  
    return mostCommon; 
  }
  
function getMostCommonPhone(orders) {

    if (orders.length == 0) {
        return null
    }
    const phoneCount = {};
  
    for (const order of orders) {
      const phone = order.phone;
      if (!phoneCount[phone]) {
        phoneCount[phone] = 0;
      }
      phoneCount[phone]++;
    }
  
    let mostCommon = null;
    let maxCount = 0;
    for (const ph in phoneCount) {
      if (phoneCount[ph] > maxCount) {
        maxCount = phoneCount[ph];
        mostCommon = ph;
      }
    }
  
    return mostCommon;
  }
  
function getTenMostRecentProducts(orders) {

    if (orders.length == 0) {
        return null
    }
    
    const sortedOrders = [...orders].sort((a, b) => new Date(b.placedAt) - new Date(a.placedAt));
  
    const productsInChronologicalOrder = [];
    for (const order of sortedOrders) {
      
      productsInChronologicalOrder.push(...order.productIds);
    }
  
    
    return productsInChronologicalOrder.slice(0, 10);
}
  
function getTotalMoneySpent(orders) {
    if (orders.length == 0) {
        return 0
    }
    return orders.reduce((sum, order) => sum + order.totalPrice, 0);
  }

  
const UserProfile = () => {
    const [user, loading, error] = useAuthState(auth);
    if (loading) return <div>Loading user...</div>;
    if (error) return <div>Please refresh...</div>;
    if (!user) return <div>Please log in</div>;



    const { data: realUser, isLoading2, isError2 } = useFetchRealUserByUidQuery(user.uid);
    if (isLoading2) {
        return <div>Loading orders...</div>;
    }
    if (isError2) {
        return <div>Please refresh....</div>;
    }

    console.log("REAL USER")
    console.log(realUser)



    


    const {
      data: orders = [],
      isLoading,
      isError,
    } = useGetOrderByEmailQuery(user.email);
    if (isLoading) {
      return <div>Loading orders...</div>;
    }
    if (isError) {
      return <div>Error fetching orders</div>;
    }
  
    
    console.log('Orders:', orders);

    let email = user?.email 
    let user_id = user?.uid
    const username = realUser?.name
    const commonAddress = getMostCommonAddress(orders);
    const commonPhone = getMostCommonPhone(orders);
    const recentProducts = getTenMostRecentProducts(orders);
    const totalSpent = getTotalMoneySpent(orders);
    const userOrders = orders

    
  

    return (
        <>
        <UserProfileCard avatarImg={avatarImg} user={user} realUser={realUser} commonAddress={commonAddress} commonPhone={commonPhone}  totalSpent={totalSpent}/>
        
      {recentProducts?.length > 0 ? <SmallBookDisplay books={recentProducts} title={"Recently Bought"} /> : <div></div>}
      
      
      </>
    );
  };
  
  export default UserProfile;
  