import React, {useState} from 'react'
import classes from './styles/talks.module.css'
import TalkItem from './talksItem' 

const Talks = ({talks, current, setTalk}) => {
    // const [Talks, setTalks] = useState(0)

    return (
        <div className={classes.talks}>
            <div className={classes.talksHead}>Your Talks!</div>
            {talks.map((talk, index) => <TalkItem   key={talk.id}
                                                    id={talk.id}
                                                    name={talk.name}
                                                    item={talk}
                                                    current={current === index}
                                                    onclick={setTalk}/>)}
        </div>
    )
}

export default Talks
