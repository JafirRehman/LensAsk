const Error = () => {
  return (
    <div className="flex flex-col items-center  min-h-screen bg-gray-100">
      <div className="w-full mt-24 max-w-md text-center">
        <img
          src="/assets/error.png"
          alt="404"
          className="mx-auto h-[300px] w-[300px] object-cover"
        />
        <p className="text-lg font-semibold mt-2 text-gray-800">
          The page you were looking for doesn&apos;t exist.
        </p>
        <p className="text-sm text-gray-600 mt-1">
          You may have mistyped the address or the page may have moved.
        </p>
      </div>
    </div>
  );
};

export default Error;
