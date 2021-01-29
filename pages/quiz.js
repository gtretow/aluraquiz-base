/* eslint-disable react/jsx-boolean-value */
/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable func-names */
/* eslint-disable quotes */
import React from "react";

import User from "./about";
import db from "../db.json";
import Widget from "../src/components/Widget";
import QuizLogo from "../src/components/QuizLogo";
import QuizBackground from "../src/components/QuizBackground";
import QuizContainer from "../src/components/QuizContainer";
import Button from "../src/components/Buttons";
import AlternativesForm from "../src/components/AlternativeForm";
import GitHubCorner from "../src/components/GitHubCorner";

function ResultWidget({ results }) {
  return (
    <Widget>
      <Widget.Header>Carregando...</Widget.Header>

      <Widget.Content>
        <p>
          Vamos ver seu resultado, <User /> ! Você acertou{" "}
          {/* {results.reduce((somatoriaAtual, resultadoAtual) => {
            const isAcerto = resultadoAtual === true;
            if (isAcerto) {
              return somatoriaAtual + 1;
            }
            return somatoriaAtual;
          }, 0)} */}
          {results.filter((x) => x === true).length} perguntas!
        </p>
        <ul>
          {results.map((result, index) => (
            <li key={`result__${result}`}>
              # {index + 1}Resultado: {result === true ? "Acertou" : "Errou"}
            </li>
          ))}
        </ul>
      </Widget.Content>
    </Widget>
  );
}
function LoadingWidget() {
  return (
    <Widget>
      <Widget.Header>Carregando...</Widget.Header>

      <Widget.Content>O jogo vai começar!</Widget.Content>
    </Widget>
  );
}

function QuestionWidget({
  question,
  questionIndex,
  totalQuestions,
  onSubmit,
  addResult,
}) {
  const [selectedAnswer, setSelectedAnswer] = React.useState(undefined);
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false);
  const questionId = `question__${questionIndex}`;
  const isCorrect = selectedAnswer === question.answer;
  const hasAlternativeSelected = selectedAnswer !== undefined;

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

        <AlternativesForm
          onSubmit={(infosDoEvento) => {
            infosDoEvento.preventDefault();
            setIsQuestionSubmited(true);
            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setIsQuestionSubmited(false);
              setSelectedAnswer(undefined);
            }, 1 * 2000);
          }}
        >
          {question.alternatives.map((alternative, alternativeIndex) => {
            const alternativeId = `alternative__${alternativeIndex}`;
            const alternativeStatus = isCorrect ? "SUCCESS" : "ERROR";
            const isSelected = selectedAnswer === alternativeIndex;
            return (
              <Widget.Topic
                as="label"
                key={alternativeId}
                htmlFor={alternativeId}
                data-selected={isSelected}
                data-status={isQuestionSubmited && alternativeStatus}
              >
                <input
                  style={{ display: "none" }}
                  id={alternativeId}
                  name={questionId}
                  type="radio"
                  onChange={() => setSelectedAnswer(alternativeIndex)}
                />
                {alternative}
              </Widget.Topic>
            );
          })}

          {/* <pre>
            {JSON.stringify(question, null, 4)}
          </pre> */}
          <Button type="submit" disabled={!hasAlternativeSelected}>
            Confirmar
          </Button>

          {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
          {isQuestionSubmited && !isCorrect && <p>Você errou! </p>}
        </AlternativesForm>
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
  const [result, setResult] = React.useState([]);
  const totalQuestions = db.questions.length;
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  function addResult(results) {
    // results.push(result)
    setResult([...result, results]);
  }

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

  /* function handleRadioChange(e) {
     const rightAnswer = setSelectAnswer(e.currentTarget.id);

    rightAnswer === db.questions[currentQuestion].answer
      ? alert("Respota Correta!")
      : alert("Resposta Errada"); }
 */
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
            addResult={addResult}
          />
        )}

        {screenState === screenStates.LOADING && <LoadingWidget />}

        {screenState === screenStates.RESULT && (
          <ResultWidget results={result} />
        )}
      </QuizContainer>
      <GitHubCorner />
    </QuizBackground>
  );
}
