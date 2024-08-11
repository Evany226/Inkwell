interface ModalMaskProps {
  modalOpen: boolean;
  setModalOpen(arg: boolean): void;
  children: React.ReactNode;
  customClass?: string;
}

export function ModalMask({
  modalOpen,
  setModalOpen,
  children,
  customClass,
}: ModalMaskProps) {
  return (
    <>
      {modalOpen ? (
        <div
          className={
            customClass
              ? `${customClass}`
              : "fixed top-0 right-0 bottom-0 left-0 z-10 bg-black bg-opacity-50"
          }
          onClick={() => setModalOpen(false)}
        ></div>
      ) : null}
      {modalOpen ? <div> {children} </div> : null}
    </>
  );
}
