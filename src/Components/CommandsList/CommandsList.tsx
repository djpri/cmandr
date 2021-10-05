import * as React from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/firebase";

interface ICommand {
  id: string;
  howTo: string;
  command: string;
  reference: string;
}

function CommandsList() {
  const [commands, setCommands] = React.useState<ICommand[]>([]);

  const addData = async () => {
    const docSnap: any = await getDocs(
      collection(db, "users/7ID0mqlWIsX7GC9qhSFBLGpDLWv1/commands")
    );

    // if (docSnap.exists()) {
    //   setCmdData(docSnap.data());
    // } else {
    //   console.log("No such document!");
    // }
    const commands = docSnap.docs.map((doc: { data: () => any }) => doc.data());
    console.log(commands);
    setCommands(commands);
  };

  React.useEffect(() => {
    addData();
  }, []);

  return (
    <>
      {commands &&
        commands.map(({ id, howTo, command, reference }) => (
          <div key={id}>
            <div>How to: {howTo || "none"}</div>
            <div>Command: {command || "none"}</div>
            <div>
              Reference: <a href={reference}>{reference || "none"}</a>
            </div>
            <hr />
          </div>
        ))}
    </>
  );
}

export default CommandsList;
