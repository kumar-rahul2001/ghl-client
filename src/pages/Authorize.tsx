import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function Authorize() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );

  useEffect(() => {
    const code = searchParams.get("code");

    if (code) {
      axios
        .post(`http://localhost:3000/api/v1/oauth/${code}`)
        .then(() => setStatus("success"))
        .catch(() => setStatus("error"));
    } else {
      setStatus("error");
    }
  }, [searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md text-center">
        {status === "loading" && (
          <>
            <div className="loader border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin mx-auto mb-4" />
            <h2 className="text-lg font-medium text-gray-700">
              Authorizing...
            </h2>
          </>
        )}

        {status === "success" && (
          <>
            <h1 className="text-3xl font-bold text-green-600 mb-2">
              Thank You!
            </h1>
            <p className="text-gray-600">
              You have successfully authorized. You may close this window.
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <h1 className="text-3xl font-bold text-red-600 mb-2">Oops!</h1>
            <p className="text-gray-600">
              Something went wrong. Please try again.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Authorize;
