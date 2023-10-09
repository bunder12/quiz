import { useState } from 'react'
import quetions from '../../quetions.json'

interface options {
  answerByUser : string
}

interface finishType {
  score: number,
  showScore: boolean
}

export default function Home() {

const [currentQuetion, setCurrentQuetion] = useState<number>(0)
const [selectedOptions, setSelectedOptions] = useState<options[]>([])
const [finish, setFinish] = useState<finishType>({
  score: 0,
  showScore: false
})

console.log(selectedOptions, finish, "test",selectedOptions[currentQuetion])

const handleAnswerOptions = (answer:string) => {
  setSelectedOptions([(selectedOptions[currentQuetion] = {answerByUser: answer})])
  setSelectedOptions([...selectedOptions])
}

const handleFinish = () => {
  let newScore = 0
  for(let i = 0; i < quetions.length; i++){
    quetions[i].answerOptions.map(
      (res) =>
        res.isCorrect &&
        res.answer === selectedOptions[i]?.answerByUser &&
        (newScore += 1)
    )
  }
  setFinish({
    score: newScore,
    showScore: true
  })
}

return (
  <main className='h-screen flex justify-center items-center bg-slate-800 text-slate-50'>
    <div className='bg-slate-700 shadow-lg p-4 rounded-lg'>
      {
        finish?.showScore?
        <h3>Your Score {finish.score}/{quetions.length}</h3>
        :
        <>    
        <h3>Question {currentQuetion + 1} of {quetions.length}</h3>
        <div>
          <h2>{quetions[currentQuetion].question}</h2>
        </div>
        {
          quetions[currentQuetion].answerOptions.map((res, index) => (
            <div
        key={index}
        className="flex items-center w-full py-4 pl-5 m-2 ml-0 space-x-2 border-2 cursor-pointer border-white/10 rounded-xl bg-white/5"
      >
        <input
          type="radio"
          name={res.answer}
          value={res.answer}
          onChange={(e) => handleAnswerOptions(res.answer)}
          checked={res.answer === selectedOptions[currentQuetion]?.answerByUser}
          className="w-6 h-6 bg-black"
        />
        <p className="ml-6 text-white">{res.answer}</p>
      </div>
          ))
        }
        <button onClick={() => setCurrentQuetion(prev => prev - 1)} disabled={currentQuetion === 0? true : false} className={`${currentQuetion === 0 ? 'bg-purple-400' : 'bg-purple-500'} pl-4 pr-6 py-1 rounded-lg mr-3`}>Prev</button>
        <button onClick={() => {
          currentQuetion === quetions.length - 1?
          handleFinish()
          :
          setCurrentQuetion(prev => prev + 1)
        }} 
        className={`bg-purple-500 pl-4 pr-6 py-1 rounded-lg mr-3`}>{currentQuetion === quetions.length - 1 ? 'Finish' : 'Next'}</button>
        </>
      }
    </div>
  </main>
  )
}
