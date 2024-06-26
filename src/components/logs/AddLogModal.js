import React, { useState } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addLog } from "../../actions/logActions";
import TechSelectOptions from "../techs/TechSelectOptions";

const AddLogModal = ({ addLog }) => {
    const [message, setMessage] = useState("");
    const [attention, setAttention] = useState(false);
    const [tech, setTech] = useState("");

    const onSubmit = () => {
        if (message === "" || tech === "") {
            M.toast({ html: "Please enter a message and tech" });
        } else {
            const newLog = {
                message,
                attention,
                tech,
                date: new Date(),
            };
            addLog(newLog);
            M.toast({ html: `Log added by ${tech}` });

            //Clear fields
            setMessage("");
            setAttention(false);
            setTech("");
        }
    };

    return (
        <div id="add-log-modal" className="modal" style={modalStyle}>
            <div className="modal-content">
                <h4>Enter system log</h4>
                <div className="row">
                    <div className="input-field">
                        <input
                            type="text"
                            name="message"
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                        />
                        <label htmlFor="message" className="active">
                            Log message
                        </label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field">
                        <select
                            name="tech"
                            value={tech}
                            className="browser-default"
                            onChange={(event) => setTech(event.target.value)}
                        >
                            <option value="" disabled>
                                Select technician
                            </option>
                            <TechSelectOptions />
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field">
                        <p>
                            <label>
                                <input
                                    type="checkbox"
                                    className="filled-in"
                                    checked={attention}
                                    value={attention}
                                    onChange={(event) =>
                                        setAttention(!attention)
                                    }
                                />
                                <span>Needs attention</span>
                            </label>
                        </p>
                    </div>
                </div>
            </div>
            <div className="modal-footer">
                <a
                    href="#!"
                    onClick={onSubmit}
                    className="modal-close waves-effect waves-blue waves-light btn"
                >
                    Enter
                </a>
            </div>
        </div>
    );
};

AddLogModal.propTypes = {
    addLog: PropTypes.func.isRequired,
};

const modalStyle = {
    width: "75%",
    height: "75%",
};

export default connect(null, { addLog })(AddLogModal);
