import React from "react";
import { useState, useEffect } from "react";
import ModalWeb from "../ModalWeb/ModalWeb";
import NoteAreaWeb from "../NoteAreaWeb/NoteAreaWeb";
import style from "./SidePanelAndMessageAreaWeb.module.css";
import banner from "../../assets/banner.png";
import lock from "../../assets/lock.png";
import MobileSidebar from "./MobileSideBar";

function SidePanel() {
  const [openModalBox, setOpenModalBox] = useState(false);
  const [selectGroup, setSelectGroup] = useState(null);
  const [groups, setGroups] = useState([]);

  const getScreen = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };

  const [screenSize, setScreenSize] = useState(getScreen());

  const handleGroupSelect = (group) => {
    setSelectGroup(group);
  };

  useEffect(() => {
    const Screen = () => {
      setScreenSize(getScreen());
    };
    window.addEventListener("resize", Screen);

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
    <>
      {screenSize.width < 989 ? (
        <>
        <MobileSidebar 
          openModalBox={openModalBox}
          setOpenModalBox={setOpenModalBox}
          selectGroup={selectGroup}
          setSelectGroup={setSelectGroup}
          groups={groups}
          setGroups={setGroups}
          getScreen = {getScreen}
          screenSize = {screenSize}
          setScreenSize = {setScreenSize}
          handleGroupSelect = {handleGroupSelect}
          
        />
        </>
      ) : (
        <>
          <div
            style={{
              margin: 0,
              padding: 0
            }}
          >
            <div className={style.container}>
              <div className={style.leftSidePanel}>
                <div className={style.headingBox}>
                  <h1 className={style.heading}>Pocket Notes</h1>
                </div>

                <div className="GroupList">
                  {groups.map((group) => (
                    <div
                      key={group.id}
                      className={`${style.GroupItem} ${
                        selectGroup === group ? style.selected : ""
                      }`}
                      onClick={() => handleGroupSelect(group)}
                    >
                      {/* // Below div show icon an text */}
                      <div
                        className={style.groupIcon}
                        style={{ background: group.color }}
                      >
                        {group.groupName
                    ?.split(" ")
                    .slice(0,2)
                    .map((word) => word[0]?.toUpperCase())
                    .join("")}
                      </div>
                      <h2 className={style.groupName}>{group.groupName}</h2>
                    </div>
                  ))}
                </div>

                <button
                  className={style.bottomButton}
                  onClick={() => setOpenModalBox(true)}
                >
                  +
                </button>

                {/* {left side panel} */}
              </div>

              {openModalBox && (
                <ModalWeb
                  closeModal={setOpenModalBox}
                  setGroups={setGroups}
                  groups={groups}
                />
              )}

              <div className={`${style.MessageArea} ${selectGroup ? '' : style.withBackground}`}>
                {selectGroup ? (
                  <NoteAreaWeb
                    selectGroup={selectGroup}
                    groups={groups}
                    setGroups={setGroups}
                    screenSize = {screenSize}
                    setScreenSize = {setScreenSize}
                  />
                ) : (
                  <>
                    <div>
                      <img src={banner} alt="banner"></img>
                    </div>

                    <h2 className={style.MessageAreaHeading}>Pocket Notes</h2>
                    <p className={style.MessageAreaDescription}>
                      Send and receive messages without keeping your phone
                      online.
                      <br /> Use Pocket Notes on up to 4 linked devices and 1
                      mobile phone
                    </p>

                    <footer className={style.MessageAreaFooter}>
                      <img src={lock} alt="lock"></img>
                      <span>end-to-end encrypted</span>
                    </footer>
                  </>
                )}
              </div>

              {/* {container} */}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default SidePanel;
