import React, {useState} from 'react'
import '../App.css'
import classes from './styles/talks.module.css'
import TalkItem from './talksItem' 

const Talks = ({talks}) => {
    const [Talks, setTalks] = useState(0)

    return (
        <div className={classes.talks}>
            {talks.map((talk, index) => <TalkItem   key={talk.id}
                                                    id={talk.id}
                                                    name={talk.name}
                                                    item={talk}/>)}
        </div>
    )
}

export default Talks
