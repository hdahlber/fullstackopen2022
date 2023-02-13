import { useState } from 'react'

const Button = (props) => (
    <button onClick={props.handleClick}>
        {props.text}
    </button>
)

const StatisticLine = ({text, value}) =>{
    return(
        <>
            <tr>
                <td>{text}</td>
                <td>{value}</td>
            </tr>
        </>
    )
}


const Statistics = ({good, neutral, bad}) => {
    const total = good + neutral + bad
    const average = (good - bad)/total
    const positive = (good/total)*100
    if (total===0){
        return (
            <>

            <div> No Feedback</div>
            </>
        )
    }
    return (
        <>
        <table>
            <tbody>
                <StatisticLine text ="Good: " value={good}> </StatisticLine>
                <StatisticLine text ="Neutral: " value={neutral}> </StatisticLine>
                <StatisticLine text ="Bad: " value={good}> </StatisticLine>
                <StatisticLine text ="All: " value={total}> </StatisticLine>
                <StatisticLine text ="Average: " value={average}> </StatisticLine>
                <StatisticLine text ="Positive: " value={positive + " %"}> </StatisticLine>
            </tbody>
        </table>
        </>
 )
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleGood = () => {
        setGood(good + 1)

    }
    const handleNeutral = () => {
        setNeutral(neutral + 1)

    }
    const handleBad = () => {
        setBad(bad + 1)

    }

    return (
        <div>
            <h1>give Feedback</h1>
            <Button handleClick={handleGood} text="good" />
            <Button handleClick={handleNeutral} text="neutral" />
            <Button handleClick={handleBad} text="bad" />
            <h2> Statics</h2>
            <Statistics good ={good} neutral={neutral} bad={bad}></Statistics>

        </div>
    )
}

export default App