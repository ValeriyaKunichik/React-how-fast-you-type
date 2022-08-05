import {useState, useEffect, useRef} from "react"
import axios from 'axios';

function useWordGame(startingTime = 60) {
    const [text, setText] = useState("")
    const [timeRemaining, setTimeRemaining] = useState(startingTime)
    const [isTimeRunning, setIsTimeRunning] = useState(false)
    const [wordCount, setWordCount] = useState(0)
    const textBoxRef = useRef(null)
    
    function handleChange(e) {
        const {value} = e.target
        setText(value)
    }
    
    function calculateWordCount(text) {
        const wordsArr = text.trim().split(" ")
        return wordsArr.filter(word => word !== "").length
    }
    
    function startGame() {
        setIsTimeRunning(true)
        setTimeRemaining(startingTime)
        setText("")
        setWordCount(0)
        textBoxRef.current.disabled = false
        textBoxRef.current.focus()
    }
    
    function endGame() {
        const entry = {
            text: text
          }
      
        axios.post('http://localhost:5000/entries/add', entry)
        setIsTimeRunning(false)
        setWordCount(calculateWordCount(text))
    }
    
    useEffect(() => {
        
        if(isTimeRunning && timeRemaining > 0) {
            setTimeout(() => {
                setTimeRemaining(time => time - 1)
            }, 1000)
        } else if(timeRemaining === 0 && isTimeRunning) {
            endGame()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeRemaining, isTimeRunning])
    
    return {textBoxRef, handleChange, text, isTimeRunning, timeRemaining, startGame, wordCount}
}

export default useWordGame


