import { Dispatch } from "react"
import { SetStateAction } from "react"
import styles from './question.module.css'

interface Props{
    statusOff: boolean
    setUserInput: (value: React.SetStateAction<string>) => void
    question: string
}

export default function Question(props : Props) {

    return(
            <button className={styles.question}
            onClick={()=>{props.setUserInput(props.question)}}
            disabled={props.statusOff}
                >{props.question}
            </button>
    )
}