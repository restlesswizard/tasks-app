import { createContext, useState, useContext, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useTasks } from "../TaskProdiver/TaskProdiver";
import SVG_Cross from "../../components/UI/svg/cross";
import SVG_Arrow from "../../components/UI/svg/arrow";

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [modalType, setModalType] = useState(null); // types: add, settings, edit
  const [modalData, setModalData] = useState(null);
  const [visible, setVisible] = useState(false); // setting modal visibility
  const unmountTimerRef = useRef(null); // reference for cancel timeout timer to avoid memory leaks
  const prevActiveRef = useRef(null); // keep previous active element to return focus on it when modal will close
  const textareaRef = useRef(null); // erase text when task is added

  const { addTask, updateTask } = useTasks();
  // const { closeTask } = useModal();
  const [text, setText] = useState("");

  const open = (type, data = null) => {
    prevActiveRef.current = document.activeElement; // save focused element to restore later

    setModalType(type); // mount modal
    setModalData(data); // data for editing
    setText(data?.text || ""); // fill textarea with task data if it has some
    requestAnimationFrame(() => setVisible(true)); // show on next tick, allowing DOM to mount modal (trigger CSS transition)

    document.body.style.overflow = "hidden"; // lock body scroll
  };

  const close = () => {
    document.body.style.overflow = ""; // immediatly restore body scroll
    setVisible(false); // off visibility, wait animation end and unmount
    clearTimeout(unmountTimerRef.current);

    unmountTimerRef.current = setTimeout(() => {
      setModalType(null); // unmount modal AFTER animation
      prevActiveRef.current?.focus?.();
    }, 300); // maybe I should do timing via variable (also use it at classname in duration)?
  };

  // add task handler inside modal
  const handleAdd = () => {
    if (text.trim()) {
      addTask({ text, date: new Date().toLocaleString });
      setText("");
      close();
    }
  };

  const handleEdit = () => {
    if (modalData && text.trim()) {
      updateTask(modalData.id, { text });
      close();
    }
  };

  // cleanup on case if ModalProvider will unmount, timer and scroll will not lock
  useEffect(() => {
    return () => {
      clearTimeout(unmountTimerRef.current);
      document.body.style.overflow = "";
    };
  }, []);

  // close on Esc
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape" && modalType) close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modalType]);

  // if "add" type modal is opened - set focus on textarea
  useEffect(() => {
    if (modalType === "add") {
      requestAnimationFrame(() => textareaRef.current?.focus());
    }
  }, [modalType]);

  // if edit and it has data - pass text data to modal textarea
  useEffect(() => {
    if (modalType === "edit" && modalData) {
      setText(modalData.text);
    }
  }, [modalType, modalData]);

  return (
    <ModalContext.Provider value={{ open, close }}>
      {children}

      {createPortal(
        modalType && (
          //   overlay - start
          <div
            className={`bg-[#161616c2] inset-0 p-4 flex items-center justify-center fixed z-50 transition-opacity duration-300
          ${visible ? "opacity-100" : "opacity-0"}
          `}
            /* close on click outside modal, meaning that click was on overlay */
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) {
                close();
              }
            }}
            aria-hidden={!modalType}
          >
            {/* common container - start */}
            <div className="max-w-[768px] w-full bg-[#333] ml-auto mr-auto rounded-lg p-4 flex flex-col gap-y-4 relative">
              {/* header - start */}
              <div className="grid grid-cols-[1fr_56px] gap-x-4 items-center">
                <h2 className="text-xl font-semibold uppercase">
                  {modalType === "add" && "Add new task"}
                  {modalType === "edit" && "Edit task"}
                  {modalType === "settings" && "Settings"}
                </h2>
                <button
                  className="flex items-center justify-center bg-[#222] aspect-square rounded-lg"
                  onClick={close}
                >
                  <SVG_Cross color={'text-red-500'}/>
                </button>
              </div>
              {/* header - end */}

              {/* body - start */}
              {modalType === "add" && (
                <div className="grid grid-cols-[1fr_56px] gap-x-4">
                  <textarea
                    name="add_task"
                    id="add_task"
                    rows={5}
                    className="flex w-full border-2 border-[#444] rounded-lg p-4 bg-[#222] min-h-14 max-h-[70vh]"
                    onChange={(e) => setText(e.target.value)}
                  ></textarea>
                  <button
                    className="flex items-center justify-center bg-green-800 rounded-lg"
                    onClick={handleAdd}
                  >
                    <svg
                      className="w-6 h-6 text-white"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="5" y1="12" x2="19" y2="12" />
                      <polyline points="12 5 19 12 12 19" />
                    </svg>
                  </button>
                </div>
              )}

              {modalType === "edit" && (
                <div className="grid grid-cols-[1fr_56px] gap-x-4">
                  <textarea
                    name="edit_task"
                    id="edit_task"
                    value={text}
                    rows={5}
                    className="flex w-full border-2 border-[#444] rounded-lg p-4 bg-[#222] min-h-14 max-h-[70vh]"
                    onChange={(e) => setText(e.target.value)}
                  ></textarea>
                  <button
                    className="flex items-center justify-center bg-green-800 rounded-lg"
                    onClick={handleEdit}
                  >
                    <SVG_Arrow />
                  </button>
                </div>
              )}

              {modalType === "settings" && (
                <div className="text-white">
                  <p>Some settings here</p>
                </div>
              )}
              {/* body - end */}
            </div>
            {/* common container - end */}
          </div>
          // overlay - end
        ),
        document.body
      )}
    </ModalContext.Provider>
  );
}

// This will export current context to all app
export function useModal() {
  return useContext(ModalContext);
}

// +------------------------+
// |   App / any component  |
// |   (button calls        |
// |   useModal().open)     |
// +-----------+------------+
//             |
//             | call open('add' | 'settings')
//             v
// +-----------+------------+
// |   ModalProvider         | <- Provider makes open/close available for everyone in App
// |   - modalType           |
// |   - visible             |
// |   - prevActiveRef       |
// |   - unmountTimerRef     |
// +-----------+------------+
//             |
//             |  setModalType('add') -> React renders modal
//             v
// +-----------+------------+
// |   React.createPortal    | <- rendering in document.body
// +-----------+------------+
//             |
//             | conditional render: modalType && JSX модалки
//             v
// +-----------+------------+
// |   Modal Overlay div     | <- what we see on a screen
// |   - opacity: 0/100      |
// |   - transition-opacity  |
// |   - onMouseDown=close   |
// +-----------+------------+
//             |
//             | inside:
//             v
// +-----------+------------+
// |  Modal Container        |
// |  - Header               |
// |  - Body (textarea / settings)
// |  - Close Button         |
// +-------------------------+
