export const Header = (props:any) => {
  console.log(props.title)
  return (
    <>
      <div className="w-100 compTitle header-project d-flex flex-column align-items-center flex-md-row justify-content-md-between mt-5 mb-4 bg-whit rounded-3 p-4 gap-2 gap-md-0 shadow-sm dark-tabel">
        <h1 className="
        fw-lighter mb-2 mb-md-0 dark-p">{props.title}</h1>
      </div>
    </>
  );
};
