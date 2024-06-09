import Sidenav from "../components/nav/Sidenav";
import { useEffect, useState } from "react";
import { Note } from "../types/noteType";
import { db, auth } from "../config/firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import TrashPost from "../components/nav/TrashPost";
import LoadingSpinner from "../components/LoadingSpinner";
import { useTheme } from "../functions/useTheme";

const Trash = () => {
  const [trash, setTrash] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { theme } = useTheme();
  // const [modalOpen, setModalOpen] = useState<boolean>(false);

  const user = auth.currentUser;

  useEffect(() => {
    console.log(theme);
    const getData = async (uid: string) => {
      const trashRef = collection(db, "users", uid, "trash");
      const querySnapshot = await getDocs(trashRef);
      const documents: Note[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.get("name"),
        time: doc.get("time"),
        tagArr: doc.get("tagArr"),
        codeText: doc.get("codeText"),
      }));
      setTrash(documents);
      setIsLoading(false);
    };

    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        getData(user.uid);
        // ...
        console.log("uid", user.uid);
      } else {
        // User is signed out
        // ...
        console.log("user is logged out");
      }
    });
  }, [theme]);

  const restoreNote = (id: string): void => {
    const restoreData = async (uid: string, id: string) => {
      const trashRef = doc(db, "users", uid, "trash", id);
      const checkRef = collection(db, "users", uid, "trash", id, "checkList");

      const notesRef = collection(db, "users", uid, "notes");

      const trashSnapshot = await getDoc(trashRef);
      const newRef = await addDoc(notesRef, trashSnapshot.data());

      const checkRefCopy = collection(
        db,
        "users",
        uid,
        "notes",
        newRef.id,
        "checkList"
      );

      const querySnapshot = await getDocs(checkRef);

      const addPromises = querySnapshot.docs.map((document) => {
        addDoc(checkRefCopy, document.data());
      });

      const deletePromises = querySnapshot.docs.map((document) =>
        deleteDoc(doc(db, "users", uid, "trash", id, "checkList", document.id))
      );

      await Promise.all(addPromises);
      await Promise.all(deletePromises);
      await deleteDoc(trashRef);

      setTrash(trash.filter((item) => item.id !== id));

      console.log(`Trash ${id} has been restored`);
    };

    if (user) {
      restoreData(user.uid, id);
    }
  };

  const deleteNote = (id: string) => {
    const deleteData = async (uid: string, id: string) => {
      const trashRef = doc(db, "users", uid, "trash", id);
      const checkRef = collection(db, "users", uid, "trash", id, "checkList");

      const querySnapshot = await getDocs(checkRef);

      const deletePromises = querySnapshot.docs.map((document) =>
        deleteDoc(doc(db, "users", uid, "trash", id, "checkList", document.id))
      );

      await Promise.all(deletePromises);
      await deleteDoc(trashRef);

      setTrash(trash.filter((item) => item.id !== id));
      console.log(`Trash ${id} has been deleted`);
    };

    if (user) {
      deleteData(user.uid, id);
    }
  };

  return (
    <>
      <div className="w-full min-h-full">
        <div className="w-full transition-all mx-auto flex flex-col justify-center items-center pl-60 xs:pl-0 sm:pl-0">
          <Sidenav />
          <main className="w-full h-auto flex flex-col items-center justify-center bg-gray-100 dark:bg-zinc-900">
            <section className="w-full max-w-5xl px-4 flex-col p-6 mb-0 pb-0">
              <div className="w-[85%] h-full rounded-lg bg-white border py-6 px-8 flex flex-col space-y-2 dark:bg-zinc-800 dark:border-zinc-700 xs:w-full sm:w-full">
                <div className="bg-white dark:bg-zinc-800">
                  <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-300">
                    Trash
                  </h1>

                  <div className="w-full flex-col ">
                    <h2 className="text-base text-gray-700 font-medium dark:text-gray-400">
                      All items here will be deleted automatically in 30 days.
                    </h2>
                  </div>
                </div>
              </div>

              <div className="w-[85%] h-full xs:w-full sm:w-full ">
                {isLoading ? (
                  <div>
                    <LoadingSpinner />
                  </div>
                ) : (
                  <>
                    {trash.map((item) => (
                      <TrashPost
                        key={item.id}
                        item={item}
                        restoreNote={restoreNote}
                        deleteNote={deleteNote}
                        // setModalOpen={setModalOpen}
                        // modalOpen={modalOpen}
                      />
                    ))}
                  </>
                )}
              </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

export default Trash;
