import {useEffect , useState} from 'react';
import Modal from "../ModalWeb/ModalWeb";
import Notes from "../NoteAreaWeb/NoteAreaWeb";
import styles from "./MobileSideBar.module.css";
import ModalWeb from "../ModalWeb/ModalWeb";
import NoteAreaWeb from '../NoteAreaWeb/NoteAreaWeb';

const MobileSidebar = (
  {
  openModalBox,
  setOpenModalBox,
  selectGroup,
  setSelectGroup,
  groups,
  setGroups,
  getScreen,
  screenSize,
  setScreenSize
}
) => {
  
  const handleGroupSelect = (group) => {
    setSelectGroup(group);
  };

  useEffect(() => {

    const fetchGroup = async () => {
      let storedGroups = localStorage.getItem("groups");
      if (storedGroups) {
        let groups = await JSON.parse(storedGroups);
        setGroups(groups);
      }
    };
    fetchGroup();
  }, []);


  return (
    <div
      style={{
        margin: 0,
        padding: 0
      }}
    >
      <div className={styles.container}>
      {selectGroup ? (
            <NoteAreaWeb
             selectGroup={selectGroup}
              groups={groups}
              setGroups={setGroups}
              screenSize={screenSize}
              setScreenSize={setScreenSize}
              
            />
          )
          
           : 
           (
            <>
            <div className={styles.SidePanel}>
          <div className={styles.headingBox}>
            <h1 className={styles.heading}>Pocket Notes</h1>
          </div>

          <div className={styles.GroupList}>
            {groups.map((group) => (
              <div
                key={group.id}
                className={`${styles.GroupItem} ${
                  selectGroup === group ? styles.selected : ""
                }`}
                onClick={() => handleGroupSelect(group)}
              >
                <div className={styles.groupIcon} style={{ background: group.color }}>
                  {group.groupName
                    ?.split(" ")
                    .slice(0,2)
                    .map((word) => word[0]?.toUpperCase())
                    .join("")}
                </div>
                <h2 className={styles.groupName}>{group.groupName}</h2>
              </div>
            ))}
          </div>

          <button
            className={styles.bottomButton}
            onClick={() => setOpenModalBox(true)}
          >
            +
          </button>
        </div>
            </>

           )}
        {openModalBox && (
            <ModalWeb
              closeModal={setOpenModalBox}
              setGroups={setGroups}
              groups={groups}
              
            />
          )}
        
      </div>
    </div>
  );
};

export default MobileSidebar;
