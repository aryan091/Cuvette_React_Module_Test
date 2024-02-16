import React, { useState,useEffect } from "react";
import dot from "../../assets/Ellipse 23.png"
import sendImageDisabled from "../../assets/sendDisabled.png"
import sendImageEnabled from "../../assets/sendEnabled.png"
import MobileNotesArea from "./MobileNoteArea";
import styles from "./NoteAreaWeb.module.css"

function NoteAreaWeb(props) {
  const [note, setNote] = useState('');
  const [disabled , setDisabled] = useState(true)

  let selectGroup = props.selectGroup;
  let notes = selectGroup.notes;
  let groups = props.groups;
  let setGroups = props.setGroups;
  const getScreen = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };

  const [screenSize, setScreenSize] = useState(getScreen());

  useEffect(() => {
    const Screen = () => {
      setScreenSize(getScreen());
    };
    window.addEventListener("resize", Screen);
    setDisabled(true)
  }, []);


  const handleChange = (e) => {
    setNote(e.target.value);
    setDisabled(e.target.value.trim() === ''); // Set disabled to true if the input value is empty
  };

  const setTime = (currentTime) => {
    // Get the hours, minutes, and AM/PM indicator
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
    let amPM = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; 

    minutes = minutes < 10 ? "0" + minutes : minutes;

    // Construct the formatted time string
    let formattedTime = hours + " :" + minutes + " " + amPM;

    return formattedTime;
  };

  const handleSubmit = () => {
    let newGroup = [...groups];

    let currentGroup = newGroup[selectGroup.id];

    let time = setTime(new Date());

    let currentDate = new Date();

    let date = currentDate.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

    currentGroup["notes"].push({ date, time, note });
    setGroups(newGroup);

    localStorage.setItem("groups", JSON.stringify(newGroup));
    setNote('');
    setDisabled(true);
  };

  const keypress = (e) => {
    if (e.code === "Enter") {
      handleSubmit();
      setNote('');
    }
  };

  return (
    <>
    {screenSize.width < 989 ? 
    (
<>
<MobileNotesArea
          selectGroup={props.selectGroup}
          groups={props.groups}
          setGroups={props.setGroups}
          note={note}
          setNote={setNote}
          notes={notes}
          disabled={disabled}
          setDisabled={setDisabled}
        />
</>
    )
    :
    (

      <>
<div className={styles.selectedGroupArea}>
        <div className={styles.notesHeader}>
          <div
            className={styles.notesGroup}
            style={{ background: selectGroup.color }}
          >
            {selectGroup.groupName
                    ?.split(" ")
                    .slice(0,2)
                    .map((word) => word[0]?.toUpperCase())
                    .join("")}
          </div>
          <h2 className={styles.groupNameMessageArea}>{selectGroup.groupName}</h2>
        </div>
      </div>

      <div className={styles.NotesArea}>
        <div className={styles.NotesList}>

        {notes.map((note) => (
              <div className={styles.NotesItem}>
              <p className={styles.Text}>
              {note.note} 
              </p>
              <div className={styles.NotesAndDate}>
                <span className={styles.Date}>{note.date}</span>
                <img src={dot} className={styles.dotImage} alt=""/>
                <span className={styles.Time}>{note.time}</span>
              </div>
            </div>
            ))}

        </div>

        <div className={styles.Textarea}>
            <textarea className={styles.TextInput} 
            type="text" 
            value={note} 
            onChange={handleChange}
            placeholder="Enter your text here...">
            onKeyDown={keypress}
            </textarea>

            <button  className={styles.SendImgButton} 
            disabled={disabled}>
                <img
    src={disabled ? sendImageDisabled : sendImageEnabled}
    className={styles.SendImg}
                alt="SendImg"
                onClick={handleSubmit}
              />
            </button>
            
          </div>

      </div>

      </>
    )}

      
    </>
  );
}

export default NoteAreaWeb;
