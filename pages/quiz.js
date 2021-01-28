/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable func-names */
/* eslint-disable quotes */
import React from "react";

import db from "../db.json";
import Widget from "../src/components/Widget";
import QuizLogo from "../src/components/QuizLogo";
import QuizBackground from "../src/components/QuizBackground";
import QuizContainer from "../src/components/QuizContainer";
import Button from "../src/components/Buttons";

import GitHubCorner from "../src/components/GitHubCorner";

function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>Carregando...</Widget.Header>

      <Widget.Content>[Desafio do Loading]</Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  onChange,
  selectedAnswer,
}) {
  const questionId = `question__${questionIndex}`;

  return (
    <Widget>
      <Widget.Header>
        {/* <BackLinkArrow href="/" /> */}
        <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
      </Widget.Header>

      <img
        alt="Descrição"
        style={{
          width: "100%",
          height: "150px",
          objectFit: "cover",
        }}
        src={question.image}
      />
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>

        <form
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            onSubmit();
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            return (
              <Widget.Topic as="label" htmlFor={alternativeId}>
                <input
                  // style={{ display: 'none' }}
                  id={alternativeId}
                  name={questionId}
                  type="radio"
                  onChange={onChange}
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          {/* <pre>
            {JSON.stringify(question, null, 4)}
          </pre> */}
          <Button type="submit" disabled={selectedAnswer.length === 0}>
            Confirmar
          </Button>
        </form>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: "QUIZ",
  LOADING: "LOADING",
  RESULT: "RESULT",
};
export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [selectAnswer, setSelectAnswer] = React.useState(0);

  const totalQuestions = db.questions.length;
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  React.useEffect(() => {
    // fetch() ...
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  function handleRadioChange(e) {
    /* const rightAnswer = setSelectAnswer(e.currentTarget.id);

    rightAnswer === db.questions[currentQuestion].answer
      ? alert("Respota Correta!")
      : alert("Resposta Errada"); */
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenStates.QUIZ && (
          <QuestionWidget
            question={question}
            questionIndex={questionIndex}
            totalQuestions={totalQuestions}
            onSubmit={handleSubmitQuiz}
            selectedAnswer={selectAnswer}
            onChange={handleRadioChange}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && (
          <div>Você acertou X questões, parabéns!</div>
        )}
      </QuizContainer>
      <GitHubCorner />
    </QuizBackground>
  );
}
