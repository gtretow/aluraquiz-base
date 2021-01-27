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

function QuestionWidget({ question, totalQuestions, questionIndex }) {
  const questionId = `question__${questionIndex}`;
  return (
    <Widget>
      <Widget.Header>
        <h3>{`Pergunta ${questionIndex + 1} de ${totalQuestions}`}</h3>
      </Widget.Header>
      <img
        alt="Descrição"
        style={{ width: "100%", height: "150px", objectFit: "cover" }}
        src={question.image}
      />
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          {question.alternatives.map((alternative, idx) => {
            const alternativeId = `alternative__${idx}`;
            return (
              <Widget.Topic as="label" htmlFor={alternativeId}>
                <input id={alternativeId} name={questionId} type="radio" />
                {alternative}
              </Widget.Topic>
            );
          })}

          {/*         <pre>{JSON.stringify(question, null, 4)}</pre>
           */}
          <Button type="submit">Confirmar</Button>
        </form>
      </Widget.Content>
    </Widget>
  );
}
const screenStates = { QUIZ: "QUIZ", LOADING: "LOADING", RESULT: "RESULT" };
export default function Quiz() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];
  const totalQuestions = db.questions.length;

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenState.QUIZ);
    }, 1 * 1000);
  }, []);

  function handleSubmit() {
    const nextQuestion = questionIndex + 1;
    if(nextQuestion)
    questionIndex + 1;
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {screenState === screenState.QUIZ && (
          <QuestionWidget
            question={question}
            totalQuestions={totalQuestions}
            questionIndex={questionIndex}
            onSubmit={handleSubmit}
          />
        )}
        {screenState === screenState.LOADING && <LoadingWidget />}

        {screenState === screenState.RESULT && (
          <div>Você acertou X questões, parabéns</div>
        )}
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/gtretow" />
    </QuizBackground>
  );
}
