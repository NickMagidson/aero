import React from "react";

const UpdatesModal: React.FC = () => {
  const [showModal, setShowModal] = React.useState(false);
  return (
    <>
      <button
        className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
        type="button"
        onClick={() => setShowModal(true)}
      >
        Updates
      </button>
      {showModal ? (
        <>
          <div
            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto max-w-3xl ">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full  outline-none focus:outline-none
              bg-slate-950  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-50  border-gray-100" >
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl text-white font-semibold">
                    Updates to come
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-10 flex-auto">
                  <ul className="list-disc">
                    <li className="text-slate-200 text-lg leading-relaxed">Smoother / faster rendering of the map. </li>
                    <li className="text-slate-200 text-lg leading-relaxed">Color chart to visualize AQI scale. </li>
                    <li className="text-slate-200 text-lg leading-relaxed">User locations set as the default coordinates.</li>
                    <li className="text-slate-200 text-lg leading-relaxed">Bubble overlays with AQI for some locations.</li>
                    <li className="text-slate-200 text-lg leading-relaxed">A drag and droppable pin that fetches live air data.</li>
                    <li className="text-slate-200 text-lg leading-relaxed">Data visualization: Graph for historical air pollution.</li>
                  </ul>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}

export default UpdatesModal;