import Sidenav from "../components/sidenav/Sidenav";
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
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase";
import { Note } from "../types/noteType";
import Success from "../components/notifications/Success";
import SidePanel from "../components/SidePanel";
import TagModal from "../components/post/modals/TagModal";
import CheckListModal from "../components/post/modals/CheckListModal";
import TagButton from "../components/post/buttons/TagButton";
import CheckListButton from "../components/post/buttons/CheckListButton";
// import PhotoButton from "../components/post/buttons/PhotoButton";
import CodeButton from "../components/post/buttons/CodeButton";
import CodeModal from "../components/post/modals/CodeModal";
import LoadingSpinner from "../components/LoadingSpinner";
import { v4 as uuidv4 } from "uuid";
import { CheckBox } from "../types/checkedType";
import { useTheme } from "../functions/useTheme";

import { db } from "../config/firebase";
import {
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
  const [listOpen, setListOpen] = useState<boolean>(false);
  const [checkList, setCheckList] = useState<string[]>([]);
  const [newCheckList, setNewCheckList] = useState<CheckBox[]>([]);
  const [listValue, setListValue] = useState<string>("");
  const [codeOpen, setCodeOpen] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const [newCode, setNewCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { theme } = useTheme();

  const uniqueTags: string[] = [];
  notes.forEach((note) => note.tagArr.map((item) => uniqueTags.push(item)));

  const tagItems = [...new Set(uniqueTags)];

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

  const listHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setListValue(event.target.value);
    console.log(event.target.value);
  };

  useEffect(() => {
    if (textAreaRef.current != null) {
      textAreaRef.current.style.height =
        textAreaRef.current.scrollHeight + "px";
    }

    console.log(theme);

    const getData = async (uid: string) => {
      const notesRef = collection(db, "users", uid, "notes");
      const querySnapshot = await getDocs(notesRef);
      const documents: Note[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.get("name"),
        time: doc.get("time"),
        tagArr: doc.get("tagArr"),
        codeText: doc.get("codeText"),
      }));
      setNotes(documents);
      setFiltered(documents);
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
  }, [val, theme]);

  const addNote = (event: React.ChangeEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const addData = async (uid: string) => {
      const noteObject = {
        name: newNote,
        time: new Date().toString(),
        tagArr: tags,
        codeText: code,
      };

      const notesRef = collection(db, "users", uid, "notes");
      const docRef = await addDoc(notesRef, noteObject);
      const checkRef = collection(
        db,
        "users",
        uid,
        "notes",
        docRef.id,
        "checkList"
      );
      checkList.forEach((item) => {
        addDoc(checkRef, { listItem: item, listId: uuidv4() });
      });

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
      setCheckList([]);
      setCode("");
      setCodeOpen(false);
    };
    if (user) {
      addData(user.uid);
    }
  };

  const deleteNote = (id: string): void => {
    const deleteData = async (uid: string, id: string) => {
      const notesRef = doc(db, "users", uid, "notes", id);
      const checkRef = collection(db, "users", uid, "notes", id, "checkList");

      const trashRef = collection(db, "users", uid, "trash");

      const noteSnapshot = await getDoc(notesRef);
      const newRef = await addDoc(trashRef, noteSnapshot.data());

      const checkRefCopy = collection(
        db,
        "users",
        uid,
        "trash",
        newRef.id,
        "checkList"
      );

      const querySnapshot = await getDocs(checkRef);

      const addPromises = querySnapshot.docs.map((document) => {
        addDoc(checkRefCopy, document.data());
      });

      const deletePromises = querySnapshot.docs.map((document) =>
        deleteDoc(doc(db, "users", uid, "notes", id, "checkList", document.id))
      );

      await Promise.all(addPromises);
      await Promise.all(deletePromises);
      await deleteDoc(notesRef);

      setNotes(notes.filter((item) => item.id !== id));

      console.log(`Note ${id} has been deleted`);
    };

    if (user) {
      deleteData(user.uid, id);
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
        codeText: newCode,
      });

      const docSnap = await getDoc(docRef);

      const newObject: Note = {
        id: docSnap.id,
        name: docSnap.get("name"),
        time: docSnap.get("time"),
        tagArr: docSnap.get("tagArr"),
        codeText: docSnap.get("codeText"),
      };

      const checkRef = collection(db, "users", uid, "notes", id, "checkList");

      const querySnapshot = await getDocs(checkRef);

      const removePromises = querySnapshot.docs.map((document) => {
        deleteDoc(doc(db, "users", uid, "notes", id, "checkList", document.id));
      });

      const updatePromises = newCheckList.map((item) => {
        addDoc(checkRef, { listItem: item.listItem, listId: item.listId });
      });

      await Promise.all(removePromises);
      await Promise.all(updatePromises);

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

  const addList = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && listValue !== "") {
      setCheckList([...checkList, listValue]);
      setListValue("");
    }
  };

  const removeList = (itemName: string) => {
    setCheckList(checkList.filter((listItem) => listItem !== itemName));
  };

  return (
    <div className="w-full min-h-full">
      {listOpen ? (
        <div
          className="fixed top-0 right-0 bottom-0 left-0 z-10 bg-black bg-opacity-50"
          onClick={() => setListOpen(false)}
        ></div>
      ) : null}
      {listOpen ? (
        <CheckListModal
          setListOpen={setListOpen}
          listValue={listValue}
          listHandleChange={listHandleChange}
          checkList={checkList}
          addList={(e) => addList(e)}
          removeList={removeList}
        />
      ) : null}
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
        <Sidenav />
        <main className="w-full h-auto flex flex-col items-center justify-center shrink bg-gray-100 dark:bg-zinc-900">
          <div className="absolute mt-6 mr-6 top-0 right-0">
            <Success message={successMsg} setSuccessMsg={setSuccessMsg} />
          </div>
          <section className="w-full max-w-5xl bg-gray-100 px-4 flex gap-4 p-6 mb-0 pb-0 dark:bg-zinc-900">
            <div className="w-[calc(100%-16rem)] h-full mb-8 ">
              <form
                className="rounded-lg w-full h-full flex flex-col justify-start items-start px-4 py-2 border bg-white dark:bg-zinc-800 dark:border-zinc-700"
                onSubmit={addNote}
              >
                <div className="pb-2 flex flex-col justify-start items-start relative w-full h-auto max-h-[50vh] bg-inherit border-b dark:border-zinc-700">
                  <textarea
                    className="w-full h-full my-2 ml-1 mt-4 text-base resize-none overflow-x-hidden overflow-y-auto bg-transparent outline-none whitespace-pre-wrap word-break caret-white"
                    placeholder="Create a note..."
                    rows={1}
                    value={val}
                    onChange={(e) => handleChange(e)}
                    ref={textAreaRef}
                    style={{ color: "#000" }}
                  ></textarea>

                  {checkList.length > 0 ? (
                    <div className="flex w-full px-1 mb-1 space-x-2">
                      <div className="flex flex-col w-full px-1 ">
                        {checkList.map((item) => (
                          <div className="flex items-center mb-2 outline-none">
                            <input
                              disabled
                              type="checkbox"
                              className="w-4 h-4 border-gray-500"
                            ></input>
                            <label className="ms-2 text-base text-black font-normal">
                              {item}
                            </label>
                            <XMarkIcon
                              className="w-4 text-gray-600 ml-1 cursor-pointer mt-0.5"
                              onClick={() => removeList(item)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null}

                  {codeOpen ? (
                    <div className="w-full px-1 mb-1 space-x-2">
                      <CodeModal
                        setCodeOpen={setCodeOpen}
                        code={code}
                        setCode={setCode}
                      />
                    </div>
                  ) : null}

                  {tags.length > 0 ? (
                    <div className="flex w-full my-1 px-1 space-x-2">
                      {tags.map((tag) => (
                        <div className="text-sm flex items-center bg-gray-100 border border-gray-300 px-2 rounded-md">
                          <p>{tag}</p>
                          <XMarkIcon
                            className="w-4 mt-0.5 ml-1 cursor-pointer text-gray-500"
                            onClick={() => removeTags(tag)}
                          />
                        </div>
                      ))}
                    </div>
                  ) : null}
                  <div className="flex items-center my-2">
                    <TagButton setModalOpen={setModalOpen} />
                    <CodeButton setCodeOpen={setCodeOpen} />
                    {/* <PhotoButton /> */}
                    <CheckListButton setListOpen={setListOpen} />
                  </div>
                </div>
                <div className="w-full py-4 flex justify-between items-center">
                  <span className="flex justify-center items-center bg-gray-100 hover:bg-gray-300 py-1 px-2 rounded-md border cursor-pointer dark:bg-zinc-950 dark:border-zinc-700">
                    <BellAlertIcon className="w-5 text-gray-700 dark:text-gray-300" />
                    <p className="text-sm font-medium text-gray-700 ml-2 dark:text-gray-300">
                      Reminders
                    </p>
                    <ChevronDoubleDownIcon className="w-5 text-gray-700 ml-2 mt-0.5 dark:text-gray-300" />
                  </span>
                  <button className="flex justify-center items-center bg-gray-100 hover:bg-gray-300 py-1 px-2 rounded-md border dark:bg-zinc-950 dark:border-zinc-700">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Save
                    </p>
                    <PlusCircleIcon className="w-4 text-gray-600 ml-1 dark:text-gray-300" />
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

              {isLoading ? (
                <LoadingSpinner />
              ) : filterOpen ? (
                <div>
                  {filtered.map((item) => (
                    <Post
                      name={item.name}
                      time={item.time}
                      tagArr={item.tagArr}
                      key={item.id}
                      codeText={item.codeText}
                      id={item.id}
                      deleteNote={() => deleteNote(item.id)}
                      newContent={newContent}
                      setNewContent={setNewContent}
                      editNote={(e) => editNote(e, item.id)}
                      editHandleChange={(e) => editHandleChange(e)}
                      newTags={newTags}
                      setNewTags={setNewTags}
                      newCode={newCode}
                      setNewCode={setNewCode}
                      newCheckList={newCheckList}
                      setNewCheckList={setNewCheckList}
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
                      codeText={item.codeText}
                      id={item.id}
                      key={item.id}
                      deleteNote={() => deleteNote(item.id)}
                      newContent={newContent}
                      setNewContent={setNewContent}
                      editNote={(e) => editNote(e, item.id)}
                      editHandleChange={(e) => editHandleChange(e)}
                      newTags={newTags}
                      setNewTags={setNewTags}
                      newCode={newCode}
                      setNewCode={setNewCode}
                      newCheckList={newCheckList}
                      setNewCheckList={setNewCheckList}
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
