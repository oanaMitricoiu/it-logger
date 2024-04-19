import React, { useState } from "react";
import M from "materialize-css/dist/js/materialize.min.js";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addTech } from "../../actions/techActions";

const AddTechModal = ({ addTech }) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const onSubmit = () => {
        if (firstName === "" || lastName === "") {
            M.toast({ html: "Please enter a first and last name" });
        } else {
            addTech({ firstName, lastName });

            //Clear fields
            setFirstName("");
            setLastName("");
        }
    };

    return (
        <div id="add-tech-modal" className="modal">
            <div className="modal-content">
                <h4>New Tech</h4>
                <div className="row">
                    <div className="input-field">
                        <input
                            type="text"
                            name="firstName"
                            value={firstName}
                            onChange={(event) =>
                                setFirstName(event.target.value)
                            }
                        />
                        <label htmlFor="firstName" className="active">
                            First name
                        </label>
                    </div>
                </div>
                <div className="row">
                    <div className="input-field">
                        <input
                            type="text"
                            name="lastName"
                            value={lastName}
                            onChange={(event) =>
                                setLastName(event.target.value)
                            }
                        />
                        <label htmlFor="lastName" className="active">
                            Last name
                        </label>
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

AddTechModal.propTypes = {
    addTech: PropTypes.func.isRequired,
};

export default connect(null, { addTech })(AddTechModal);
