import Meta from "@/components/Meta";
import Navbar from "@/components/Navbar";
import { useState } from "react";

export default function Home(): JSX.Element {
  const [data, setData] = useState<Record<string, any>>({ dosis: "0" });

  const onChange = (id: string, value: string) => {
    setData({ ...data, [id]: value });
  };

  return (
    <>
      <Meta title="Vacuna" description="Passbook Generator" url="/vacunas" />
      <Navbar />
      <div>
        <main>
          <div className="max-w-md mx-auto my-10 bg-white p-5 rounded-md shadow-sm">
            <form action="api/vacuna/v1/generate" method="POST">
              <div className="mb-6">
                <TextField
                  label="Nombre"
                  id="name"
                  htmlFor="Nombre"
                  placeholder="John Doe"
                  value={data["name"]}
                  onChange={onChange}
                />
              </div>

              <div className="mb-6">
                <TextField
                  label="Identificaci&oacute;n"
                  htmlFor="Identificador"
                  id="identifier"
                  placeholder="9-999-9999"
                  value={data["identifier"]}
                  onChange={onChange}
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
                      (document.getElementById(
                        "date"
                      ) as any).setCustomValidity("Por favor llena este campo");
                    }}
                    onChange={(event) => {
                      (document.getElementById(
                        "date"
                      ) as any).setCustomValidity("");
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
                <TextField
                  label="URL Panama Digital"
                  htmlFor="url"
                  id="url"
                  placeholder="https://www.panamadigital.gob.pa/DatosUsuario?...."
                  value={data["url"]}
                  onChange={onChange}
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

interface TextFieldProps {
  id: string;
  label: string;
  htmlFor: string;
  placeholder: string;
  value: string;
  onChange: (id: string, value: string) => void;
}

function TextField({
  id,
  label,
  htmlFor,
  placeholder,
  value,
  onChange,
}: TextFieldProps): JSX.Element {
  return (
    <>
      <label
        htmlFor={htmlFor}
        className="block mb-2 text-sm text-gray-600 dark:text-gray-400"
      >
        {label}
      </label>
      <input
        onInvalid={() => {
          (document.getElementById(id) as any).setCustomValidity(
            "Por favor llena este campo"
          );
        }}
        onChange={(event) => {
          (document.getElementById(id) as any).setCustomValidity("");
          onChange(id, event.target.value);
        }}
        value={value}
        type="text"
        name={id}
        id={id}
        placeholder={placeholder}
        required
        className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
      />
    </>
  );
}
