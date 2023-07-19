import React, { useState } from 'react';

const questionsList = [
    {
        id: 'q1',
        question: 'How satisfied are you with our products?',
        type: 'rating',
        maxRating: 5,
    },
    {
        id: 'q2',
        question: 'How fair are the prices compared to similar retailers?',
        type: 'rating',
        maxRating: 5,
    },
    {
        id: 'q3',
        question: 'How satisfied are you with the value for money of your purchase?',
        type: 'rating',
        maxRating: 5,
    },
    {
        id: 'q4',
        question: 'On a scale of 1-10 how would you recommend us to your friends and family?',
        type: 'rating',
        maxRating: 10,
    },
    {
        id: 'q5',
        question: 'What could we do to improve our service?',
        type: 'text',
    },
];

const Survey = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const totalQuestions = questionsList.length;

    const handleAnswer = (questionId, value) => {
        setAnswers((prevAnswers) => ({
            ...prevAnswers,
            [questionId]: value,
        }));
    };

    const handleNext = () => {
        if (currentIndex < totalQuestions - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
    };

    const handleSkip = () => {
        if (currentIndex < totalQuestions - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };

    const handleComplete = () => {
        // Save answers to LocalStorage or make an AJAX request to store them on the backend
        // For this example, we will use LocalStorage
        localStorage.setItem('surveyAnswers', JSON.stringify(answers));
        alert('Survey submitted successfully!');
        setCurrentIndex(0);
        setAnswers({});
    };

    return (
        <div className="survey-container">
            <h2>{`${currentIndex + 1}/${totalQuestions}`}</h2>
            <h3>{questionsList[currentIndex].question}</h3>
            {questionsList[currentIndex].type === 'rating' && (
                <div className="rating">
                    {[...Array(questionsList[currentIndex].maxRating)].map((_, index) => (
                        <span
                            key={index}
                            className={`rating-star ${index + 1 <= answers[questionsList[currentIndex].id] ? 'active' : ''}`}
                            onClick={() => handleAnswer(questionsList[currentIndex].id, index + 1)}
                        >
                            &#9733;
                        </span>
                    ))}
                </div>
            )}
            {questionsList[currentIndex].type === 'text' && (
                <textarea
                    value={answers[questionsList[currentIndex].id] || ''}
                    onChange={(e) => handleAnswer(questionsList[currentIndex].id, e.target.value)}
                    placeholder="Enter your answer here..."
                />
            )}
            <div className="navigation-buttons">
                <button onClick={handlePrev} disabled={currentIndex === 0}>
                    Previous
                </button>
                {currentIndex < totalQuestions - 1 && (
                    <button onClick={handleSkip} className="skip-button">
                        Skip
                    </button>
                )}
                {currentIndex === totalQuestions - 1 ? (
                    <button onClick={handleComplete}>Submit</button>
                ) : (
                    <button onClick={handleNext}>Next</button>
                )}
            </div>
        </div>
    );
};

export default Survey;