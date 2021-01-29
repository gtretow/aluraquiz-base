/* eslint-disable comma-dangle */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable func-names */
/* eslint-disable quotes */
import React from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import Link from "../src/components/Link";

import db from "../db.json";
import Widget from "../src/components/Widget";
import QuizLogo from "../src/components/QuizLogo";
import QuizBackground from "../src/components/QuizBackground";
import Footer from "../src/components/Footer";
import GitHubCorner from "../src/components/GitHubCorner";
import Button from "../src/components/Buttons";
import Input from "../src/components/Input";
import QuizContainer from "../src/components/QuizContainer";

/* export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`; */

export default function Home() {
  const router = useRouter();
  const [name, setName] = React.useState("");

  function handleSubmit(event) {
    event.preventDefault();

    router.push(`/quiz?name=${name}`);
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        <Widget
          as={motion.section}
          variants={{ show: { opacity: 1 }, hidden: { opacity: 0 } }}
          initial="hidden"
          animate="show"
        >
          <Widget.Header>
            <h1>Fighting Games Quiz!</h1>
          </Widget.Header>
          <Widget.Content>
            <form onSubmit={handleSubmit}>
              <Input
                name="nomeDoUsuario"
                value={name}
                placeholder="Digite seu Nome"
                onChange={(event) => setName(event.target.value)}
              />
              <Button type="submit" disabled={name.length === 0}>
                Vamos jogar {name}!
              </Button>
            </form>
          </Widget.Content>
        </Widget>

        <Widget
          as={motion.section}
          transition={{ delay: 0.5, duration: 0.5 }}
          variants={{
            show: { opacity: 1, y: "0" },
            hidden: { opacity: 0, y: "100%" },
          }}
          initial="hidden"
          animate="show"
        >
          <Widget.Content>
            <h1>Quizes da Galera</h1>

            <ul>
              {db.external.map((linkExterno) => {
                const [projectName, githubUser] = linkExterno
                  .replace(/\//g, "")
                  .replace("https:", "")
                  .replace(".vercel.app", "")
                  .split(".");

                return (
                  <li key={linkExterno}>
                    <Widget.Topic
                      as={Link}
                      href={`/quiz/${projectName}___${githubUser}`}
                    >
                      {`${githubUser}/${projectName}`}
                    </Widget.Topic>
                  </li>
                );
              })}
            </ul>
          </Widget.Content>
        </Widget>
        <Footer />
      </QuizContainer>
      <GitHubCorner projectUrl="https://github.com/gtretow" />
    </QuizBackground>
  );
}
