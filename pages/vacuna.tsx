import Meta from "@/components/Meta";
import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function Home(): JSX.Element {
  const [data, setData] = useState<Record<string, any>>({ dosis: "0" });

  return (
    <>
      <Meta title="Vacuna" description="Passbook Generator" url="/vacunas" />
      <Navbar />
      <div>
        <main>
          <div className="max-w-md mx-auto my-10 bg-white p-5 rounded-md shadow-sm">
            <form action="api/vacuna/v1/generate" method="POST">
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  Nombre
                </label>
                <input
                  onInvalid={() => {
                    document
                      .getElementById("name")
                      .setCustomValidity("Por favor llena este campo");
                  }}
                  onChange={(event) => {
                    document.getElementById("name").setCustomValidity("");
                    setData({ ...data, name: event.target.value });
                  }}
                  value={data["name"]}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="John Doe"
                  required
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  Identificaci&oacute;n
                </label>
                <input
                  onInvalid={() => {
                    document
                      .getElementById("identifier")
                      .setCustomValidity("Por favor llena este campo");
                  }}
                  onChange={(event) => {
                    document.getElementById("identifier").setCustomValidity("");
                    setData({ ...data, identifier: event.target.value });
                  }}
                  value={data["identifier"]}
                  type="text"
                  name="identifier"
                  id="identifier"
                  placeholder="9-999-9999"
                  required
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="dosis"
                  className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  Dosis Aplicadas
                </label>
                <input
                  type="radio"
                  id="0"
                  name="dosis"
                  value="0"
                  className="mr-1"
                  checked={data["dosis"] === "0"}
                  onChange={(event) => {
                    setData({ ...data, dosis: event.target.value });
                  }}
                />
                <label htmlFor="0" className="mr-2">
                  0
                </label>
                <input
                  type="radio"
                  id="1"
                  name="dosis"
                  value="1"
                  className="mr-1"
                  checked={data["dosis"] === "1"}
                  onChange={(event) => {
                    setData({ ...data, dosis: event.target.value });
                  }}
                />
                <label htmlFor="1" className="mr-2">
                  1
                </label>
                <input
                  type="radio"
                  id="2"
                  name="dosis"
                  value="2"
                  className="mr-1"
                  checked={data["dosis"] === "2"}
                  onChange={(event) => {
                    setData({ ...data, dosis: event.target.value });
                  }}
                />
                <label htmlFor="2" className="mr-2">
                  2
                </label>
              </div>

              {data["dosis"] !== "0" && (
                <div className="mb-6">
                  <label
                    htmlFor="dosis"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    Vacuna
                  </label>
                  <input
                    type="radio"
                    id="0"
                    name="vacuna"
                    value="Pfizer"
                    className="mr-1"
                    checked={data["vacuna"] === "Pfizer"}
                    onChange={(event) => {
                      setData({ ...data, vacuna: event.target.value });
                    }}
                  />
                  <label htmlFor="0" className="mr-2">
                    Pfizer
                  </label>
                  <input
                    type="radio"
                    id="0"
                    name="vacuna"
                    value="Astrazeneca"
                    className="mr-1"
                    checked={data["vacuna"] === "Astrazeneca"}
                    onChange={(event) => {
                      setData({ ...data, vacuna: event.target.value });
                    }}
                  />
                  <label htmlFor="0" className="mr-2">
                    Astrazeneca
                  </label>
                </div>
              )}

              {data["dosis"] !== "0" && (
                <div className="mb-6">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                  >
                    Fecha de Aplicación
                  </label>
                  <input
                    onInvalid={() => {
                      document
                        .getElementById("date")
                        .setCustomValidity("Por favor llena este campo");
                    }}
                    onChange={(event) => {
                      document.getElementById("name").setCustomValidity("");
                      setData({ ...data, date: event.target.value });
                    }}
                    value={data["date"]}
                    type="date"
                    name="date"
                    id="date"
                    required
                    className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                  />
                </div>
              )}

              <div className="mb-6">
                <label
                  htmlFor="url"
                  className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
                >
                  URL Panama Digital
                </label>
                <input
                  onInvalid={() => {
                    document
                      .getElementById("url")
                      .setCustomValidity("Por favor llena este campo");
                  }}
                  onChange={(event) => {
                    document.getElementById("url").setCustomValidity("");
                    setData({ ...data, url: event.target.value });
                  }}
                  value={data["url"]}
                  type="text"
                  name="url"
                  id="url"
                  placeholder="https://www.panamadigital.gob.pa/DatosUsuario?...."
                  required
                  className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                />
              </div>

              <div className="mb-6">
                <button
                  type="submit"
                  className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none"
                >
                  Generar
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
