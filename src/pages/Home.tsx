import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <div className="flex flex-col gap-2 items-center justify-center h-dvh">
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <Link to={"/load-iframe"}>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Load Payment Iframe
          </button>
        </Link>
      </div>
    </>
  );
}

export default Home;
