import styles from "./message.module.css"
import logo_compas from "../../../datas/logo_compas.png"
import logo_user from "../../../datas/user.svg"
import Image from "next/image";
import Markdown from "react-markdown";

type MessageProps = {
  role: "user" | "assistant" | "code";
  text: string;
};

const UserMessage = ({ text }: { text: string }) => {
  return <div className={styles.userContainer}>
            <div className={styles.userIcon}>
                <Image src={logo_user} alt="User Logo" className={styles.icon}/>
            </div>
            <div className={styles.userMessage}>{text}</div>
          </div> 
};

const AssistantMessage = ({ text }: { text: string }) => {
  console.log('message: ' + text)
  return (
    <div className={styles.assistantContainer}>
      <div className={styles.assistantIcon}>
        <Image src={logo_compas} alt="Compas Logo" className={styles.icon}/>
      </div>
      <div className={styles.assistantMessage}>
        <Markdown>{text}</Markdown>
      </div>
    </div>  
  );
};

const CodeMessage = ({ text }: { text: string }) => {
  return (
    <div className={styles.codeMessage}>
      {text.split("\n").map((line, index) => (
        <div key={index}>
          <span>{`${index + 1}. `}</span>
          {line}
        </div>
      ))}
    </div>
  );
};

export default function Message ({ role, text }: MessageProps) {
  switch (role) {
    case "user":
      return <UserMessage text={text} />;
    case "assistant":
      return <AssistantMessage text={text} />;
    case "code":
      return <CodeMessage text={text} />;
    default:
      return null;
  }
};
