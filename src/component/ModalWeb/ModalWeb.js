import React, { useState, useEffect } from "react";
import styles from "./ModalWeb.module.css";

function ModalWeb(props) {
  const [formData, setFormData] = useState({ grpName: "", color: "" });
  const [error, setError] = useState("");

  const setGroups = props.setGroups;
  const groups = props.groups;
  const closeModal = props.closeModal;
  const color = [
    "#B38BFA",
    "#FF79F2",
    "#43E6FC",
    "#F19576",
    "#0047FF",
    "#6691FF",
  ];

  const getScreen = () => {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  };

  const [screenSize, setScreenSize] = useState(getScreen());

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getScreen());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setError("");
  };

  const handleChangeColor = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.getAttribute("color"),
    });
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (formData.grpName.trim() === "" || formData.color === "") {
      setError("Please fill out all fields");
      return;
    }

    let newGroup = [
      ...groups,
      {
        groupName: formData.grpName,
        color: formData.color,
        notes: [],
        id: groups.length,
      },
    ];
    setGroups(newGroup);
    localStorage.setItem("groups", JSON.stringify(newGroup));
    props.closeModal(false);
  };

  const handleBackgroundClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal(false);
    }
  };

  return (
    <>
      {screenSize.width < 989 ? (
        <div
          className={styles.modalBackgroundMobile}
          onClick={handleBackgroundClick}
        >
          <div className={styles.modalContainerMobile}>
            <span>
              <button
                className={styles.closeButtonMobile}
                onClick={() => closeModal(false)}
              >
                X
              </button>
            </span>
            <h2 className={styles.modalHeadingMobile}>Create New Group</h2>
            <div className={styles.groupNameMobile}>
              <label className={styles.modalGrpMobile}>Group Name</label>
              <input
                type="text"
                className={`${styles.modalTextMobile} ${error && styles.error}`}
                name="grpName"
                placeholder="Enter your group name"
                onChange={handleChange}
              />
            </div>

            <div className={styles.selectColorMobile}>
              <label className={styles.modalColorMobile}>Choose Colour</label>

              <div className={styles.allColors}>
                {color.map((color, index) => (
                  <button
                    className={`${styles.colorButtonMobile}  ${
                      formData.color === color ? "selected" : ""
                    }`}
                    name="color"
                    color={color}
                    key={index}
                    id={color}
                    style={{
                      height: "22px",
                      width: "22px",
                      background: color,
                      borderRadius: "25px",
                      border: "none",
                    }}
                    onClick={handleChangeColor}
                  ></button>
                ))}
              </div>
            </div>
            <button className={`${styles.modalCreateMobile} ${error && styles.errorButton}`} onClick={handleSubmit}>
              Create
            </button>
          </div>
        </div>
      ) : (
        <div
          className={styles.modalBackground}
          onClick={handleBackgroundClick}
        >
          <div className={styles.modalContainer}>
            <span>
              <button
                className={styles.closeButton}
                onClick={() => props.closeModal(false)}
              >
                X
              </button>
            </span>
            <h2 className={styles.modalHeading}>Create New Group</h2>
            <div className={styles.groupName}>
              <label className={styles.modalGrp}>Group Name</label>
              <input
                type="text"
                className={`${styles.modalText} ${error && styles.error}`}
                name="grpName"
                placeholder="Enter your group name"
                onChange={handleChange}
              />
            </div>

            <div className={styles.selectColor}>
              <label className={styles.modalColor}>Choose Colour</label>

              <div className="allColors">
                {color.map((color, index) => (
                  <button
                    className={`${styles.colorButton}  ${
                      formData.color === color ? "selected" : ""
                    }`}
                    name="color"
                    color={color}
                    key={index}
                    id={color}
                    style={{
                      height: "40px",
                      width: "40px",
                      background: color,
                      borderRadius: "25px",
                      border: "none",
                      marginRight: "10px",
                    }}
                    onClick={handleChangeColor}
                  ></button>
                ))}
              </div>
            </div>
            <button className={`${styles.modalCreate} ${error && styles.errorButton}`} onClick={handleSubmit}>
              Create
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalWeb;
