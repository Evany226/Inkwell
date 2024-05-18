import Sidenav from "../components/Sidenav";
import Post from "../components/post/Post";
import React, { useState, useEffect, useRef } from "react";
import {
  doc,
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { Note } from "../types/noteType";
import Success from "../components/notifications/Success";
import SidePanel from "../components/SidePanel";
import TagModal from "../components/tags/TagModal";
import TagButton from "../components/post/buttons/TagButton";
import { useNavigate } from "react-router-dom";

import { db } from "../config/firebase";
import {
  CodeBracketSquareIcon,
  PhotoIcon,
  DocumentCheckIcon,
  BellAlertIcon,
  ChevronDoubleDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "@heroicons/react/16/solid";

const Dashboard = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [val, setVal] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [filtered, setFiltered] = useState<Note[]>([]);
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [newNote, setNewNote] = useState<string>("");
  const [newContent, setNewContent] = useState<string>("");
  const [successMsg, setSuccessMsg] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);
  const [tagValue, setTagValue] = useState<string>("");
  const [newTags, setNewTags] = useState<string[]>([]);

  const uniqueTags: string[] = [];
  notes.forEach((note) => note.tagArr.map((item) => uniqueTags.push(item)));

  const tagItems = [...new Set(uniqueTags)];
  console.log(tagItems);

  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setVal(event.target.value);
    setNewNote(event.target.value);
    console.log(event.target.value);
  };

  const editHandleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewContent(event.target.value);
    console.log(event.target.value);
  };

  const tagHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTagValue(event.target.value);
    console.log(event.target.value);
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  useEffect(() => {
    if (textAreaRef.current != null) {
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }

    const getData = async (uid: string) => {
      const notesRef = collection(db, "users", uid, "notes");
      const querySnapshot = await getDocs(notesRef);
      const documents: Note[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.get("name"),
        time: doc.get("time"),
        tagArr: doc.get("tagArr"),
      }));
      setNotes(documents);
      setFiltered(documents);
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
  }, [val]);

  const addNote = (event: React.ChangeEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const addData = async (uid: string) => {
      const noteObject = {
        name: newNote,
        time: new Date().toString(),
        tagArr: tags,
      };

      const notesRef = collection(db, "users", uid, "notes");
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
      setTags([]);
    };
    if (user) {
      addData(user.uid);
    }
  };

  const deleteNote = (id: string): void => {
    const deleteData = async (uid: string) => {
      const notesRef = doc(db, "users", uid, "notes", id);
      await deleteDoc(notesRef);
      setNotes(notes.filter((item) => item.id !== id));
      console.log(`Note ${id} has been deleted`);
    };

    if (user) {
      deleteData(user.uid);
    }
  };

  const editNote = (
    event: React.ChangeEvent<HTMLFormElement>,
    id: string
  ): void => {
    event.preventDefault();
    const editData = async (uid: string) => {
      const docRef = doc(db, "users", uid, "notes", id);
      await updateDoc(docRef, {
        name: newContent,
        tagArr: newTags,
      });

      const docSnap = await getDoc(docRef);

      const newObject: Note = {
        id: docSnap.id,
        name: docSnap.get("name"),
        time: docSnap.get("time"),
        tagArr: docSnap.get("tagArr"),
      };

      setNotes(notes.map((note) => (note.id !== id ? note : newObject)));
    };

    if (user) {
      editData(user.uid);
    }
  };

  const addTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagValue !== "") {
      setTags([...tags, tagValue]);
      setTagValue("");
    }
  };

  const removeTags = (tagName: string) => {
    setTags(tags.filter((tag) => tag !== tagName));
  };

  const filterTags = (tag: string) => {
    setFilterOpen(true);

    const newItem = filtered.filter((note) => {
      return note.tagArr.includes(tag) ? note : null;
      // comparing category for displaying data
    });
    setFiltered(newItem);
  };

  return (
    <div className="w-full min-h-full">
      {modalOpen ? (
        <div
          className="fixed top-0 right-0 bottom-0 left-0 z-10 bg-black bg-opacity-50"
          onClick={() => setModalOpen(false)}
        ></div>
      ) : null}
      {modalOpen ? (
        <TagModal
          tagValue={tagValue}
          tagHandleChange={(e) => tagHandleChange(e)}
          addTags={(e) => addTags(e)}
          tags={tags}
          removeTags={removeTags}
          setModalOpen={setModalOpen}
        />
      ) : null}
      <div className="w-full transition-all mx-auto flex flex-row justify-center items-center pl-60">
        <Sidenav handleLogout={handleLogout} />
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
                  <div className="flex w-full my-1 space-x-2">
                    {tags.map((tag) => (
                      <div className="text-base flex items-center bg-gray-100 border border-gray-300 px-2 rounded-md">
                        <p>{tag}</p>
                        <XMarkIcon
                          className="w-4 mt-0.5 ml-1 cursor-pointer text-gray-500"
                          onClick={() => removeTags(tag)}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center my-2">
                    <TagButton setModalOpen={setModalOpen} />
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
                    <PlusCircleIcon className="w-4 text-gray-600 ml-1 " />
                  </button>
                </div>
              </form>

              {filterOpen ? (
                <div className="px-4 py-1 mt-4 w-full flex items-center">
                  <p className="text-sm">Filters:</p>
                  <div className="ml-3 w-full flex">
                    <button
                      className="bg-red-300 px-3 py-0.5 rounded"
                      onClick={() => {
                        setFilterOpen(false);
                        setFiltered(notes);
                      }}
                    >
                      <p className="text-sm text-red-800 font-medium">Reset</p>
                    </button>
                  </div>
                </div>
              ) : null}

              {filterOpen ? (
                <div>
                  {filtered.map((item) => (
                    <Post
                      name={item.name}
                      time={item.time}
                      tagArr={item.tagArr}
                      key={item.id}
                      deleteNote={() => deleteNote(item.id)}
                      newContent={newContent}
                      setNewContent={setNewContent}
                      editNote={(e) => editNote(e, item.id)}
                      editHandleChange={(e) => editHandleChange(e)}
                      newTags={newTags}
                      setNewTags={setNewTags}
                    />
                  ))}
                </div>
              ) : (
                <div>
                  {notes.map((item) => (
                    <Post
                      name={item.name}
                      time={item.time}
                      tagArr={item.tagArr}
                      key={item.id}
                      deleteNote={() => deleteNote(item.id)}
                      newContent={newContent}
                      setNewContent={setNewContent}
                      editNote={(e) => editNote(e, item.id)}
                      editHandleChange={(e) => editHandleChange(e)}
                      newTags={newTags}
                      setNewTags={setNewTags}
                    />
                  ))}
                </div>
              )}
            </div>
            <SidePanel
              notes={notes}
              tagItems={tagItems}
              filterTags={filterTags}
            />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
