import { ReactElement } from "react"
import placeHolder from "./texture.jpg"

const Members = ():ReactElement =>{

    const people = [
        'mem1',
        'mem2',
        'mem3',
      ];
    
      const listItems = people.map(person => <li>
        <img src={placeHolder} alt="placeHolder" className="MembersImage"></img>
        {person}
        </li>);

    return <ul className="MembersList">{listItems}</ul>;
}
export default Members

