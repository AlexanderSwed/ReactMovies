import React from "react";

import PersonSocial from "./PersonSocial"


const MainInfo = (props) => {
    return (
        <div className="card large main-info">
            {props.person.imgBig ? <div  className="cover"><img src={props.person.imgBig} onLoad={props.imgLoaded} alt=""/></div>: ""}
            {props.person.external_ids ? <PersonSocial links={props.person.external_ids} /> : ""}
            <div className="card-info">
                {
                    props.person.imgSmall ?
                    <img src={props.person.imgSmall} alt="" className="photo"/>
                    : <div className="photo"></div>
                }
                <div className="person-info">
                    <div className="person-name">{props.person.name}</div>
                    {
                        props.person.birthday && props.person.birthday.day &&
                        <span>
                            {`${props.person.birthday.month} ${props.person.birthday.day}, ${props.person.birthday.year}`}
                            { 
                                props.person.deathday ? (
                                ` - ${props.person.deathday.month} ${props.person.deathday.day}, ${props.person.deathday.year}`
                                ) : ""
                            }
                        </span>
                    }
                    {
                        props.person.birthday && !props.person.birthday.day &&
                        <span>{ props.person.birthday }</span>
                    }
                    {
                        props.person.place_of_birth  &&
                        <span>{props.person.place_of_birth}</span>
                    }
                </div>
            </div>
        </div>
    );
}

export default MainInfo;