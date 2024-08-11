import React from 'react'
import noData from "../../../../assets/images/no-data.png"
interface DeleteDataProps {
  deleteItem: string;
}
const DeleteData: React.FC<DeleteDataProps> = ({ deleteItem }) => {
  return (
    <>
    <div className="text-center bg-inf p-4 dark-tabel">
      <img src={noData} className='mb-4' alt="delete" />
      <h3 className='dark-p'>Delete This {deleteItem}</h3>
      <p className="text-muted dark-p">
      are you sure you want to delete this item ? if you are sure just click on delete it
      </p>
    </div>
   </>
  )
}
export default DeleteData;