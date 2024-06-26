import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import M from "materialize-css/dist/js/materialize.min.js";
import { updateLog } from "../../actions/logActions";
import TechSelectOptions from "../techs/TechSelectOptions";

const EditLogModal = ({ current, updateLog }) => {
    const [message, setMessage] = useState("");
    const [attention, setAttention] = useState(false);
    const [tech, setTech] = useState("");

    useEffect(() => {
        if (current) {
            setMessage(current.message);
            setAttention(current.attention);
            setTech(current.tech);
        }
    }, [current]);

    const onSubmit = () => {
        if (message === "" || tech === "") {
            M.toast({ html: "Please enter a message and tech" });
        } else {
            const newLog = {
                id: current.id,
                message,
                attention,
                tech,
                date: new Date(),
            };

            updateLog(newLog);
            M.toast({ html: `Log updated by ${tech}` });

            //Clear fields
            setMessage("");
            setAttention(false);
            setTech("");
        }
    };

    return (
        <div id="edit-log-modal" className="modal" style={modalStyle}>
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

EditLogModal.propTypes = {
    current: PropTypes.object,
    updateLog: PropTypes.func.isRequired,
};

const modalStyle = {
    width: "75%",
    height: "75%",
};

const mapStateToProps = (state) => ({
    current: state.log.current,
});

export default connect(mapStateToProps, { updateLog })(EditLogModal);
