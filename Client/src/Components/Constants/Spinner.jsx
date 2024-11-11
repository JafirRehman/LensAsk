/* eslint-disable react/prop-types */
const Spinner = ({ status }) => {
  return (
    <div
      className={`flex justify-center items-center ${
        !status && "min-h-screen"
      }`}
    >
      <div
        className={`animate-spin h-8 w-8 border-t-4 border-black rounded-full`}
      ></div>
    </div>
  );
};

export default Spinner;
