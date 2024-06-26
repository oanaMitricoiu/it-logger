import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { deleteTech } from "../../actions/techActions";

const TechItem = ({ tech: { firstName, lastName, id }, deleteTech }) => {
    return (
        <li className="collection-item">
            <div>
                {firstName} {lastName}
                <a
                    href="#!"
                    className="secondary-content"
                    onClick={() => deleteTech(id)}
                >
                    <i className="material-icons grey-text">delete</i>
                </a>
            </div>
        </li>
    );
};

TechItem.propTypes = {
    tech: PropTypes.object.isRequired,
    deleteTech: PropTypes.func.isRequired,
};

export default connect(null, { deleteTech })(TechItem);
