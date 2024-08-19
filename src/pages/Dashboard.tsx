import Sidenav from "../components/nav/Sidenav";
import Post from "../components/dashboard/Post";
import React, { useState, useEffect } from "react";

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
import TagModal from "../components/modals/TagModal";
import CheckListModal from "../components/modals/CheckListModal";
import LoadingSpinner from "../components/global/LoadingSpinner";
import { v4 as uuidv4 } from "uuid";
import { CheckBox } from "../types/checkedType";
import { useTheme } from "../hooks/useTheme";
import { useInput } from "../hooks/useInput";
import { PostForm } from "../components/dashboard/PostForm";
import { ModalMask } from "../components/global/ModalMask";
import { FilterNotes } from "../components/dashboard/FilterNotes";

import { db } from "../config/firebase";

const Dashboard = () => {
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
  const [tagOpen, setTagOpen] = useState<boolean>(false);
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
  const [dateValue, setDateValue] = useState<string>("");

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const dateParsed = new Date(Date.parse(event.target.value));
    setDateValue(event.target.value);
    console.log(event.target.value);
  };

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
        pinned: doc.get("pinned"),
      }));
      setNotes(
        documents.sort((a, b) => {
          if (a.pinned === b.pinned) {
            return Date.parse(b.time) - Date.parse(a.time);
          } else {
            return Number(b.pinned) - Number(a.pinned);
          }
        })
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
        pinned: false,
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

      setNotes(
        notes.concat(newNoteObject).sort((a, b) => {
          if (a.pinned === b.pinned) {
            return Date.parse(b.time) - Date.parse(a.time);
          } else {
            return Number(b.pinned) - Number(a.pinned);
          }
        })
      );

      const dateParsed = new Date(Date.parse(dateValue));
      const newDate = dateParsed.toISOString();

      const data = {
        subject: newNote,
        date: newDate,
      };

      fetch("/api/send", {
        method: "POST", // Specify the HTTP method
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        body: JSON.stringify(data), // Convert data to a JSON string
      }).then((data) => {
        console.log(data); // Update the state with the response data
      });

      setSuccessMsg("Created successfully");
      setTimeout(() => {
        setSuccessMsg("");
      }, 3000);
      resetNewNote(); // clears new note input
      setTags([]);
      setCheckList([]);
      setCode("");
      setCodeOpen(false);
      setDateValue("");
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
        pinned: docSnap.get("pinned"),
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

  const pinNote = (id: string): void => {
    const pinData = async (uid: string, id: string) => {
      const docRef = doc(db, "users", uid, "notes", id);
      const docSnap = await getDoc(docRef);

      await updateDoc(docRef, {
        pinned: !docSnap.get("pinned"),
      });

      const newObject: Note = {
        id: docSnap.id,
        name: docSnap.get("name"),
        time: docSnap.get("time"),
        tagArr: docSnap.get("tagArr"),
        codeText: docSnap.get("codeText"),
        pinned: !docSnap.get("pinned"),
      };

      setNotes(
        notes
          .map((note) => (note.id !== id ? note : newObject))
          .sort((a, b) => {
            if (a.pinned === b.pinned) {
              return Date.parse(b.time) - Date.parse(a.time);
            } else {
              return Number(b.pinned) - Number(a.pinned);
            }
          })
      );
    };

    if (user) {
      pinData(user.uid, id);
    }
  };

  const addTags = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagValue !== "") {
      if (tags.length < 3) {
        if (!tags.includes(tagValue)) {
          setTags([...tags, tagValue]);
          setTagValue("");
        } else {
          alert("Tag already exists");
        }
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

  const removeAllTags = () => {
    setTags([]);
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

  const removeAllList = () => {
    setCheckList([]);
  };

  return (
    <div className="w-full min-h-full">
      <ModalMask modalOpen={listOpen} setModalOpen={setListOpen}>
        <CheckListModal
          setListOpen={setListOpen}
          listValue={listValue}
          handleListChange={handleListChange}
          checkList={checkList}
          addList={(e) => addList(e)}
          removeList={removeList}
          removeAllList={removeAllList}
        />
      </ModalMask>

      <ModalMask modalOpen={tagOpen} setModalOpen={setTagOpen}>
        <TagModal
          tagValue={tagValue}
          handleTagChange={(e) => handleTagChange(e)}
          addTags={(e) => addTags(e)}
          tags={tags}
          removeTags={removeTags}
          removeAllTags={removeAllTags}
          setTagOpen={setTagOpen}
          tagValid={tagValid}
        />
      </ModalMask>

      <div className="w-full transition-all mx-auto flex flex-col justify-center items-center pl-60 xs:pl-0 sm:pl-0">
        <Sidenav />
        <main className="w-full h-auto flex flex-col items-center justify-center shrink bg-gray-100 dark:bg-zinc-900">
          <div className="absolute mt-6 mr-6 top-0 right-0">
            <Success message={successMsg} setSuccessMsg={setSuccessMsg} />
          </div>
          <section className="w-full max-w-5xl bg-gray-100 px-4 flex gap-4 p-6 mb-0 pb-0 dark:bg-zinc-900 xs:max-w-full xs:pt-3">
            <div className="w-[calc(100%-16rem)] h-full mb-8 xs:w-full ">
              <PostForm
                newNote={newNote}
                addNote={addNote}
                handleNoteChange={handleNoteChange}
                checkList={checkList}
                removeList={removeList}
                tags={tags}
                removeTags={removeTags}
                codeOpen={codeOpen}
                setCodeOpen={setCodeOpen}
                setTagOpen={setTagOpen}
                setListOpen={setListOpen}
                code={code}
                setCode={setCode}
                dateValue={dateValue}
                handleDateChange={handleDateChange}
              />

              <FilterNotes
                selectedTags={selectedTags}
                setSelectedTags={setSelectedTags}
                unfilterTags={unfilterTags}
              />

              {isLoading ? (
                <LoadingSpinner />
              ) : (
                <div>
                  {filteredItems.map((item) => (
                    <Post
                      note={item}
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
                      pinNote={pinNote}
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
