import React from 'react'
import { Link } from 'react-router-dom'

const quizModules = import.meta.glob('../data/TRIET/*.js');
const quizzes = Object.keys(quizModules).map((path) => {
    const match = path.match(/Quiz(\d+)\.js$/);
    return match ? { id: match[1], name: `Đề ${match[1]}`, href: `/TRIET/${match[1]}` } : null;
}).filter(Boolean).sort((a, b) => Number(a.id) - Number(b.id));


export default function TRIET() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 text-center">
                    <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-8">
                        Ôn tập Triết
                    </h1>
                    <p className="text-sm sm:text-lg text-gray-700 mb-12">
                        Chọn một đề để bắt đầu
                    </p>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8'>
                        <Link to="/TRIET/random" className="block">
                            <div className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out p-6 text-white flex flex-col justify-between h-full">
                                <h2 className="text-lg sm:text-xl font-bold mb-2">Đề ngẫu nhiên</h2>
                                <p className="text-sm opacity-90">60 câu hỏi</p>
                            </div>
                        </Link>
                        {quizzes.map((quiz) => (
                            <Link key={quiz.id} to={quiz.href} className="block">
                                <div className="bg-gradient-to-r from-blue-400 to-teal-500 hover:from-blue-500 hover:to-teal-600 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 ease-in-out p-6 text-white flex flex-col justify-between h-full">
                                    <h2 className="text-lg sm:text-xl font-bold mb-2">{quiz.name}</h2>
                                    <p className="text-sm opacity-90">Trắc nghiệm</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
