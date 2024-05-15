import Sidenav from "../components/Sidenav";
import Post from "../components/post/Post";
import { useState, useEffect, useRef } from "react";
import {
  doc,
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { Note } from "../types/noteType";
import Success from "../components/notifications/Success";
import SidePanel from "../components/SidePanel";

import { db, notesRef } from "../config/firebase";
import {
  HashtagIcon,
  CodeBracketSquareIcon,
  PhotoIcon,
  DocumentCheckIcon,
  PlusCircleIcon,
  BellAlertIcon,
  ChevronDoubleDownIcon,
} from "@heroicons/react/24/outline";

const Dashboard = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [val, setVal] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [newNote, setNewNote] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setVal(event.target.value);
    setNewNote(event.target.value);
    console.log(event.target.value);
  };

  const editHandleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewNote(event.target.value);
    console.log(event.target.value);
  };

  useEffect(() => {
    if (textAreaRef.current != null) {
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }

    const getData = async () => {
      const querySnapshot = await getDocs(collection(db, "notes"));
      const documents: Note[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.get("name"),
        time: doc.get("time"),
      }));
      setNotes(documents);
    };
    getData();
  }, [val]);

  const addNote = (event: React.ChangeEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const addData = async () => {
      const noteObject = {
        name: newNote,
        time: new Date().toString(),
      };

      const docRef = await addDoc(notesRef, noteObject);
      console.log("Document written with ID: ", docRef.id);

      const newNoteObject: Note = {
        id: docRef.id,
        ...noteObject,
      };

      setNotes(notes.concat(newNoteObject));
      setSuccessMsg("Created successfully");
      setTimeout(() => {
        setSuccessMsg("");
      }, 3000);
      setNewNote("");
      setVal("");
    };
    addData();
  };

  const deleteNote = (id: string): void => {
    const deleteData = async () => {
      await deleteDoc(doc(db, "notes", id));
      setNotes(notes.filter((item) => item.id !== id));
      console.log(`Note ${id} has been deleted`);
    };

    deleteData();
  };

  const editNote = (
    event: React.ChangeEvent<HTMLFormElement>,
    id: string
  ): void => {
    event.preventDefault();
    const editData = async () => {
      const docRef = doc(db, "notes", id);
      await updateDoc(docRef, {
        name: newNote,
      });

      const docSnap = await getDoc(docRef);

      const newObject: Note = {
        id: docSnap.id,
        name: docSnap.get("name"),
        time: docSnap.get("time"),
      };

      setNotes(notes.map((note) => (note.id !== id ? note : newObject)));
    };

    editData();
  };

  return (
    <div className="w-full min-h-full">
      <div className="w-full transition-all mx-auto flex flex-row justify-center items-center pl-60">
        <Sidenav />
        <main className="w-full h-auto flex flex-col items-center justify-center shrink bg-gray-100">
          <div className="absolute mt-6 mr-6 top-0 right-0">
            <Success message={successMsg} setSuccessMsg={setSuccessMsg} />
          </div>
          <section className="w-full max-w-5xl bg-gray-100 px-4 flex gap-4 p-6 mb-0 pb-0 ">
            <div className="w-[calc(100%-16rem)] h-full mb-8">
              <form
                className="rounded-lg w-full h-full flex flex-col justify-start items-start px-4 py-2 border bg-white"
                onSubmit={addNote}
              >
                <div className="pb-2 flex flex-col justify-start items-start relative w-full h-auto max-h-[50vh] bg-inherit border-b ">
                  <textarea
                    className="w-full h-full my-2 ml-1 mt-4 text-base resize-none overflow-x-hidden overflow-y-auto bg-transparent outline-none whitespace-pre-wrap word-break"
                    placeholder="Create a note..."
                    rows={1}
                    value={val}
                    onChange={(e) => handleChange(e)}
                    ref={textAreaRef}
                    style={{ color: "#000" }}
                  ></textarea>
                  <div className="flex items-center my-2">
                    <HashtagIcon className="w-6 text-gray-600 ml-1" />
                    <CodeBracketSquareIcon className="w-6 text-gray-600 ml-2" />
                    <PhotoIcon className="w-6 text-gray-600 ml-2" />
                    <DocumentCheckIcon className="w-6 text-gray-600 ml-2" />
                  </div>
                </div>
                <div className="w-full py-4 flex justify-between items-center">
                  <span className="flex justify-center items-center bg-gray-100 hover:bg-gray-300 py-1 px-2 rounded-md border cursor-pointer">
                    <BellAlertIcon className="w-5 text-gray-700" />
                    <p className="text-sm font-medium text-gray-700 ml-2">
                      Reminders
                    </p>
                    <ChevronDoubleDownIcon className="w-5 text-gray-700 ml-2 mt-0.5" />
                  </span>
                  <button className="flex justify-center items-center bg-gray-100 hover:bg-gray-300 py-1 px-2 rounded-md border">
                    <p className="text-sm font-medium text-gray-700">Save</p>
                    <PlusCircleIcon className="w-6 text-gray-700 ml-1" />
                  </button>
                </div>
              </form>

              {notes.map((item) => (
                <Post
                  name={item.name}
                  time={item.time}
                  key={item.id}
                  deleteNote={() => deleteNote(item.id)}
                  setNewNote={setNewNote}
                  editNote={(e) => editNote(e, item.id)}
                  editHandleChange={(e) => editHandleChange(e)}
                />
              ))}
            </div>
            <SidePanel />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
