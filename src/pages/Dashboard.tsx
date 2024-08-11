import Sidenav from "../components/nav/Sidenav";
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
import { useTheme } from "../hooks/useTheme";
import { useInput } from "../hooks/useInput";

import { db } from "../config/firebase";
import {
  BellAlertIcon,
  ChevronDoubleDownIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { PlusCircleIcon } from "@heroicons/react/16/solid";

const Dashboard = () => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  // const [newNote, setNewNote] = useState<string>("");
  const [
    newNote,
    { handleChange: handleNoteChange, resetInput: resetNewNote },
  ] = useInput();

  // const [newContent, setNewContent] = useState<string>("");
  const [
    newContent,
    { handleChange: handleEditChange, setValue: setNewContent },
  ] = useInput();

  const [tagValue, { handleChange: handleTagChange, setValue: setTagValue }] =
    useInput();

  const [
    listValue,
    { handleChange: handleListChange, setValue: setListValue },
  ] = useInput();

  const [searchQuery, { handleChange: handleSearchQuery }] = useInput();

  const [successMsg, setSuccessMsg] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);
  const [newTags, setNewTags] = useState<string[]>([]);
  const [listOpen, setListOpen] = useState<boolean>(false);
  const [checkList, setCheckList] = useState<string[]>([]);
  const [newCheckList, setNewCheckList] = useState<CheckBox[]>([]);
  const [codeOpen, setCodeOpen] = useState<boolean>(false);
  const [code, setCode] = useState<string>("");
  const [newCode, setNewCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tagValid, setTagValid] = useState<boolean>(true);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const { theme } = useTheme();

  //finding out all available tags
  const uniqueTags: string[] = [];
  notes.forEach((note) => note.tagArr.map((item) => uniqueTags.push(item)));
  const tagItems = [...new Set(uniqueTags)];

  const filteredItems = notes.filter(
    (note) =>
      note.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      selectedTags.every((tag) => note.tagArr.includes(tag))
  );

  const user = auth.currentUser;

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
      setNotes(
        documents.sort((a, b) => Date.parse(b.time) - Date.parse(a.time))
      );
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
      resetNewNote(); // clears new note input
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
      if (tags.length < 3) {
        setTags([...tags, tagValue]);
        setTagValue("");
      } else {
        setTagValid(false);
        setTimeout(() => {
          setTagValid(true);
        }, 2000);
      }
    }
  };

  const removeTags = (tagName: string) => {
    setTags(tags.filter((tag) => tag !== tagName));
  };

  const filterTags = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      // If the tag is not selected, add it to the selected tags (filter)
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const unfilterTags = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    }
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
          handleListChange={handleListChange}
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
          handleTagChange={(e) => handleTagChange(e)}
          addTags={(e) => addTags(e)}
          tags={tags}
          removeTags={removeTags}
          setModalOpen={setModalOpen}
          tagValid={tagValid}
        />
      ) : null}
      <div className="w-full transition-all mx-auto flex flex-col justify-center items-center pl-60 xs:pl-0 sm:pl-0">
        <Sidenav />
        <main className="w-full h-auto flex flex-col items-center justify-center shrink bg-gray-100 dark:bg-zinc-900">
          <div className="absolute mt-6 mr-6 top-0 right-0">
            <Success message={successMsg} setSuccessMsg={setSuccessMsg} />
          </div>
          <section className="w-full max-w-5xl bg-gray-100 px-4 flex gap-4 p-6 mb-0 pb-0 dark:bg-zinc-900 xs:max-w-full xs:pt-3">
            <div className="w-[calc(100%-16rem)] h-full mb-8 xs:w-full ">
              <form
                className="rounded-lg w-full h-full flex flex-col justify-start items-start px-4 py-2 border bg-white dark:bg-zinc-800 dark:border-zinc-700"
                onSubmit={addNote}
              >
                <div className="pb-2 flex flex-col justify-start items-start relative w-full h-auto max-h-[50vh] bg-inherit border-b dark:border-zinc-700">
                  <textarea
                    className="w-full h-full my-2 ml-1 mt-4 text-base resize-none overflow-x-hidden overflow-y-auto bg-transparent outline-none whitespace-pre-wrap word-break dark:caret-white dark:text-gray-300"
                    placeholder="Create a note..."
                    rows={1}
                    value={newNote}
                    onChange={(e) => handleNoteChange(e)}
                    ref={textAreaRef}
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
                            <label className="ms-2 text-base text-black font-normal dark:text-gray-400">
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
                        <div className="text-sm flex items-center bg-gray-100 border border-gray-300 px-2 rounded-md dark:bg-neutral-700 dark:border-zinc-700">
                          <p className="dark:text-gray-300">{tag}</p>
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
                  <span className="flex justify-center items-center bg-gray-100 hover:bg-gray-300 py-1 px-2 rounded-md border cursor-pointer dark:bg-zinc-900 dark:border-zinc-700">
                    <BellAlertIcon className="w-5 text-gray-700 dark:text-gray-300" />
                    <p className="text-sm font-medium text-gray-700 ml-2 dark:text-gray-300">
                      Reminders
                    </p>
                    <ChevronDoubleDownIcon className="w-5 text-gray-700 ml-2 mt-0.5 dark:text-gray-300" />
                  </span>
                  <button className="flex justify-center items-center bg-gray-100 hover:bg-gray-300 py-1 px-2 rounded-md border dark:bg-zinc-900 dark:border-zinc-700 dark:hover:bg-zinc-700">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Save
                    </p>
                    <PlusCircleIcon className="w-4 text-gray-600 ml-1 dark:text-gray-300" />
                  </button>
                </div>
              </form>

              {selectedTags.length !== 0 ? (
                <div className="px-4 py-1 mt-4 w-full flex items-center">
                  <p className="text-sm dark:text-white">Filters:</p>
                  <div className="ml-3 w-full flex items-center gap-x-3">
                    {selectedTags.map((tag) => {
                      return (
                        <div
                          className="flex items-center bg-white border border-gray-300 px-2 py-0.5 rounded cursor-pointer dark:bg-neutral-700 dark:border-zinc-700 dark:text-white"
                          key={tag}
                          onClick={() => unfilterTags(tag)}
                        >
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {tag}
                          </p>
                          <XMarkIcon className="w-4 ml-1 text-gray-500 dark:text-white" />
                        </div>
                      );
                    })}
                    <button
                      className="bg-red-300 px-3 py-0.5 rounded"
                      onClick={() => {
                        setSelectedTags([]);
                      }}
                    >
                      <p className="text-sm text-red-800 font-medium">Reset</p>
                    </button>
                  </div>
                </div>
              ) : null}

              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <div>
                  {filteredItems.map((item) => (
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
                      handleEditChange={(e) => handleEditChange(e)}
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
              selectedTags={selectedTags}
              searchQuery={searchQuery}
              handleSearchQuery={handleSearchQuery}
            />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
