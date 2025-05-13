import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

interface Credentials {
  key_id: string;
  key_secret: string;
}

const credentialsSchema = Yup.object().shape({
  key_id: Yup.string().required("Key ID is required"),
  key_secret: Yup.string().required("Key Secret is required"),
});

const SetCredentials = () => {
  const [testInitialValues, setTestInitialValues] = useState<Credentials>({
    key_id: "",
    key_secret: "",
  });

  const [liveInitialValues, setLiveInitialValues] = useState<Credentials>({
    key_id: "",
    key_secret: "",
  });

  const [loading, setLoading] = useState<{ test: boolean; live: boolean }>({
    test: false,
    live: false,
  });

  useEffect(() => {
    // Fetch credentials from server on mount
    axios.get("/api/v1/credentials").then((res) => {
      setTestInitialValues(res.data.test);
      setLiveInitialValues(res.data.live);
    });
  }, []);

  const handleSubmit = async (
    values: Credentials,
    type: "test" | "live",
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    setLoading((prev) => ({ ...prev, [type]: true }));
    try {
      const res = await axios.post(`/api/v1/credentials/${type}`, values);
      if (type === "test") {
        setTestInitialValues(res.data);
      } else {
        setLiveInitialValues(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading((prev) => ({ ...prev, [type]: false }));
      setSubmitting(false);
    }
  };

  const renderForm = (
    title: string,
    type: "test" | "live",
    initialValues: Credentials
  ) => (
    <div className="w-full max-w-md bg-white shadow-md rounded-xl p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">{title}</h2>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={credentialsSchema}
        onSubmit={(values, { setSubmitting }) =>
          handleSubmit(values, type, setSubmitting)
        }
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-600">
                Key ID
              </label>
              <Field
                type="text"
                name="key_id"
                className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="key_id"
                component="div"
                className="text-sm text-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600">
                Key Secret
              </label>
              <Field
                type="password"
                name="key_secret"
                className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="key_secret"
                component="div"
                className="text-sm text-red-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || loading[type]}
              className={`w-full flex items-center justify-center px-4 py-2 font-semibold text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 transition duration-200 ${
                isSubmitting || loading[type]
                  ? "opacity-70 cursor-not-allowed"
                  : ""
              }`}
            >
              {loading[type] ? (
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              ) : null}
              {loading[type] ? "Saving..." : "Save Credentials"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 flex flex-col items-center justify-center gap-10 px-4 py-10">
      <h1 className="text-3xl font-bold text-gray-800">
        Set Razorpay Credentials
      </h1>
      <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl">
        {renderForm("Test Credentials", "test", testInitialValues)}
        {renderForm("Live Credentials", "live", liveInitialValues)}
      </div>
    </div>
  );
};

export default SetCredentials;
