import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalResults: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, pageSize, totalResults, onPageChange, onPageSizeChange }) => {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <>

    <div className="bg-inf container mt-4 mb-2   pt-2 pt-lg-2 pagination-container">
      <div className="row">
        <div className="col-md-12">
          <div className="d-flex justify-content-center justify-content-lg-end">
            <div className="d-flex bg-warnin flex-column flex-lg-row gap-4">

              <div className="d-flex flex-column justify-content-center align-items-center flex-lg-row gap-3 bg-primar me-lg-3 ">
                <div className="position-relative d-flex align-items-center ">
                  <span className="me-3 dark-p">Showing</span>
                  <select 
                  className="form-control rounded-5 custom-select dark-tabel dark-p"
                  value={pageSize} 
                  onChange={(e) => onPageSizeChange(Number(e.target.value))}
                  >
                    {[5, 10, 15, 20].map((size) => (
                          <option  className="dark-tabel " key={size} value={size}>
                            {size}
                          </option>
                        ))}
                  </select>
                  <i className="fa fa-chevron-down text-mute position-absolute select-icon  dark-tabel dark-icon"></i>
                </div>
                <div className='dark-p '>of &nbsp; {totalResults} &nbsp; Results</div>
              </div>

              <div className=" d-flex flex-column gap-4 align-items-center flex-lg-row pb-3 pb-md-0 dark-p ">
                <span className="me-lg-3 ">{`Page ${currentPage} of ${totalPages}  `}</span>
                <div className="d-flex gap-4 text-muted dark-icon ">  
                  <i onClick={handlePreviousPage} className={`fa-solid fa-chevron-left  border-1 p-2 px-3 rounded-pill select-page dark-tabel ${currentPage <= 1 ? 'disabled' : ''}`}></i>

                  <i onClick={handleNextPage} className={`fa-solid fa-chevron-right  border-1 p-2 px-3 rounded-pill select-page dark-tabel ${currentPage >= totalPages ? 'disabled' : ''}`}></i>
                </div>
              </div>

            </div>
            </div>
          </div>
        </div>
      </div>
    
    </>
  );
};

export default Pagination;
