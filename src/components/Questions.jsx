import { ArrowLeft, ArrowRight, CheckCircle, XCircle } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { answerQuestions, nextQuestion, previousQuestion } from '../store/quizslice'

export default function Questions() {
    const dispatch = useDispatch()
    const { questions, currentQuestionIndex, answers, showExplanation } =
        useSelector((state) => state.quiz)

    const currentQuestion = questions[currentQuestionIndex]
    const currentAnswer = answers.find(
        (answer) => answer.questionId === currentQuestion.id)

    const handleOptionClick = (optionIndex) => {
        if (!currentAnswer) {
            dispatch(answerQuestions({ selectedOption: optionIndex }))
        }
    }

    const handleNext = () => {
        dispatch(nextQuestion())
    }
    const handlePrivious = () => {
        dispatch(previousQuestion())
    }

    return (
        <div className=' max-w-4xl mx-auto'>
            <div className=' bg-white rounded-2xl shadow-xl p-6 sm:p-8 transition-all duration-300 hover:shadow-2xl'>
                <div className=' mb-8'>
                    <h2 className=' text-lg sm:text-2xl font-bold text-gray-800 mb-6 leading-relaxed'>{currentQuestion.question}</h2>
                    {/* Display Dynamic Answer */}
                    <div className="grid gap-4">
                        {currentQuestion.options.map((option, index) => {
                            // console.log(currentAnswer)
                            const isSelected = currentAnswer?.selectedOption === index
                            const isCorrect = Array.isArray(currentQuestion.correctAnswer)
                                ? currentQuestion.correctAnswer.includes(index)
                                : index === currentQuestion.correctAnswer;
                            const isWrong = isSelected && !isCorrect && showExplanation
                            let buttonClass = `w-full p-4 text-left rounded-xl border-1 border-gray-300 transition-all duration-200`
                            if (showExplanation) {
                                if (isCorrect) {
                                    buttonClass += `border-green-500 bg-green-50 text-green-800`
                                }
                                else if (isWrong) {
                                    buttonClass += `border-red-500 bg-red-50 text-red-800`
                                }
                                else {
                                    buttonClass += `border-gray-500 bg-gray-50 text-gray-800`
                                }
                            } else if (isSelected) {
                                buttonClass += `border-blue-500 bg-blue-50 text-blue-800`

                            } else {
                                buttonClass += ` border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md`
                            }
                            return (
                                <button key={index} className={buttonClass} onClick={() => handleOptionClick(index)}>
                                    {/* <div className=' border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50 hover:shadow-md'></div> */}
                                    <div className=' flex items-center justify-between'>
                                        <span className=' text-sm sm:text-lg'>{option}</span>
                                        {showExplanation && isCorrect && (
                                            <CheckCircle size={24} className=' text-gray-600' />
                                        )}
                                        {showExplanation && isWrong && (
                                            <XCircle size={24} className=' text-red-600' />
                                        )}
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                    {/* Show explantion */}
                    {showExplanation && currentQuestion.explanation &&
                        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 my-6 rounded-r-lg ">
                            <div className="flex ">
                                {/* <div className="flex-shrink-0">
                                    <CheckCircle className=' h-5 w-5 text-blue' />
                                </div> */}
                                <div className="ml-3 flex items-center">
                                    {/* <p className=' to-blue-800 font-medium'>Explanation: </p> */}
                                    <p className=' to-blue-700 ml-2'>Chúc bạn thi tốt!!</p>
                                </div>
                            </div>
                        </div>}
                </div>
                {/* Button */}
                <div className="flex justify-between items-center">
                    <button className='flex items-center space-x-2 pr-4 pl-2 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-5 disabled:cursor-not-allowed transition-all duration-200'
                        onClick={handlePrivious}>
                        <ArrowLeft size={20} />
                        <span>Quay lại</span>
                    </button>
                    {showExplanation &&
                        <button className='flex items-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-5 disabled:cursor-not-allowed transition-all duration-200'
                            onClick={handleNext}>
                            <span>{currentQuestionIndex == questions.length - 1 ? "Hoàn thành" : "Tiếp"}</span>
                            <ArrowRight size={20} />
                        </button>}

                </div>
            </div>
        </div >
    )
}
