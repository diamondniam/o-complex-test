import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";

export default function Modal({ title, children, onClose, isOpen }) {
  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed w-screen h-screen top-0 left-0 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="fixed inset-0 bg-black/50 flex justify-center items-center"
            onClick={handleClose}
          ></div>

          <div className="fixed flex flex-col gap-3 bg-[var(--primary-darker)] p-3 sm:rounded-lg shadow-sm md:w-[500px] w-full max-sm:h-full">
            <div className="flex justify-between items-center gap-3">
              <p className="textM">{title}</p>

              <div
                className="cursor-pointer flex-none brightness-0"
                onClick={handleClose}
              >
                <Image src={"/close.svg"} alt="close" width={20} height={20} />
              </div>
            </div>

            <div>{children}</div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
