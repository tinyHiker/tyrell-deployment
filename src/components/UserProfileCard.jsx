import React from 'react';
import { HiOutlineLocationMarker, HiOutlinePhone, HiOutlineMail, HiOutlineIdentification } from 'react-icons/hi';
import { AiOutlineDollarCircle } from 'react-icons/ai';

const UserProfileCard = ({
  avatarImg,
  user,
  realUser,
  commonAddress,
  commonPhone,
  totalSpent,
}) => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg mt-6">
      <div className="flex flex-col md:flex-row gap-8">
        
        <div className="md:w-1/3 flex flex-col items-center md:items-start">
          
          <img
            src={avatarImg}
            alt="Avatar"
            className="w-40 h-40 rounded-full ring-4 ring-blue-500 object-cover mb-2"
          />
          
          <h2 className="text-2xl font-bold mt-4 mr-2 text-blue-600">{realUser?.name}</h2>
        </div>

        
        <div className="md:w-2/3 flex flex-col justify-center space-y-4">
          
          <div>
            <div className="flex items-center text-blue-600">
              <HiOutlineMail className="mr-2 text-xl" />
              <h3 className="font-semibold">Email</h3>
            </div>
            <p className="text-gray-700 ml-7">{user?.email}</p>
          </div>

         
          <div>
            <div className="flex items-center text-blue-600">
              <HiOutlineIdentification className="mr-2 text-xl" />
              <h3 className="font-semibold">User ID</h3>
            </div>
            <p className="text-gray-700 ml-7">{user?.uid}</p>
          </div>

         

         
          <div>
            <div className="flex items-center text-blue-600">
              <AiOutlineDollarCircle className="mr-2 text-xl" />
              <h3 className="font-semibold">Total Amount Spent</h3>
            </div>
            <p className="text-lg font-semibold text-green-600 ml-7">
              ${totalSpent?.toFixed(2)}
            </p>
          </div>
        </div>
        <div  className="md:w-2/3 flex flex-col justify-center space-y-4" >

             

            <div>
            <div className="flex items-center text-blue-600">
              <AiOutlineDollarCircle className="mr-2 text-xl" />
              <h3 className="font-semibold">Username</h3>
            </div>
            <p className="text-gray-700 ml-7">
              {realUser?.name}
            </p>
          </div>



          {commonAddress && (
            <div>
              <div className="flex items-center text-blue-600">
                <HiOutlineLocationMarker className="mr-2 text-xl" />
                <h3 className="font-semibold">Address</h3>
              </div>
              <p className="text-gray-700 ml-7">{commonAddress}</p>
            </div>
          )}

          
          {commonPhone && (
            <div>
              <div className="flex items-center text-blue-600">
                <HiOutlinePhone className="mr-2 text-xl" />
                <h3 className="font-semibold">Phone</h3>
              </div>
              <p className="text-gray-700 ml-7">{commonPhone}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
